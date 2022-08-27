import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { UserContext } from "./contexts/user.context";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./routes/home/home";
import Navigation from "./routes/navigation/navigation";
import Authentication from "./routes/authentication/authentication";
// import {Catfact} from './components/catfact/catfact'


const App = () => {
  const { isAnonymous } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* <Route path="shop" element={<Shop />} />
        */<Route
          path="auth"
          element={
            isAnonymous ?  <Authentication />  : <Navigate to="/" replace />
          }
        /> }
      </Route>
    </Routes>
  );
};

export default App;
