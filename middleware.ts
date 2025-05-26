import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export default clerkMiddleware((authResult, req: NextRequest) => {
  // Мы передаем результат getAuth() как первый аргумент
  // для единообразия с тем, как auth() работает в других местах
  const auth = authResult; 

  // Убедитесь, что страницы, на которые происходит перенаправление неаутентифицированных
  // пользователей (`/unauthorized`, `/sign-in`), являются публичными.
  // Для clerkMiddleware конфигурация publicRoutes и ignoredRoutes делается иначе,
  // обычно через createRouteMatcher или напрямую в логике.
  // Здесь мы будем обрабатывать это в логике afterAuth-подобного блока.

  const publicRoutes = ['/', '/unauthorized', '/sign-in'];
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname) || req.nextUrl.pathname.startsWith('/api/public'); // Пример для /api/public

  // Если это публичный маршрут, и пользователь НЕ администратор, пытающийся зайти на главную (для редиректа в админку)
  // то пропускаем дальше. Логика редиректа админа с главной будет ниже.
  if (isPublicRoute) {
    // Специальный случай: если админ на главной, его нужно редиректнуть в /admin
    // Этот код продублирован ниже, чтобы покрыть случай, когда пользователь уже аутентифицирован как админ
    // и заходит на главную страницу.
    const { userId, sessionClaims } = auth; // Используем getAuth() результат
    const adminEmail = 'majydovahmed@gmail.com';
    let isDesignatedAdminByEmail = false;
    if (userId && sessionClaims) {
      const emailFromClaims = sessionClaims.email || sessionClaims.email_address || (sessionClaims.user as any)?.primaryEmailAddress?.emailAddress;
      if (emailFromClaims === adminEmail) {
        isDesignatedAdminByEmail = true;
      }
    }
    if (userId && isDesignatedAdminByEmail && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    // Для остальных публичных маршрутов - просто пропускаем
    if (req.nextUrl.pathname !== '/' || !userId || !isDesignatedAdminByEmail) {
        return NextResponse.next();
    }
  }

  // Для всех НЕ публичных маршрутов или если админ на '/' (для редиректа)
  const { userId, sessionClaims, user } = auth; // Используем getAuth() результат
  const currentPath = req.nextUrl.pathname;
  const adminEmail = 'majydovahmed@gmail.com';

  let isDesignatedAdminByEmail = false;
  if (userId) {
    // Попытка получить email:
    // Вариант А: Из объекта `user`, если `auth.user` каким-то образом им заполняется.
    if (user && (user as any).emailAddresses && Array.isArray((user as any).emailAddresses)) {
      isDesignatedAdminByEmail = (user as any).emailAddresses.some(
        (emailObj: any) => emailObj.emailAddress === adminEmail
      );
    }
    // Вариант Б: Более надежно, из `sessionClaims`, если email включен в JWT.
    else if (sessionClaims) {
      const emailFromClaims = sessionClaims.email || sessionClaims.email_address || (sessionClaims.user as any)?.primaryEmailAddress?.emailAddress;
      if (emailFromClaims === adminEmail) {
        isDesignatedAdminByEmail = true;
      }
    }
  }

  // Логика для доступа к админским маршрутам
  if (currentPath.startsWith('/admin')) {
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', currentPath);
      return NextResponse.redirect(signInUrl);
    }
    
    if (!isDesignatedAdminByEmail) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    return NextResponse.next(); 
  }

  // Сценарий: Администратор (по email) заходит на главную страницу ('/'),
  // перенаправляем его в /admin.
  if (userId && isDesignatedAdminByEmail && currentPath === '/') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // Если пользователь не аутентифицирован и пытается получить доступ к защищенному маршруту (не /admin и не публичному)
  if (!userId && !isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', currentPath);
      return NextResponse.redirect(signInUrl);
  }
  
  // Для всех остальных случаев (аутентифицированный пользователь на не-админском, не-публичном маршруте)
  // `clerkMiddleware` без `auth().protect()` по умолчанию разрешает доступ, если пользователь аутентифицирован.
  // Если нужна явная защита для всех остальных маршрутов, нужно вызвать `auth().protect()`
  // Но здесь мы уже обработали все случаи: публичные, админские, неаутентифицированные.
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)_convert_file_path_to_positive_lookahead', // оригинальный матчер из Clerk документации, немного измененный
    '/', 
    '/(api|trpc)(.*)_convert_file_path_to_positive_lookahead'
  ],
};

// Примечание для вас:
// Если `auth.user.emailAddresses` недоступен, вам нужно убедиться, что email доступен,
// в идеале через `auth.sessionClaims`. Для этого:
// 1. Перейдите в вашу панель управления Clerk.
// 2. Откройте Settings -> Sessions.
// 3. Найдите раздел "JWT Templates" и нажмите "Edit" для вашего шаблона.
// 4. Добавьте claim для email. Например, Shortcode: `user.primary_email_address`, Name in token: `email_address`.
// 5. Затем в коде вы сможете получить доступ к нему через `auth.sessionClaims.email_address`.
// Текущий код пытается найти email в нескольких распространенных местах в `sessionClaims`, если `user.emailAddresses` не сработает. 