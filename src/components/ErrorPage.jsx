import { useNavigate, useRouteError } from "react-router-dom";
import { useAuthStore } from "../store/store";

const ErrorPage = () => {
  const {logout} = useAuthStore();
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  const handleError = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="my-12 flex min-h-[70vh] w-full items-center justify-center px-4 text-gray-900">
      <div className="flex w-full flex-col items-center gap-8">
        <h1 className="md:text-16xl w-full select-none text-center text-9xl font-black text-gray-400">
          404
        </h1>
        <p className="text-center text-3xl font-semibold">
          You have discovered a secret place
        </p>
        <p className="text-center text-2xl md:px-12">
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </p>

        <button
          onClick={handleError}
          className="flex items-center justify-center rounded-md border border-green-500 px-5 py-2 text-xl text-black hover:bg-green-500 hover:text-white"
        >
          Uhhh LOGOUT!
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
