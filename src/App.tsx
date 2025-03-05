import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Search from './pages/Search'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites.tsx';
import Signup from "./Signup.tsx";
import Login from './pages/Login';
import ProtectedRoute from "./components/ProtectedRoute.tsx";

export default function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/movie/:id" element={<MovieDetails/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard/></ProtectedRoute>
                }/>
                <Route path="/profile" element={
                    <ProtectedRoute><Profile/></ProtectedRoute>
                }/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>

                <Route path="/favorites" element={<Favorites/>}/>
            </Routes>
        </div>
    );
}
