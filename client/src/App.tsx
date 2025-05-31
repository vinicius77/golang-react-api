import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";

import "@/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
