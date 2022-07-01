import logo from "./logo.svg";
import "./App.css";
import PageHeader from "./components/PageHeader";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Table from "./components/Table";
import RequireAuth from "./Shared/RequireAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App ">
      <PageHeader></PageHeader>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Table></Table>
            </RequireAuth>
          }
        ></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
