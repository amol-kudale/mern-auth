import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  createProjectStart,
  createProjectSuccess,
  createProjectFailure,
} from "../redux/project/projectSlice";

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const { loading: projectLoading, error: projectError } = useSelector(
    (state) => state.project
  );
  const dispatch = useDispatch();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigate = useNavigate();

  const [projects, showProjects] = useState(false);
  const [projectFormData, setProjectFormData] = useState({});

  const [team, showTeam] = useState(false);
  const [memberFormData, setMemberFormData] = useState({});
  const [memberError, setMemberError] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);
  const [sendOTP, setSendOTP] = useState(false);

  const handleProjectClick = () => {
    showProjects(true);
  };

  const handleProjectChange = (e) => {
    setProjectFormData({ ...projectFormData, [e.target.id]: e.target.value });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createProjectStart()); // Dispatch start action
      const res = await fetch(
        `/api/project/create-project/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectFormData),
        }
      );
      const data = await res.json();
      if (data.success == false) {
        dispatch(createProjectFailure(data)); // Dispatch failure action with error
        return;
      }
      console.log(data);
      dispatch(createProjectSuccess(data)); // Dispatch success action with project data
      showProjects(false);
      navigate("/new-project");
    } catch (error) {
      console.log(error);
      dispatch(createProjectFailure(error)); // Dispatch failure action with error message
    }
  };

  const handleMemberClick = () => {
    showTeam(true);
  };

  const handleMemberChange = (e) => {
    setMemberFormData({ ...memberFormData, [e.target.id]: e.target.value });
    console.log(memberFormData);
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    showTeam(false);
    navigate("/otp-verify");
  };

  const handleOTPSend = async (e) => {
    e.preventDefault();
    setSendOTP(true);
    try {
      const res = await fetch(`/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber: memberFormData.mobileNumber }),
      });
      const data = await res.json();
      if (data.error) {
        console.error("Error sending OTP:", data.error);
        return;
      }
      console.log("OTP sent successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
        <h1 className="text-xl font-medium ml-5">
          Welcome, {currentUser.username}
        </h1>
      </div>
      <div className="flex justify-between items-center max-w-6xl mx-auto py-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
        <Menu as="div" className="relative inline-block text-left ml-5">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Your projects
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-right transform">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Project 1
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Project 2
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Project 3
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={handleProjectClick}
                    >
                      Create new project
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="relative inline-block text-left mr-5">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Your team
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-right transform">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Member 1
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Member 2
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Member 3
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={handleMemberClick}
                    >
                      Create new member
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {projects == true && (
        <div className="max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
          <h3 className="font-medium text-lg ml-5">Create new project</h3>
          <form
            onSubmit={handleProjectSubmit}
            className="flex flex-col gap-4 mt-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="form-field">
                <label htmlFor="name" className="text-sm ml-5">
                  Project name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleProjectChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="type" className="text-sm ml-5">
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleProjectChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-field">
                <label htmlFor="address" className="text-sm ml-5">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleProjectChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="city" className="text-sm ml-5">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleProjectChange}
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="description" className="text-sm ml-5">
                Project description
              </label>
              <textarea
                type="text"
                id="description"
                className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                onChange={handleProjectChange}
              />
            </div>
            <button className="bg-custom-dark-blue mt-3 text-white p-3 rounded-full uppercase hover:opacity-95 disabled:opacity-80">
              {projectLoading ? "Loading..." : "Save"}
            </button>
          </form>
        </div>
      )}

      {team == true && (
        <div className="max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
          <h3 className="font-medium text-lg ml-5">Create new member</h3>
          <form onSubmit={handleOTPSend} className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-field">
                <label htmlFor="name" className="text-sm ml-5">
                  Member name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleMemberChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="role" className="text-sm ml-5">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleMemberChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-field">
                <label htmlFor="mobileNumber" className="text-sm ml-5">
                  Mobile number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleMemberChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="text-sm ml-5">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleMemberChange}
                />
              </div>
            </div>

            {sendOTP === true && (
              <>
                <div className="form-field">
                  <label htmlFor="otp" className="text-sm ml-5">
                    Enter the 4-digit code sent to $
                    {memberFormData.mobileNumber}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      id="otp"
                      className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                      onChange={handleMemberChange}
                    />
                    <button className="bg-custom-dark-blue mt-3 text-white p-3 max-w-40 rounded-full uppercase hover:opacity-95 disabled:opacity-80">
                      {memberLoading ? "Loading..." : "Resend OTP"}
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={handleOTPSend}
              className="bg-custom-dark-blue mt-3 text-white p-3 rounded-full uppercase hover:opacity-95 disabled:opacity-80"
            >
              {memberLoading ? "Loading..." : "Send OTP"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Home;
