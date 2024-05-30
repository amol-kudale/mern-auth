import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFloorsToWing,
  addWingToProject,
} from "../redux/project/projectSlice";

import '../assets/projectDetails.css';


export default function NewProject() {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state)=> state.user);
  const currentUserId = currentUser._id;
  const { projects } = useSelector((state) => state.project);
  const currentProject = projects[projects.length - 1];
  const projectId = currentProject._id;

  const [wings, showWings] = useState(false);
  const [memberList, showMemberList] = useState(false);
  const [wingFormData, setWingFormData] = useState({});
  const [flats, showFlats] = useState(false);
  const [flatsData, setFlatsData] = useState([]); // State to hold flats information

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleWingClick = () => {
    showWings(true);
    showMemberList(false);
  };
  const handleAssignMemberClick = () => {
    showMemberList(true);
    showWings(false);
  };
  useEffect(() => {
    fetchProject();
    fetchMembers();
  }, []);


  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/project/project-details/${projectId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log("this is project details")
      setProject(result);
      console.warn(result)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <p>Loading project details...</p>;
  if (error) return <p>Error fetching project details: {error.message}</p>;

  const fetchMembers = async () => {
    try {
      const response = await fetch(`/api/teamuser/members/${currentUserId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setMembers(result);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleMemberSelection = (memberId) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleAllocateMembers = async () => {
    try {

      // const selectedMemberObjects = members.filter(member => selectedMembers.includes(member._id));

      const response = await fetch(`/api/project/allocate-members/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members: selectedMembers }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok for member allocation');
      }
      fetchProject();
    } catch (error) {
      console.error("Error allocating members:", error);
    }
  };

  const filteredMembers = members.filter((member) =>
    project.teamMembers.some((teamMember) => teamMember === member._id)
  );
  console.log(filteredMembers , "filtered members")


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
      const wingId = data.currentWing._id;
      dispatch(addWingToProject({ projectId: projectId, wingId: wingId }));
      // Generate forms for each floor based on the response
      const { numberOfFloors, flatsPerFloor, createdFloors } = data.currentWing;
      const floorsData = Array.from({ length: numberOfFloors }, (_, index) => ({
        floorId: createdFloors[index],
        flats: Array.from({ length: flatsPerFloor }, () => ({
          flatNumber: "",
          status: "available",
          addInfo: "",
        })),
      }));
      setFlatsData(floorsData);
      showWings(false);
      showFlats(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWingChange = (e) => {
    setWingFormData({ ...wingFormData, [e.target.id]: e.target.value });
  };

  const handleFlatChange = (floorIndex, flatIndex, field, value) => {
    const updatedFlatsData = [...flatsData];
    updatedFlatsData[floorIndex].flats[flatIndex][field] = value;
    setFlatsData(updatedFlatsData);
  };

  const handleFloorSubmit = async (floorIndex) => {
    const floorData = flatsData[floorIndex];
    try {
      const res = await fetch(
        `/api/project/create-floor/${floorData.floorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(floorData),
        }
      );
      const data = await res.json();
      if (data.success == false) {
        console.log("Error submitting floor:", data.message);
        return;
      }
      console.log("Floor submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting floor:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
        <h1 className="text-xl font-medium ml-5">
          {currentProject.name}, {currentProject.address}, {currentProject.city}
        </h1>
      </div>
      <div className="flex justify-between items-center max-w-6xl mx-auto py-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
        <button
          onClick={handleWingClick}
          className="btn-primary bg-custom-dark-blue text-white py-2 px-3 ml-5 rounded-full hover:opacity-95 disabled:opacity-80"
        >
          Add wing
        </button>
        <button
          onClick={handleAssignMemberClick}
         className="btn-primary bg-custom-dark-blue text-white py-2 px-3 mr-5 rounded-full hover:opacity-95 disabled:opacity-80">
          Assign members
        </button>
      </div>
      {wings == true && (
        <div className="max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
          <h3 className="font-medium text-lg ml-5">Create new wing</h3>
          <hr className="max-w-6xl mx-auto p-3 mt-3 mx-3"></hr>
          <form onSubmit={handleWingSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="form-field">
                <label htmlFor="wingName" className="text-sm ml-5">
                  Wing name
                </label>
                <input
                  type="text"
                  id="wingName"
                  className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
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
                  className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
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
                  className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
                  onChange={handleWingChange}
                />
              </div>
            </div>

            <button className="btn-primary bg-custom-dark-blue mt-3 text-white p-3 rounded-full uppercase hover:opacity-95 disabled:opacity-80">
              Save
            </button>
          </form>
        </div>
      )}

      {flats == true && (
        <div className="max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
          <h3 className="font-medium text-lg ml-5">
            Wing - {wingFormData.wingName}
          </h3>
          <hr className="max-w-6xl mx-auto p-3 mt-3 mx-3"></hr>
          {flatsData.map((floor, floorIndex) => (
            <div key={floor.floorId} className="mb-8">
              <h2 className="ml-5 font-medium">Floor {floorIndex + 1}</h2>
              <hr className="max-w-6xl mx-auto mt-3 mx-3"></hr>

              {floor.flats.map((flat, flatIndex) => (
                <div
                  key={`${floorIndex}-${flatIndex}`}
                  className="grid grid-cols-3 gap-3 mt-7"
                >
                  <div className="form-field">
                    <label htmlFor="flatNumber" className="text-sm ml-5">
                      Flat Number
                    </label>
                    <input
                      type="text"
                      value={flat.flatNumber}
                      onChange={(e) =>
                        handleFlatChange(
                          floorIndex,
                          flatIndex,
                          "flatNumber",
                          e.target.value
                        )
                      }
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="status" className="text-sm ml-5">
                      Booking Status
                    </label>
                    <select
                      value={flat.status}
                      onChange={(e) =>
                        handleFlatChange(
                          floorIndex,
                          flatIndex,
                          "status",
                          e.target.value
                        )
                      }
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
                    >
                      <option value="available">Available</option>
                      <option value="booked">Booked</option>
                      <option value="blocked">Blocked</option>
                      <option value="held">Hold</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="bhk" className="text-sm ml-5">
                      BHK
                    </label>
                    <input
                      type="number"
                      value={flat.bhk}
                      onChange={(e) =>
                        handleFlatChange(
                          floorIndex,
                          flatIndex,
                          "bhk",
                          e.target.value
                        )
                      }
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="area" className="text-sm ml-5">
                      Area (sqft)
                    </label>
                    <input
                      type="number"
                      value={flat.area}
                      onChange={(e) =>
                        handleFlatChange(
                          floorIndex,
                          flatIndex,
                          "area",
                          e.target.value
                        )
                      }
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="price" className="text-sm ml-5">
                      Price
                    </label>
                    <input
                      type="number"
                      value={flat.price}
                      onChange={(e) =>
                        handleFlatChange(
                          floorIndex,
                          flatIndex,
                          "price",
                          e.target.value
                        )
                      }
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="addInfo" className="text-sm ml-5">
                      Additional Info
                    </label>
                    <input
                      type="text"
                      value={flat.addInfo}
                      onChange={(e) =>
                        handleFlatChange(
                          floorIndex,
                          flatIndex,
                          "addInfo",
                          e.target.value
                        )
                      }
                      className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
                    />
                  </div>
                  <br></br>
                </div>
              ))}
              <button
                onClick={() => handleFloorSubmit(floorIndex)}
                className="btn-primary bg-custom-dark-blue mt-5 text-white p-3 rounded-full uppercase hover:opacity-95 disabled:opacity-80"
              >
                Submit Floor Data
              </button>
            </div>
          ))}
        </div>
      )}

      {
        memberList == true &&(
          <div>
            
                <h1>Allocated Members</h1>
            <div className='allocated-members'>
                  
                  {
                    filteredMembers.map((member)=>(
                      <li  key={member._id}>
                        {member.name}
                      </li>
                    ))
                  }
            </div> 
            <br /><br />
            <div className='allocate-member-list' >
              {members.map((member) => (

              
              
                
                <div className='member-allocation' key={member._id}>
                
                  <input
                    type="checkbox"
                    onChange={() => handleMemberSelection(member._id)}
                    checked={selectedMembers.includes(member._id)}
                  />
                  {member.name}
                </div>
              
              )
              )}
            </div>
              <button className='btn-primary' onClick={handleAllocateMembers}>Allocate Members</button>
          </div>
        )
      }
    </>
  );
}
