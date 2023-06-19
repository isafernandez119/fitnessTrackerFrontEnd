import { Link } from "react-router-dom";

export default function Navbar({ user, setToken, setUser }) {
  function handleLogout() {
    console.log("logging out");
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  }
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/routines"}>Routines</Link>
      <Link to={"/activities"}>Activities</Link>
      {user.username && (
        <>
          <Link to={"/my_routines"}>My Routines</Link>
          <span>Welcome {user.username} </span>
          <Link onClick={handleLogout} to={"/"}>
            Logout
          </Link>
        </>
      )}
      {!user.username && (
        <>
          <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link>
        </>
      )}
    </div>
  );
}
