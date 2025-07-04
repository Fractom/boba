🎓 Образовательный портал аккредитации и легализации
Добро пожаловать в современное веб-приложение, разработанное для управления процессами аккредитации, легализации, новостями, поддержкой пользователей и административным контролем. Проект сочетает в себе мощный технологический стек и удобный пользовательский интерфейс.

🚀 Стек технологий
Frontend: Next.js 14 + React

Стилизация: TailwindCSS

База данных: Prisma ORM

Аутентификация: Clerk

Интернационализация: i18next и next-intl

Компоненты UI: Radix UI

Визуализация данных: Recharts

🔐 Безопасность
Защищённая аутентификация через Clerk

Middleware для защиты маршрутов

Проверка загружаемых файлов с помощью ClamAV

Серверная валидация через Zod

🧩 Основные разделы
/admin — административная панель

/moderator — интерфейс модерации

/profile — управление личным профилем

/recognition — система распознавания

/news — новости и события

/faq — ответы на частые вопросы

/contact — форма обратной связи

/accreditation — аккредитационные услуги

/bologna — Болонский процесс

/legalisation — легализация документов

/questions — система управления вопросами

/set-role — назначение ролей пользователям

🌍 Интернационализация
Полная поддержка мультиязычности через next-intl и i18next. Легко расширяется для добавления новых языков.

✨ UX/UI Особенности
Темная и светлая темы (поддержка next-themes)

Отзывчивый дизайн для всех устройств

Интерактивные формы с валидацией (react-hook-form + zod)

Анимации с tailwindcss-animate

Компоненты: модальные окна, аккордеоны, табы, тултипы, селекты и т.д.

Система уведомлений (toast notifications)

☁️ Развёртывание
Хостинг: Vercel

Автоматическая сборка и деплой

Оптимизация изображений и шрифтов

Генерация типов Prisma

Линтинг и проверка типов TypeScript

📦 Установка и запуск
bash
Копировать
Редактировать
git clone https://github.com/your-username/your-repo.git
cd your-repo
pnpm install
pnpm dev
📁 Структура проекта (пример)
csharp
Копировать
Редактировать
├── app/                   # Основные маршруты приложения
├── components/            # Переиспользуемые UI-компоненты
├── lib/                   # Утилиты и вспомогательные функции
├── prisma/                # Схемы и миграции базы данных
├── public/                # Статические ресурсы
├── styles/                # Глобальные стили
├── locales/               # Файлы переводов
└── ... 
🧪 Тестирование и проверка
ESLint + Prettier для линтинга

Проверка типов через TypeScript

Защита форм и API
