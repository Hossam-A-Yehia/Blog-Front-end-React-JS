import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/home/nav/Nav";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Write from "./pages/write/Write"
import Update from "./pages/update/Update"
import Single from "./pages/single/Single"

const App = () => {
  const { users } = useSelector(state => state.user)


  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={users ? <Home/>: <Login/>} />
        <Route path="/register" element={users ? <Home/>: <Register/>} />
        <Route path="/write" element={users ? <Write/>: <Register/>} />
        <Route path="/update/:id" element={users ? <Update/>: <Register/>} />
        <Route path="/posts/:id" element={users ? <Single/>: <Register/>} />
      </Routes>
    </Router>
  );
};

export default App;
