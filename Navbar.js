import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    role = decoded.role;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      {role === "Admin" && <Link to="/dashboard">Dashboard</Link>} |{" "}
      <Link to="/projects">Projects</Link> |{" "}
      <Link to="/tasks">Tasks</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;