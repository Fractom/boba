import { NextResponse } from \'next/server\';
import { getAuth } from \'@clerk/nextjs/server\';
import { PrismaClient, Role } from \'@prisma/client\';
import type { NextRequest } from \'next/server\';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: \'Unauthorized\' }, { status: 401 });
    }

    // Проверяем роль пользователя в нашей базе данных
    const actor = await prisma.user.findUnique({
      where: { id: userId }, // Предполагается, что ID пользователя Clerk используется как ID в Prisma
    });

    if (!actor || actor.role !== Role.ADMIN) {
      return NextResponse.json({ error: \'Forbidden\' }, { status: 403 });
    }

    // Явно выбираем поля, которые хотим вернуть
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        // Добавьте сюда другие публичные поля, если они есть и нужны
      }
    });
    return NextResponse.json(users, { status: 200 });

  } catch (error) {
    console.error(\'[API_ADMIN_USERS_GET]\', error);
    return NextResponse.json({ error: \'Internal Server Error\' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 