import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { hydrateStore } from "../redux/store";

// Trigger the hydrateStore function when the window loads
window.onload = () => {
  hydrateStore();
};

export default function NewProject() {
  const location = useLocation();
  const projectFormData = location.state.projectFormData || {};
  const { currentUser } = useSelector((state) => state.user);

  const createdProjects = currentUser.createdProjects || [];

  const onFinish = async (values) => {
    console.log("Received values of form:", values);
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/project/update-project/${projectFormData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
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

  return (
    <div className="max-w-6xl mx-auto mt-7">
      {console.log(createdProjects)}
      <h1 className="text-xl font-medium text-center">
        {projectFormData.name}
      </h1>
      <Form
        onFinish={onFinish}
        className="max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray"
      >
        <h3 className="font-medium text-lg ml-5">Add wings</h3>
        <Form.List name="wingDetails">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 3,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "wingName"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing wing name",
                      },
                    ]}
                    className="bg-slate-100 rounded-full w-full p-3 pl-5 mt-2 border-0"
                  >
                    <Input placeholder="Wing name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "numFloors"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing number of floors",
                      },
                    ]}
                  >
                    <Input placeholder="Number of floors" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "flatsPerFloor"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing last name",
                      },
                    ]}
                  >
                    <Input placeholder="Flats per floor" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button
            htmlType="submit"
            className="bg-custom-dark-blue mt-3 text-white p-3 rounded-full uppercase hover:opacity-95 disabled:opacity-80"
          >
            Save
          </Button>
        </Form.Item>
      </Form>{" "}
      {/* Close the Form component here */}
    </div>
  );
}
