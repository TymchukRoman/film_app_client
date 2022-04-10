import './App.css';
import RootRouter from './components/Router/RootRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { userMe } from "./api/userAPI";
import { setLoginedUser } from "./store/reducers/user.reducer";
import { connect } from "react-redux";
import { useEffect, useState } from 'react';

const App = (props) => {

  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    console.log(token);
    if (!token) {
      setIsUserLoaded(true);
    } else {
      userMe(token).then((response) => {
        if (response?.data?.user) {
          props.setLoginedUser(response.data.user);
        }
        setIsUserLoaded(true);
      });
    }
  }, [])

  return <>
    {
      isUserLoaded
        ? <RootRouter />
        : <>Loading</>
    }
  </>
}


const mapStateToProps = (state, ownProps) => ({
  ...state
})


export default connect(mapStateToProps, { setLoginedUser })(App)
