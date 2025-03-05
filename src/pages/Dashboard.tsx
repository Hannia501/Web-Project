import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
                <h1 className="text-3xl font-bold">Welcome to your dashboard!</h1>
                <h2 className="text-lg text-gray-400 mt-2">Logged in as {user?.email}</h2>
            </div>
        </div>
    );
}