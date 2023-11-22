import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Table,
  Upload,
  message,
} from "antd";
import Column from "antd/es/table/Column";
import { useAppDispatch, useAppSelector } from "../../store/hoc";
import { getUsers } from "../../store/slice/users/async";
import { useAvatar } from "../../hook/useAvatar";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  })
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const newFilteredUsers = users.map((user) => ({ ...user, key: user?.id }));

  const { beforeUpload, handleChange, imageUrl, uploadButton, setImageUrl } =
    useAvatar();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="flex flex-col gap-5">
      <Button
        className="w-[100px] ml-auto bg-blue-500 text-white text-base"
        onClick={showModal}
      >
        New user
      </Button>
      <div>
        <Table dataSource={newFilteredUsers} size="middle" bordered>
          <Column dataIndex="id" key="id" title="№" ellipsis />
          <Column
            dataIndex="avatar"
            key="avatar"
            title="Avatar"
            render={(avatar) => <Avatar src={avatar} />}
          />
          <Column dataIndex="name" key="name" title="Name" />
          <Column dataIndex="email" key="email" title="Email" />
          <Column
            dataIndex="password"
            key="password"
            title="Password"
            render={(password) => <Input.Password value={password} readOnly />}
          />
          <Column dataIndex="role" key="role" title="Role" />
          <Column
            dataIndex="action"
            key="action"
            title="Action"
            render={() => (
              <div className="flex gap-3">
                <Button>Edit</Button>
                <Button>Delete</Button>
              </div>
            )}
          />
        </Table>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form onFinish={onSubmit}>
          <Form.Item>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    borderRadius: "50%",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                type: "string",
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-5">
              <Button htmlType="submit">Submit</Button>
              <Button htmlType="reset" onClick={() => setImageUrl("")}>
                Reset
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export { Users };
