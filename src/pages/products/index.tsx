import { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Table,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import Column from "antd/es/table/Column";
import { useAppDispatch, useAppSelector } from "../../store/hoc";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProducts,
} from "../../store/slice/products/async";
import { ProductsItem } from "../../types";
import { useModal } from "../../hook/useModal";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { RcFile } from "antd/es/upload";
import ImgCrop from "antd-img-crop";

const Products = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [createOrEdit, setCreateOrEdit] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [form] = useForm();
  const { products, isLoading, isError } = useAppSelector(
    (state) => state.products
  );
  //modal for images
  const [imagesModal, setImagesModal] = useState(false);
  const [pictures, setPictures] = useState<string[] | UploadFile[]>([]);
  const handleShowImages = (record: ProductsItem) => {
    setImagesModal(true);
    setPictures(record.images);
  };
  const handleOkForImages = () => {
    setImagesModal(false);
  };

  const handleCancelForImages = () => {
    setImagesModal(false);
  };

  const {
    showModal,
    handleOkForDesc,
    handleCancelForDesc,
    descModal,
    modalDesc,
  } = useModal();

  //delete the product
  const handleDeleteProduct = (id: number) => {
    if (id !== undefined) {
      dispatch(deleteProduct(id));
      messageApi.open({
        type: "success",
        content: "You have delete the product",
        duration: 2,
      });
    }
  };

  //modal for create products
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const handleSubmit = (product: ProductsItem) => {
    if (product !== undefined) {
      dispatch(createProduct({ ...product, categoryId }));
      messageApi.open({
        type: "success",
        content: "You have created a new product",
        duration: 2,
      });
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShowModalCreate = () => {
    setCreateOrEdit(true);
    setIsModalOpen(true);
    form.resetFields();
  };

  //reset form
  const resetForm = () => {
    setFileList([]);
    messageApi.open({
      type: "success",
      content: "You cleared the form",
      duration: 2,
    });
  };

  //edit product
  const handleShowModalEdit = (record: ProductsItem) => {
    setCreateOrEdit(false);
    if (record !== undefined) {
      form.setFieldsValue({ ...record, category: record.category?.name });
      setIsModalOpen(true);
      setUserId(record.id);
      if (record.category?.id !== undefined) {
        setCategoryId(record.category?.id);
      }
    }
  };

  const handleEditProduct = () => {
    const formProducts = form.getFieldsValue();
    const id = userId;
    dispatch(updateProducts({ ...formProducts, id }));
    messageApi.open({
      type: "success",
      content: "You have successfully updated the product",
      duration: 2,
    });
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };

  //for images upload
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleChange = (_: string, option: any) => {
    setCategoryId(option.id);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3">
      {contextHolder}
      <Button
        onClick={handleShowModalCreate}
        className="w-[120px] ml-auto bg-blue-500 text-white text-base"
      >
        New Product
      </Button>

      <div>
        <Table
          dataSource={products}
          size="middle"
          loading={isLoading}
          bordered
          rowKey={(recond) => String(recond.id)}
          pagination={{ showSizeChanger: false }}
        >
          <Column dataIndex="id" key="id" title="Id" ellipsis />
          <Column dataIndex="title" key="title" title="Title" />
          <Column dataIndex="price" key="price" title="Price" />
          <Column
            dataIndex="description"
            key="description"
            title="Description"
            render={(_, record: ProductsItem) => (
              <div className="flex justify-center">
                <Button onClick={() => showModal(record.description)}>
                  Description
                </Button>
                <Modal
                  open={descModal}
                  onOk={handleOkForDesc}
                  onCancel={handleCancelForDesc}
                  footer={null}
                >
                  <p>{modalDesc}</p>
                </Modal>
              </div>
            )}
          />
          <Column
            dataIndex="category"
            key="category"
            title="Category"
            render={(_, record: ProductsItem) => (
              <span>{record.category?.name}</span>
            )}
          />
          <Column
            dataIndex="images"
            key="images"
            title="Images"
            render={(_, record: ProductsItem) => (
              <div className="flex justify-center">
                <Button onClick={() => handleShowImages(record)}>Images</Button>
                <Modal
                  open={imagesModal}
                  onOk={handleOkForImages}
                  onCancel={handleCancelForImages}
                  footer={null}
                >
                  <Carousel autoplay>
                    {pictures.length ? (
                      pictures.map((imageUrl) => (
                        <div key={imageUrl.toString()}>
                          <img
                            src={imageUrl.toString()}
                            alt={imageUrl.toString()}
                          />
                        </div>
                      ))
                    ) : (
                      <h1>ERROR</h1>
                    )}
                  </Carousel>
                </Modal>
              </div>
            )}
          />
          <Column
            dataIndex="action"
            key="action"
            title="action"
            render={(_, record: ProductsItem) => (
              <div className="flex gap-3">
                <Button onClick={() => handleShowModalEdit(record)}>
                  Edit
                </Button>
                <Button onClick={() => handleDeleteProduct(record.id)}>
                  Delete
                </Button>
              </div>
            )}
          />
        </Table>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item label="Images" name="images">
            <ImgCrop rotationSlider>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 3 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item
            label="Title for Product"
            name="title"
            rules={[
              {
                required: true,
                type: "string",
                message: "Please input your title for product!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                type: "string",
                message: "Please add price for your product",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Space wrap>
              <Select
                defaultValue={form.getFieldValue("category")}
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { id: 1, value: "clothes", label: "Clothes" },
                  { id: 2, value: "electronics", label: "Electronics" },
                  { id: 3, value: "furniture", label: "Furniture" },
                  { id: 4, value: "shoes", label: "Shoes" },
                  { id: 5, value: "miscellaneous", label: "Miscellaneous" },
                ]}
              />
            </Space>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                type: "string",
                message: "Please write a description of your product",
              },
            ]}
          >
            <TextArea rows={5} />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-5">
              {createOrEdit ? (
                <Button htmlType="submit">Submit</Button>
              ) : (
                <Button htmlType="button" onClick={handleEditProduct}>
                  Edit
                </Button>
              )}
              <Button htmlType="reset" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export { Products };
