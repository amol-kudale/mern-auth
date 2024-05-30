import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "../assets/header.css";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="header">
      <div className="flex justify-between items-center mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold uppercase text-xl hover:text-custom-dark-blue">
            Tracify
          </h1>
        </Link>
        <ul className="flex gap-12 items-center">
          {/* <Link to="/about">
            <li>About</li>
          </Link> */}
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt={currentUser.username}
                className="h-7 w-7 rounded-full object-cover"
              ></img>
            ) : (
              <li>Sign In</li>
            )}
          </Link>

          {currentUser
            ? currentUser.username.charAt(0).toUpperCase() +
              currentUser.username.slice(1).toLowerCase()
            : "Guest"}
        </ul>
      </div>
    </div>
  );
}

export default Header;
