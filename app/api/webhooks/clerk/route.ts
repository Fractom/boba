import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Role } from '@prisma/client'

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

if (!CLERK_WEBHOOK_SECRET) {
  console.error('Critical Error: CLERK_WEBHOOK_SECRET is not set.\nSetup this environment variable with the signing secret from Clerk Dashboard -> Webhooks.')
  // В реальном приложении это может потребовать более сложной обработки,
  // но для простоты здесь мы можем просто заблокировать запуск, если секрет не установлен.
  // Однако, выбрасывание ошибки на верхнем уровне модуля может остановить сборку/запуск приложения.
  // Лучше логировать и обрабатывать внутри POST, если это возможно, или обеспечить установку переменной.
}

export async function POST(req: Request) {
  if (!CLERK_WEBHOOK_SECRET) {
    // Эта проверка здесь, чтобы избежать падения, если переменная не была установлена на этапе сборки
    console.error('CLERK_WEBHOOK_SECRET not configured for webhook verification.')
    return NextResponse.json({ error: 'Webhook secret not configured.' }, { status: 500 })
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing Svix headers' }, { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)
  const wh = new Webhook(CLERK_WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err: any) {
    console.error('Webhook verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 })
  }

  const eventType = evt.type
  console.log(`Received Clerk webhook event: ${eventType}`)

  try {
    switch (eventType) {
      case 'user.created':
        const { id: userIdCreated, email_addresses: emailsCreated, public_metadata: publicMetaCreated, created_at } = evt.data
        const emailCreated = emailsCreated?.[0]?.email_address

        if (!userIdCreated || !emailCreated) {
          console.error('user.created: Missing id or email', evt.data)
          return NextResponse.json({ error: 'Missing id or email for user.created' }, { status: 400 })
        }

        // Преобразуем роль из public_metadata к типу Role или USER по умолчанию
        const roleCreatedString = publicMetaCreated?.role as string | undefined
        const roleCreated = Object.values(Role).includes(roleCreatedString as Role) ? roleCreatedString as Role : Role.USER

        await prisma.user.create({
          data: {
            id: userIdCreated,
            email: emailCreated,
            role: roleCreated,
            status: 'ACTIVE',
            createdAt: new Date(created_at),
          },
        })
        console.log(`User ${emailCreated} (ID: ${userIdCreated}) created in Prisma.`)
        break

      case 'user.updated':
        const { id: userIdUpdated, email_addresses: emailsUpdated, public_metadata: publicMetaUpdated } = evt.data
        const emailUpdated = emailsUpdated?.[0]?.email_address

        if (!userIdUpdated) {
          console.error('user.updated: Missing id', evt.data)
          return NextResponse.json({ error: 'Missing id for user.updated' }, { status: 400 })
        }

        const updateData: { email?: string; role?: Role; status?: 'ACTIVE' | 'BLOCKED' } = {}
        if (emailUpdated) updateData.email = emailUpdated

        if (publicMetaUpdated?.role) {
          const roleUpdatedString = publicMetaUpdated.role as string | undefined
          if (Object.values(Role).includes(roleUpdatedString as Role)) {
            updateData.role = roleUpdatedString as Role
          }
        }

        if (typeof publicMetaUpdated?.blocked !== 'undefined') {
          updateData.status = publicMetaUpdated.blocked ? 'BLOCKED' : 'ACTIVE'
        }

        if (Object.keys(updateData).length > 0) {
          await prisma.user.update({
            where: { id: userIdUpdated },
            data: updateData,
          })
          console.log(`User (ID: ${userIdUpdated}) updated in Prisma.`)
        } else {
          console.log(`User (ID: ${userIdUpdated}): No relevant data to update in Prisma.`)
        }
        break

      case 'user.deleted':
        const { id: userIdDeleted, deleted } = evt.data // Clerk может присылать `deleted: true`
        if (!userIdDeleted) {
          console.error('user.deleted: Missing id', evt.data)
          return NextResponse.json({ error: 'Missing id for user.deleted' }, { status: 400 })
        }
        // Проверяем, существует ли пользователь перед удалением, чтобы избежать ошибок
        const userExists = await prisma.user.findUnique({ where: { id: userIdDeleted } })
        if (userExists) {
          await prisma.user.delete({
            where: { id: userIdDeleted },
          })
          console.log(`User (ID: ${userIdDeleted}) deleted from Prisma.`)
        } else {
          console.warn(`User (ID: ${userIdDeleted}) not found in Prisma for deletion.`)
        }
        break

      default:
        console.log(`Unhandled Clerk webhook event type: ${eventType}`)
        // Можно вернуть 200, так как это не ошибка, просто мы не обрабатываем этот тип
        break
    }
    return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 })
  } catch (error: any) {
    console.error('Error processing webhook event in Prisma:', error.message, error.stack)
    // Важно! Не возвращайте 5xx ошибку Clerk, чтобы избежать бесконечных повторов.
    // Возвращаем 400, если проблема в данных, или 200, если это внутренняя ошибка, но мы не хотим повторов.
    // В данном случае, 200 с сообщением об ошибке может быть безопаснее для Clerk.
    return NextResponse.json({ error: 'Error processing webhook in application' }, { status: 200 }) // или 400, если ошибка связана с данными от Clerk
  }
  // finally { await prisma.$disconnect(); } // Для глобального инстанса prisma $disconnect не обязателен здесь
} 