import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import NewProject from "./pages/NewProject";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { cleanProjectsArray } from "./redux/project/projectSlice";
import Members from "./pages/Members";
import ShowMember from "./pages/ShowMember";
import AddMember from "./pages/AddMember";
import { SidebarWithBurgerMenu } from "./components/SideNavbar";

import './assets/homePageStyle.css'
import ShowProject from "./pages/ShowProject";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanProjectsArray());
  }, [dispatch]);
  return ( 
    <BrowserRouter>
      
      <Header />
      <div className="universal-main-container flex flex-row  ">
          <div className="left-sidebar">

            <SidebarWithBurgerMenu />
          </div>
          <div className="universal-right-container w-full ">

              <Routes>
                <Route path="/sign-in" element={<LoginPage></LoginPage>}></Route>
                <Route path="/sign-up" element={<LoginPage></LoginPage>}></Route> 
                <Route path="/about" element={<About></About>}></Route>
                
              <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Home></Home>}></Route>
                  <Route path="/home" element={<Home></Home>}></Route>
                  <Route path="/create-project" element={<CreateProject />}/>
                  <Route path="/show-project" element={<ShowProject />}/>
                  <Route path="/project-details/:projectId" element={<ProjectDetails />}/>

                  <Route path="/show-member" element={<ShowMember />}/>
                  <Route path="/add-member" element={<AddMember />}/>
                {/* <Route path="/members" element={<Members></Members>}> */}
                {/* </Route>  */}
                  <Route path="/profile" element={<Profile></Profile>}></Route>
              </Route>
              <Route path="/new-project" element={<NewProject></NewProject>}></Route>
            </Routes>
          </div>
      </div>
    </BrowserRouter>
    // <LoginPage></LoginPage>
  );
}
