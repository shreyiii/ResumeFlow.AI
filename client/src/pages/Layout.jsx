import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../componets/Navbar";
import Loader from "../componets/Loader";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 max-w-md w-full text-center">

            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100">
              <span className="text-4xl">🔒</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Access Restricted
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              You need to log in first to access your dashboard and manage your resumes.
            </p>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;