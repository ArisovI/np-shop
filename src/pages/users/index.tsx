import React, { useEffect, useState } from "react";
import { Avatar, Button, Form, Input, Modal, Table, Upload } from "antd";
import Column from "antd/es/table/Column";
import { useAppDispatch, useAppSelector } from "../../store/hoc";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../store/slice/users/async";
import { useAvatar } from "../../hook/useAvatar";
import { UsersItem } from "../../types";

const Users = () => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const { beforeUpload, handleChange, imageUrl, uploadButton, setImageUrl } =
    useAvatar();

  const [newUser, setNewUser] = useState<UsersItem>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    await dispatch(createUser(newUser));
    setNewUser({
      name: "",
      email: "",
      password: "",
      avatar: "",
    });
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);

    console.log(newUser);
  };

  const editUser = (record: UsersItem) => {
    const item = users.find((user: UsersItem) => user.id === record.id);
    // dispatch(updateUser(record));
    if (item !== undefined) {
      console.log(item);
      setNewUser(item);
      setIsModalOpen(true);
    }
  };

  const delUser = (id: number | undefined) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, newUser]);

  return (
    <div className="flex flex-col gap-5">
      <Button
        className="w-[100px] ml-auto bg-blue-500 text-white text-base"
        onClick={showModal}
      >
        New user
      </Button>
      <div>
        <Table
          dataSource={users}
          size="middle"
          bordered
          rowKey={(recond) => String(recond.id)}
        >
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
            render={(_, record: UsersItem) => (
              <div className="flex gap-3">
                <Button onClick={() => editUser(record)}>Edit</Button>
                <Button onClick={() => delUser(record.id)}>Delete</Button>
              </div>
            )}
          />
        </Table>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form onFinish={onSubmit}>
          <Form.Item initialValue={newUser.avatar}>
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
            initialValue={newUser.name}
            rules={[
              {
                required: true,
                type: "string",
                message: "Please input your name!",
              },
            ]}
          >
            <Input
            // value={newUser.name}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            //   setNewUser((prev) => ({ ...prev, name: e.target.value }))
            // }
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            initialValue={newUser.email}
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
            initialValue={newUser.password}
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
