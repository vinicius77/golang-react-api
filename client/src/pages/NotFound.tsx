import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn’t exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
