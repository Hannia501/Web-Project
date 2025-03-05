import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setUsername(docSnap.data().username);
                    setBio(docSnap.data().bio);
                }
            });
        }
    }, [user]);

    async function handleSave() {
        if (user) {
            try {
                await setDoc(doc(db, "users", user.uid), { username, bio });
                alert("Profile Updated!");
                navigate("/profile");
            } catch (e) {
                alert((e as Error).message);
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen w-screen h-screen bg-gray-900 text-white">
            <div className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-6">Edit Profile</h1>

                <label className="block text-lg font-medium mb-2">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full p-3 mb-4 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-lg font-medium mb-2">Bio:</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                    className="w-full p-3 h-28 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleSave}
                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
