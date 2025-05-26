'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function UserManagement() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async (action: 'block' | 'unblock' | 'delete') => {
    if (!email) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, введите email пользователя',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/users/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Произошла ошибка');
      }

      toast({
        title: 'Успешно',
        description: data.message,
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Произошла ошибка',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Управление пользователями</CardTitle>
          <CardDescription>
            Блокировка, разблокировка и удаление пользователей
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Email пользователя
              </label>
              <Input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="flex space-x-4">
              <Button
                variant="default"
                onClick={() => handleAction('block')}
                disabled={loading}
              >
                Заблокировать
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleAction('unblock')}
                disabled={loading}
              >
                Разблокировать
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleAction('delete')}
                disabled={loading}
              >
                Удалить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 