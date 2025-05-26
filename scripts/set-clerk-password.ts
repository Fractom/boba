import { Clerk } from '@clerk/clerk-sdk-node';

if (!process.env.CLERK_SECRET_KEY) {
  console.error('❌ Ошибка: Не установлена переменная окружения CLERK_SECRET_KEY');
  process.exit(1);
}

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: tsx set-clerk-password.ts <email> <password>');
  process.exit(1);
}

async function main() {
  try {
    // Попытка найти пользователя по email
    const users = await clerk.users.getUserList({
      emailAddress: [email],
      limit: 1
    });

    if (users.length > 0) {
      const user = users[0];
      // Обновление пароля существующего пользователя
      await clerk.users.updateUser(user.id, { 
        password
      });
      console.log(`✅ Пароль обновлен для пользователя: ${email}`);
    } else {
      // Создание нового пользователя с ролью администратора
      const username = email.split('@')[0]; // Создаем username из email
      await clerk.users.createUser({
        emailAddress: [email],
        username,
        password,
        publicMetadata: { role: 'admin' }
      });
      console.log(`✅ Пользователь создан: ${email}`);
    }
  } catch (error) {
    console.error('❌ Ошибка при обработке пользователя:', error);
  }
}

main();
