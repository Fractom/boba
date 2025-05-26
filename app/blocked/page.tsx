export default function BlockedPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f3f4f6'
    }}>
      <h1 style={{ color: '#dc2626', fontSize: '2.5rem', marginBottom: '1rem' }}>
        Доступ заблокирован
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#4b5563', maxWidth: '600px' }}>
        Ваша учетная запись была заблокирована. Пожалуйста, свяжитесь с администрацией для получения дополнительной информации.
      </p>
      {/* Вы можете добавить здесь ссылку на главную или контактную информацию */}
    </div>
  );
} 