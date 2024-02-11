import { RootState } from "./index";
import { useAppSelector } from "./hoc";

const selectUsersState = (state: RootState) => state.users;

export const useSelectUsers = () =>
  useAppSelector((state: RootState) => selectUsersState(state).users);

export const useSelectIsLoading = () =>
  useAppSelector((state: RootState) => selectUsersState(state).isLoading);

export const useSelectIsError = () =>
  useAppSelector((state: RootState) => selectUsersState(state).isError);

const selectProductsState = (state: RootState) => state.products;

export const useSelectProducts = () => {
  useAppSelector((state: RootState) => selectProductsState(state).products);
};
