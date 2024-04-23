import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useSelector } from "react-redux";

// window.onload = () => {
//   hydrateStore();
// };

export default function NewProject() {
  const { projects } = useSelector((state) => state.project);
  const projectName = projects[projects.length - 1].name;
  const projectId = projects[projects.length - 1]._id;

  const [wings, showWings] = useState(false);
  const [wingFormData, setWingFormData] = useState({});

  const handleWingClick = () => {
    showWings(true);
  };

  const handleWingSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/project/create-wing/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wingFormData),
      });
      const data = await res.json();
      if (data.success == false) {
        console.log("Backend error");
        return;
      }
      console.log(data);
      showWings(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWingChange = (e) => {
    setWingFormData({ ...wingFormData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
        <h1 className="text-xl font-medium ml-5">{projectName}</h1>
      </div>
      <div className="flex justify-between items-center max-w-6xl mx-auto py-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
        <button
          onClick={handleWingClick}
          className="bg-custom-dark-blue text-white py-2 px-3 ml-5 rounded-full hover:opacity-95 disabled:opacity-80"
        >
          Add wing
        </button>
        <button className="bg-custom-dark-blue text-white py-2 px-3 mr-5 rounded-full hover:opacity-95 disabled:opacity-80">
          Assign members
        </button>
      </div>
      {wings == true && (
        <div className="max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
          <h3 className="font-medium text-lg ml-5">Create new wing</h3>
          <form
            onSubmit={handleWingSubmit}
            className="flex flex-col gap-4 mt-4"
          >
            <div className="grid grid-cols-3 gap-3">
              <div className="form-field">
                <label htmlFor="wingName" className="text-sm ml-5">
                  Wing name
                </label>
                <input
                  type="text"
                  id="wingName"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleWingChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="numberOfFloors" className="text-sm ml-5">
                  Number of floors
                </label>
                <input
                  type="text"
                  id="numberOfFloors"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleWingChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="flatsPerFloor" className="text-sm ml-5">
                  Flats per floor
                </label>
                <input
                  type="text"
                  id="flatsPerFloor"
                  className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2"
                  onChange={handleWingChange}
                />
              </div>
            </div>

            <button className="bg-custom-dark-blue mt-3 text-white p-3 rounded-full uppercase hover:opacity-95 disabled:opacity-80">
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
