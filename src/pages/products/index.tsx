import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Upload } from "antd";
import Column from "antd/es/table/Column";
import { useAppDispatch, useAppSelector } from "../../store/hoc";
import { getProducts } from "../../store/slice/products/async";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { ProductsItem } from "../../types";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, isError } = useAppSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  //modal

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
    </div>
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_: any, record: ProductsItem) => (
        <>
          {record.description}
          <Button onClick={showModal}>Description</Button>
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancelModal}
            footer={null}
          >
            <p>{record.description}</p>
          </Modal>
        </>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_: any, record: ProductsItem) => (
        <span>{record.category.name}</span>
      ),
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (_: any, record: ProductsItem) => (
        <div style={{ background: "red" }}>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <div className="flex gap-3">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={products}
        size="middle"
        loading={isLoading}
        bordered
        rowKey={(recond) => String(recond.id)}
        pagination={{ showSizeChanger: false }}
        columns={columns}
      >
        {/*       <Column dataIndex="id" key="id" title="Id" ellipsis />
        <Column dataIndex="title" key="title" title="Title" />
        <Column dataIndex="price" key="price" title="Price" />
        <Column
          dataIndex="description"
          key="description"
          title="Description"
          render={(_, record: ProductsItem) => (
            <>
              {record.description}
              <Button onClick={showModal}>Description</Button>
              <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancelModal}
                footer={null}
              >
                <p>{record.description}</p>
              </Modal>
            </>
          )}
        />
        <Column
          dataIndex="category"
          key="category"
          title="Category"
          render={(_, record: ProductsItem) => (
            <span>{record.category.name}</span>
          )}
        />
        <Column
          dataIndex="images"
          key="images"
          title="Images"
          render={() => (
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          )}
        />
        <Column
          dataIndex="action"
          key="action"
          title="action"
          render={(_) => (
            <div className="flex gap-3">
              <Button>Edit</Button>
              <Button>Delete</Button>
            </div>
          )}
        /> */}
      </Table>
    </div>
  );
};

export { Products };
