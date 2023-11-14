import Admin from "./pages/admin";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Users from "./pages/users";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />}>
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
