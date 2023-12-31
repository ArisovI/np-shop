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
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../store/slice/users/async";
import { useAvatar } from "../../hook/useAvatar";
import { UsersItem } from "../../types";
import { useForm } from "antd/es/form/Form";

const Users = () => {
  const { users, isError, isLoading } = useAppSelector((state) => state.users);
  const [messageApi, contextHolder] = message.useMessage();
  const [createOrEdit, setCreateOrEdit] = useState(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const { beforeUpload, handleChange, imageUrl, uploadButton, setImageUrl } =
    useAvatar();

  const showModal = () => {
    setIsModalOpen(true);
    setCreateOrEdit(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (user: UsersItem) => {
    dispatch(createUser(user));
    messageApi.open({
      type: "success",
      content: "You have created a new user",
      duration: 2,
    });
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };

  const editUser = (record: UsersItem) => {
    setCreateOrEdit(false);
    if (record !== undefined) {
      form.setFieldsValue(record);
      setIsModalOpen(true);
      setUserId(record.id);
    }
  };

  const edit = () => {
    const formItems = form.getFieldsValue();
    const id = userId;
    dispatch(updateUser({ ...formItems, id }));
    messageApi.open({
      type: "success",
      content: "You have successfully updated the user",
      duration: 2,
    });
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
    if (id !== undefined) {
      if (id > 3) {
        dispatch(updateUser({ ...formItems, id }));
        messageApi.open({
          type: "success",
          content: "You have successfully updated the user",
          duration: 2,
        });
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1000);
      } else {
        messageApi.open({
          type: "error",
          content: "You can't edit this user",
          duration: 2,
        });
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1000);
      }
    }
  };

  const delUser = (id: number | undefined) => {
    if (id !== undefined) {
      if (id > 3) {
        dispatch(deleteUser(id));
        messageApi.open({
          type: "success",
          content: "You deleted the user",
          duration: 2,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "You can't delete this user",
          duration: 2,
        });
      }
    }
  };

  const resetData = () => {
    setImageUrl("");
    messageApi.open({
      type: "success",
      content: "You cleared the form",
      duration: 2,
    });
  };

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);
  //   return;
  // }, []);

  // if (isError) {
  //   return <h1>ERROR</h1>;
  // }

  return (
    <div className="flex flex-col gap-3">
      {contextHolder}
      <Button
        className="w-[100px] ml-auto bg-blue-500 text-white text-base"
        onClick={() => showModal()}
      >
        New user
      </Button>
      <div>
        <Table
          dataSource={users}
          size="middle"
          bordered
          rowKey={(recond) => String(recond.id)}
          loading={isLoading}
          pagination={{ showSizeChanger: false }}
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
        <Form onFinish={onSubmit} form={form}>
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
              {createOrEdit ? (
                <Button htmlType="submit">Submit</Button>
              ) : (
                <Button htmlType="button" onClick={() => edit()}>
                  Edit
                </Button>
              )}
              <Button htmlType="reset" onClick={() => resetData()}>
                Reset
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );

export default Users 
