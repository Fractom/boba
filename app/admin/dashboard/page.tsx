'use client'; // Этот компонент будет клиентским для использования useEffect и useState

import { useEffect, useState } from 'react';

// Предполагаем, что тип User из Prisma выглядит примерно так:
interface UserFromPrisma {
  id: string;
  email: string | null;
  role: string; // Или ваш Enum Role, если он доступен на клиенте
  status: string; // Или ваш Enum Status
  createdAt: string; // или Date, если будете парсить
}

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<UserFromPrisma[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Ошибка: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Ошибка при загрузке пользователей:", err);
      }
      setIsLoading(false);
    }

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div style={{ padding: '20px' }}>Загрузка пользователей...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Ошибка при загрузке: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Панель администратора</h1>
      <h2>Список пользователей:</h2>
      {users.length === 0 ? (
        <p>Пользователи не найдены.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} style={{
              border: '1px solid #ccc',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px'
            }}>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Роль:</strong> {user.role}</p>
              <p><strong>Статус:</strong> {user.status}</p>
              <p><strong>Создан:</strong> {new Date(user.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 