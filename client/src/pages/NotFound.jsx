import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-8 text-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md shadow-primary-200 hover:shadow-lg transition-all"
        >
          <span className="text-base">🏠</span>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
