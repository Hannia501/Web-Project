import {useEffect,useState,useContext, Context} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Movie} from "./Home.tsx";
import {ContextProps, FavoritesContext} from "../context/FavoritesContext.tsx";
import {AuthContext} from "../context/AuthContext.tsx";
import ReviewForm from "../components/ReviewForm.tsx";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {lazy, Suspense, ReactNode} from "react";
const LazyImage = lazy(() => import("../components/LazyImage"));

const MDB_API_KEY = "521b418e6b0c0227a624515e80c9288a";
const MDB_API_URL = `https://api.themoviedb.org/3/movie/`;

interface Review{
    movieId: number;
    review: string;
    userName: string;
    userId: number;
}

export default function MovieDetails() {
    const {user} = useContext(AuthContext);

    const [reviews, setReviews] = useState<Review[]>([]);    const{id}=useParams();
    const [movie, setMovie] = useState<Movie>();
    const { setFavorite,favorites } =
        useContext<ContextProps>(FavoritesContext as Context<ContextProps>);
    let reviewForm;
    if(user){
        reviewForm = <ReviewForm movieId={movie!.id}/>
    }


    useEffect(() => {
        axios.get(`${MDB_API_URL}${id}?api_key=${MDB_API_KEY}`).then(
            (response) => setMovie(response.data)
        );
    }, []);

    useEffect(() => {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("movieId", "==",
            parseInt(id?id:'-1')));
        getDocs(q).then((snapshot) => {
            setReviews(snapshot.docs.map((doc) => doc.data() as Review));
        });
    }, [id,reviews]);

    let reviewDisplay;
    if(reviews) {
        reviewDisplay =
            <div className="p-4">
                <h1>Reviews</h1>
                {reviews.map((r:Review, index) => (
                    <p className="text-right" key={index}><strong>{r.review}</strong><br/>by: {r.userName}</p>
                ))}
            </div>
    }

    if(!movie) return <p>Loading...</p>
    let favButtonLabel = '';
    if(!favorites.has(movie.id)){
        favButtonLabel = 'Add to Favorites';
    }else{
        favButtonLabel = 'Remove from Favorites';
    }


    return(
        <Suspense fallback={(<div className="spinner"></div> as ReactNode)}>
            <div className={'flex flex-col justify-center items-center p-4 bg-gray-900 text-white rounded-lg '}>
                <LazyImage
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="w-64 rounded"
                        alt={movie.title}
                        />

                        <h1 className={'text-2xl font-bold'}>{movie.title}</h1>
                <p>⭐ {movie.vote_average}</p>
                <button
                    onClick={() => setFavorite(movie)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {favButtonLabel}
                </button>
                {reviewForm}
                <br/>
                {reviewDisplay}
                <br/>
            </div>
        </Suspense>
    )
}