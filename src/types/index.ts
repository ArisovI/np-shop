import { UploadFile } from "antd";
export type UsersState = {
  users: UsersItem[];
  isLoading: boolean;
  isError: null | string | undefined;
};

export type UsersItem = {
  id?: number;
  email: string;
  password: string;
  name: string;
  role?: string;
  avatar: string;
  key?: number;
};

export type UpdateItem = {
  email: string;
  name: string;
};

export type ProductsState = {
  products: ProductsItem[];
  isLoading: boolean;
  isError: null | string | undefined;
};

export type ProductsItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: {
    id: number;
    name: string;
    image: string;
  };
  images: string[] | UploadFile[];
};

export type ProductsItemCreate = {
  categoryId: number;
  title: string;
  price: number;
  description: string;
  images: string[] | UploadFile[];
};

export type CategoriesState = {
  categories: CategoriesItem[];
  isLoading: boolean;
  isError: null | string | undefined;
};

export type CategoriesItem = {
  id: number;
  name: string;
  image: string;
};
