import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOut,
} from "../redux/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("api/auth/sign-out");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-field flex items-center gap-4 bg-slate-100 rounded-full">
          <FontAwesomeIcon icon={faUser} className="text-gray-500 ml-4" />
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-100 rounded-full w-full p-3 pl-2"
            onChange={handleChange}
          />
        </div>
        <div className="form-field flex items-center gap-4 bg-slate-100 rounded-full">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 ml-4" />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 rounded-full w-full p-3 pl-2"
            onChange={handleChange}
          />
        </div>
        <div className="form-field flex items-center gap-4 bg-slate-100 rounded-full">
          <FontAwesomeIcon icon={faLock} className="text-gray-500 ml-4" />
          <input
            defaultValue="......."
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 rounded-full w-full p-3 pl-2"
            onChange={handleChange}
          />
        </div>
        <button className="bg-slate-700 mt-3 text-white p-3 rounded-full uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <button
        onClick={handleSignOut}
        className="w-full mt-5 bg-red-700 text-white p-3 rounded-full uppercase hover:opacity-95 disabled:opacity-80"
      >
        Sign out
      </button>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "User is updated successfully!"}
      </p>
    </div>
  );
}
