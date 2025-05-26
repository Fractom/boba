import { Clerk } from '@clerk/clerk-sdk-node';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY! });
const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { action: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Проверка роли администратора
    const adminUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (adminUser?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { email } = await req.json();
    const { action } = params;

    const users = await clerk.users.getUserList({
      emailAddress: [email],
      limit: 1,
    });

    if (users.length === 0) {
      return NextResponse.json(
        { error: `Пользователь с email ${email} не найден` },
        { status: 404 }
      );
    }

    const user = users[0];

    switch (action.toLowerCase()) {
      case 'block':
        await clerk.users.updateUser(user.id, {
          publicMetadata: { ...user.publicMetadata, blocked: true },
        });
        await prisma.user.update({
          where: { id: user.id },
          data: { status: 'BLOCKED' },
        });
        return NextResponse.json({ message: 'Пользователь заблокирован' });

      case 'unblock':
        await clerk.users.updateUser(user.id, {
          publicMetadata: { ...user.publicMetadata, blocked: false },
        });
        await prisma.user.update({
          where: { id: user.id },
          data: { status: 'ACTIVE' },
        });
        return NextResponse.json({ message: 'Пользователь разблокирован' });

      case 'delete':
        await clerk.users.deleteUser(user.id);
        await prisma.user.delete({
          where: { id: user.id },
        });
        return NextResponse.json({ message: 'Пользователь удален' });

      default:
        return NextResponse.json(
          { error: 'Неизвестное действие' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 