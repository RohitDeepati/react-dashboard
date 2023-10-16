import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "../../Pages/Dashboard/Dashboard";
import { Customers } from "../../Pages/Customers/Customers";
import { Inventory } from "../../Pages/Inventory/Inventory";
import { Income } from "../../Pages/Income/Income";
import { Orders } from "../../Pages/Orders/Orders";
import { Switch } from "antd";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/income" element={<Income />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
    </Routes>
  );
};
