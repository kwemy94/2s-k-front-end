import { Routes, Route} from 'react-router-dom'
import Login from '../auth/Login';
// import { Login } from './../auth/Login'

const AppRouter = () =>{
    return(
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route  path="/register" />
        </Routes>
    );
}

export default AppRouter;
