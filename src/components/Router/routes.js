import AuthScreen from "../Auth/AuthScreen";
import Favorites from "../Favorites/Favorites";
import General from "../General/General";
import Movie from "../Movie/Movie";
import MovieList from "../MovieList/MovieList";
import Profile from "../Profile/Profile";
import RandomMovie from "../RandomMovie/RandomMovie";

const routes = [
    {
        path: '/',
        exact: true,
        component: <General />
    },
    {
        path: '/movies',
        exact: true,
        component: <MovieList />
    },
    {
        path: '/profile',
        exact: false,
        component: <Profile />
    },
    {
        path: '/auth',
        exact: false,
        component: <AuthScreen />
    },
    {
        path: '/movie/:movieId',
        exact: false,
        component: <Movie />
    },
    {
        path: '/favorites',
        exact: true,
        component: <Favorites />
    },
    {
        path: '/random',
        exact: true,
        component: <RandomMovie />
    }
]

export default routes;