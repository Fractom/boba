import { Clerk } from '@clerk/clerk-sdk-node';
import { PrismaClient } from '@prisma/client';

if (!process.env.CLERK_SECRET_KEY) {
  console.error('❌ Ошибка: Не установлена переменная окружения CLERK_SECRET_KEY');
  process.exit(1);
}

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
const prisma = new PrismaClient();

const [action, email] = process.argv.slice(2);

if (!action || !email) {
  console.error('Usage: tsx manage-user.ts <action> <email>');
  console.error('Actions: block, unblock, delete');
  process.exit(1);
}

async function main() {
  try {
    // Поиск пользователя по email
    const users = await clerk.users.getUserList({
      emailAddress: [email],
      limit: 1
    });

    if (users.length === 0) {
      console.error(`❌ Пользователь с email ${email} не найден`);
      return;
    }

    const user = users[0];

    switch (action.toLowerCase()) {
      case 'block':
        // Блокируем пользователя в Clerk
        await clerk.users.updateUser(user.id, {
          publicMetadata: { ...user.publicMetadata, blocked: true }
        });
        // Обновляем статус в Prisma
        await prisma.user.update({
          where: { id: user.id },
          data: { status: 'BLOCKED' }
        });
        console.log(`✅ Пользователь ${email} заблокирован`);
        break;

      case 'unblock':
        // Разблокируем пользователя в Clerk
        await clerk.users.updateUser(user.id, {
          publicMetadata: { ...user.publicMetadata, blocked: false }
        });
        // Обновляем статус в Prisma
        await prisma.user.update({
          where: { id: user.id },
          data: { status: 'ACTIVE' }
        });
        console.log(`✅ Пользователь ${email} разблокирован`);
        break;

      case 'delete':
        // Удаляем пользователя из Clerk
        await clerk.users.deleteUser(user.id);
        // Удаляем пользователя из Prisma
        await prisma.user.delete({
          where: { id: user.id }
        });
        console.log(`✅ Пользователь ${email} удален`);
        break;

      default:
        console.error('❌ Неизвестное действие. Используйте: block, unblock или delete');
    }
  } catch (error) {
    console.error('❌ Ошибка при обработке пользователя:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 