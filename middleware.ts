import { clerkMiddleware, getAuth, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

// Определяем защищенные маршруты (например, все, что начинается с /admin)
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  // Добавьте сюда другие маршруты, которые хотите защитить
]);

// clerkMiddleware теперь будет просто передавать запрос дальше,
// а getAuth будет извлекать состояние аутентификации.
export default clerkMiddleware(async (request: NextRequest) => {
  // Получаем состояние аутентификации из запроса
  const authState = getAuth(request);
  const { userId } = authState;
  
  // Данные пользователя, если доступны через claims или нужно загружать отдельно
  // const { user: clerkUser } = authState; // Если user есть в authState
  // Если нет, и нужен полный объект пользователя, его нужно было бы загрузить через clerkClient.users.getUser(userId)
  // Но для publicMetadata, оно должно быть в sessionClaims, если настроено.
  const clerkUserSessionClaims = authState.sessionClaims;

  if (!userId) {
    return NextResponse.next();
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (user?.status === 'BLOCKED') {
      if (request.nextUrl.pathname !== '/blocked') {
        return NextResponse.redirect(new URL('/blocked', request.url));
      }
    }

    // Синхронизация роли
    if (clerkUserSessionClaims && user && clerkUserSessionClaims.publicMetadata) {
      const clerkRole = (clerkUserSessionClaims.publicMetadata as any).role as Role;
      if (clerkRole && Object.values(Role).includes(clerkRole) && clerkRole !== user.role) {
        await prisma.user.update({
          where: { id: userId },
          data: { role: clerkRole }
        });
      }
    }
  } catch (error) {
    console.error('Ошибка в middleware:', error);
  }
  // Не вызываем prisma.$disconnect() для глобального инстанса здесь

  if (isProtectedRoute(request)) {
    // Если это защищенный маршрут, вызываем auth().protect()
    // Это потребует аутентификации пользователя для доступа.
    return authState().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Запускаем middleware для всех маршрутов, кроме статических файлов и специальных маршрутов Next.js
    '/((?!_next|.*\..*).*)',
    '/(api|trpc)(.*)',
  ],
}; 