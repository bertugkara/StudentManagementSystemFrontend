import AuthContext from "./Components/Context/AuthContext";
import {useEffect, useState} from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './Components/layouts/Navbar/NavigationBar';
import CreateLesson from './Components/Pages/Lesson/CreateLesson';
import UserList from './Components/Pages/MainPages/UserList/UserList';
import Profile from './Components/Pages/Profile/Profile';
import Register from "./Components/Pages/Register/Register";
import MainPage from "./Components/Pages/MainPages/MainPage/MainPage";
import Login from './Components/Pages/Login/Login';
import Sidebar from "./Components/layouts/SideBar/Sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./App.css"
import SidebarNoLogin from "./Components/layouts/SideBar/SidebarNoLogin";
import CreateRoom from "./Components/Pages/Room/CreateRoom";
import CreateAnnouncement from "./Components/Pages/Announcements/CreateAnnouncement";
import AnnouncementView from "./Components/Pages/Announcements/AnnouncementView";

function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);

    function handleLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('accountType');
        setAuth(false);
        navigate("/login")
    }

    const data = {auth, setAuth, handleLogout};

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user) {
            setAuth(true);
        }
        if (auth !== true) {
            navigate("/login");
        }
    }, []);


    return (
        <div className={"Big-App"}>
            <AuthContext.Provider value={data}>
                {auth === true ? <div className={"sidebar"}><Sidebar/></div> :
                    <div className={"sidebar"}><SidebarNoLogin/></div>}
                <div className="App">
                    <NavigationBar/>
                    <div className={"components"}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/createUser" element={<Register/>}/>
                        <Route path="/createRoom" element={<CreateRoom/>}/>
                        <Route path="/createAnnouncement" element={<CreateAnnouncement/>}/>
                        <Route path="/createLesson" element={<CreateLesson/>}/>
                        <Route path="/announcements" element={<AnnouncementView/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/userList" element={<UserList/>}/>
                    </Routes>
                    </div>
                    <ToastContainer/>
                </div>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
