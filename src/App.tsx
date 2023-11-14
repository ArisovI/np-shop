import Admin from "./pages/admin";
import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Users } from "./pages/users";
import { Products } from "./pages/products";
import { Categories } from "./pages/categories";
import { useAppDispatch } from "./store/hoc";
import { useEffect } from "react";
import { getUsers } from "./store/slice/users/async";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers())
  },)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />}>
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
