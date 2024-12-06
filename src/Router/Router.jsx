import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../page/Home/Home/Home";
import Root from "../Layout/Root/Root";
import Admin from "../page/Admin/Admin/Admin";
import AddWord from "../page/Admin/AddWord/AddWord";
import ManageWord from "../page/Admin/ManageWord/ManageWord";
import Update from "@/page/Admin/Update/Update";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent: Root */}
        <Route path="/" element={<Root />}>
          {/* Child-1: Home */}
          <Route index element={<Home />} />
        </Route>

        <Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/addWord" element={<AddWord />} />
          <Route path="/manageWord" element={<ManageWord />} />
          <Route path="/update/:category/:id" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
