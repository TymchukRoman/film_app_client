import General from "../General/General";
import MovieList from "../MovieList/MovieList";
import Profile from "../Profile/Profile";

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
    }
]

export default routes;