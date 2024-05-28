import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createProjectStart,
  createProjectSuccess,
  createProjectFailure,
} from "../redux/project/projectSlice";

import "../assets/elements.css"



const CreateProject = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { loading: projectLoading, error: projectError } = useSelector(
        (state) => state.project
      );
    const dispatch = useDispatch();
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
      }
    const navigate = useNavigate();
    const [projectFormData, setProjectFormData] = useState({});

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
          dispatch(createProjectSuccess(data)); // Dispatch success action with project data
          
          navigate("/new-project");
        } catch (error) {
          console.log(error);
          dispatch(createProjectFailure(error)); // Dispatch failure action with error message
        }
      };








  return (
    <>
        <div className=" h-full max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
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
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
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
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
                      onChange={handleProjectChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="form-field">
                    <label htmlFor="address" className="text-sm ml-5">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
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
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
                      onChange={handleProjectChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="state" className="text-sm ml-5">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
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
                    className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
                    onChange={handleProjectChange}
                  />
                </div>
                <button className="btn-primary">
                  {projectLoading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
    </>
  )
}

export default CreateProject