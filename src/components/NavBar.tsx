import {Link, useNavigate} from "react-router-dom";
import React, {useState, useContext} from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import {AuthContext} from "../context/AuthContext.tsx";


export default function NavBar(){
    const[query, setQuery] = useState("");
    const navigate = useNavigate();
    const favorites= useContext(FavoritesContext);
    const {logout, user} = useContext(AuthContext);
    let authForm;
    if(user){
        authForm = ([
            <Link to='/dashboard'>{user.email}</Link>,
            <p>⭐ : <Link
                to="/favorites">{favorites?.favorites.size}</Link></p>,
            <form onSubmit = {handleLogout} className = {"float-rightmd:float-left"}>
                <button type="submit" className="bg-blue-500 px-2 py-1rounded">
                🚪 Logout
                </button>
                </form>
                ]);
            } else {
        const signInForm =
            <form onSubmit={handleSignup}>
                <button type="submit" className="bg-blue-500 px-2 py-1
rounded">
                    📑 Sign Up
                </button>
            </form>
        const loginForm =
            <form onSubmit={handleLogin}>
                <button type="submit" className="bg-blue-500 px-2 py-1
rounded">
                    👤 Login
                </button>
            </form>
        authForm = [signInForm, loginForm]
    }

    function handleSearch(event: React.FormEvent){
        event.preventDefault();
        navigate("/search?q="+query);
    }
    function handleSignup(event: React.FormEvent) {
        event.preventDefault();
        navigate(`/signup`);
    }
    function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        navigate(`/login`);
    }
    function handleLogout(event: React.FormEvent) {
        event.preventDefault();
        logout();
        navigate(`/`);
    }
    return (
        <nav className="flex gap-4 p-4 bg-gray-800 text-white items-end">
            <Link to="/"> Home </Link>
            <Link to="/search"> Search </Link>
            <Link to="/dashboard"> Dashboard </Link>
            <Link to="/profile"> Profile </Link>
            <form onSubmit={handleSearch} className="flex gap-2 ">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="px-2 py-1 rounded"
                />
                <button type="submit" className="bg-blue-500 px-2 py-1rounded">
                    🔍
                </button>
            </form>
            {authForm}
        </nav>
    );

}

