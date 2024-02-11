import { Route, Routes } from "react-router-dom";

import { Admin } from "./pages/admin";
import { Home } from "./pages/home";
import { Users } from "./pages/users";
import { Products } from "./pages/products";
import { Categories } from "./pages/categories";

const App = () => {
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

export { App };
