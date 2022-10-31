import { Link } from 'react-router-dom';
import '../page-not-found.css';

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1>404 Page</h1>

      <p>Sorry, the page you are looking for does not exist.</p>

      <p>
        You can always go back {' '}
        <Link to="/" className="link">
          {/* font awesome home page */}
          <i className="fas fa-home"></i>
        </Link>
      </p>
    </div>
  );
}
