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

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanProjectsArray());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/sign-in" element={<LoginPage></LoginPage>}></Route>
        <Route path="/sign-up" element={<LoginPage></LoginPage>}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Route>
        <Route path="/new-project" element={<NewProject></NewProject>}></Route>
      </Routes>
    </BrowserRouter>
    // <LoginPage></LoginPage>
  );
}
