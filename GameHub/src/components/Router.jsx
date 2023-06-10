import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
const Router = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/"
          element={isLoggedIn ? <Home accessToken={localStorage.getItem('token') } userName={localStorage.getItem('userName')} /> : <Navigate to="/login" />}
        />
        
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
