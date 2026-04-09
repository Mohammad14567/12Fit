import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import Diet from "./pages/Diet";
import Products from "./pages/Products";

import PublicOnlyRoute from "./components/PublicOnlyRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />


        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login"element={<Login />}/>
            <Route path="/register"element={<Register />}/>
            <Route path="/dashboard"element={<Dashboard />}/>
            <Route path="/workout"element={<Workout /> }/>
            <Route path="/diet"element={ <Diet />}/>
            <Route path="/products"element={<Products /> }/>
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
