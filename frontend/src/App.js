import {Route, Routes} from "react-router-dom";

import Header from "./components/Header/Header";
import './App.css'
import Home from "./components/Home/Home";
import Template from "./components/Template/Template";
import {useEffect} from "react";
import ArtItem from "./components/Template/ArtItem/ArtItem";
import {useSelector} from "react-redux";
import Lib from "./components/Lib/Lib";
import Registration from "./components/Header/Auth/AuthForms/RegistrationForm/Registration";
import Login from "./components/Header/Auth/AuthForms/LoginForm/Login";
import Loader from "./components/Loader/Loader";
import Logout from "./components/Header/Auth/AuthForms/LogoutForm/Logout";
import {checkAuth} from "./services/auth_service";
import Settings from "./components/Settings/Settings";
import Admin from "./components/Admin/Admin";
import AddToUserLibModal from "./components/Modals/AddToUserLibModal/addToUserLibModal";
import Test2 from "./components/Test2/Test2";

function App() {
    const token = useSelector(state => state.userReducer.token)
    const artsReducer = useSelector(state => state.artsReducer)
    const isLoadingVal = useSelector(state => state.global.isLoading)
    const arts = artsReducer.arts;
    const user = useSelector(state => state.userReducer.user)
    const modal = useSelector(state => state.global.modal)

    useEffect(async () => {
        if (token === '') {
            await checkAuth()
            console.log(arts.length)
        }
    }, [])

    if (isLoadingVal) {
        return <Loader/>
    }

    return (
        <>
            <Header/>
            <AddToUserLibModal {...modal} />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/anime' element={<Template
                    target='anime'
                    sortBy={artsReducer.radioSort}
                />}
                />
                <Route path="/anime/:itemId" element={<ArtItem/>}
                />
                <Route path='/series' element={<Template
                    target='series'
                    sortBy={artsReducer.radioSort}
                />}
                />
                <Route path="/series/:itemId" element={<ArtItem/>}
                />
                <Route path='/lib' element={<Lib lib={user}/>}
                />
                <Route path='/setts' element={<Settings/>}
                />
                <Route path='/registration' element={<Registration/>}
                />
                <Route path='/login' element={<Login/>}
                />
                <Route path='/logout' element={<Logout/>}
                />
                <Route path='/admin' element={<Admin/>}
                />
                <Route path='/test' element={<Test2/>}
                />
            </Routes>
        </>
    );
}

export default App;
