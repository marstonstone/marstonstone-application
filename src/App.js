import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Header from "./component/Header/Header";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import ToBeConfirm from "./page/ToBeConfirm";
import Quotation from "./page/Quotation";
import Supplier from "./page/Supplier";
import Processing from "./page/Processing";
import Done from "./page/Done";
import PageNotFound from "./page/PageNotFound";
import Customer from "./page/Customer";
import Home from "./page/Home";
import Box from "@mui/material/Box";

function App() {
  const [title, setTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, " ");
    setTitle(parsedTitle.toUpperCase());
  }, [location]);
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <Box style={{ width: "100%" }}>
        <Header title={title} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toBeConfirm" element={<ToBeConfirm />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/supplier/:name" element={<Supplier />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/done" element={<Done />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/404" element={<PageNotFound />} />
        </Routes>
      </Box>

      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default App;
