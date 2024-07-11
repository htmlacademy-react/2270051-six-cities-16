import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="page__main">
      <h1>404. Page not found</h1>
      <Link to="/">Вернуться на главную</Link>
    </main>
  );
}

export default NotFoundPage;
