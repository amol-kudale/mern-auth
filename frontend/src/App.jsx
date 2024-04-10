import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        {/* <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route> */}
        <Route path="/sign-in" element={<LoginPage></LoginPage>}></Route>
        <Route path="/sign-up" element={<LoginPage></LoginPage>}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    // <LoginPage></LoginPage>
  );
}
