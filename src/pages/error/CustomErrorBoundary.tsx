import { Link } from "lucide-react";
import type { FC } from "react";
import { useRouteError } from "react-router-dom";

const CustomErrorBoundary: FC = () => {
    const error = useRouteError();
    const isError = error instanceof Error;

    console.error("Route Error Caught:", error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-red-800 p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-4">
                <h1 className="text-3xl font-bold border-b border-red-600 pb-2">
                    Oops! Something went wrong.
                </h1>
                <p className="text-lg">
                    We encountered an unexpected error while loading this page.
                </p>
                {isError && (
                    <div className="bg-red-900 p-4 rounded-lg text-sm overflow-auto">
                        <h2 className="font-mono font-semibold mb-2 text-red-300">
                            Error Details:
                        </h2>
                        <p className="text-red-100 whitespace-pre-wrap">
                            {error.message}
                        </p>
                    </div>
                )}
                <Link
                    to="/"
                    className="inline-block px-4 py-2 mt-4 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition duration-150 shadow-md"
                >
                    Go to Home Page
                </Link>
            </div>
        </div>
    );
};

export default CustomErrorBoundary;
