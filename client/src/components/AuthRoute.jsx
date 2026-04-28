import { useAuth } from "../context/AuthContext";
import PublicLayout from "./PublicLayout";
import PublicHome from "../pages/PublicHome";

const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <PublicLayout>
        <PublicHome />
      </PublicLayout>
    );
  }

  return children;
};

export default AuthRoute;
