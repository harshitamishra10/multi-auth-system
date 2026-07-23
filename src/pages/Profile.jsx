// //import React from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
// const dispatch = useDispatch();
// const navigate = useNavigate();

// const handleLogout = () => {
//   localStorage.removeItem("token");

//   dispatch(logout());

//   navigate("/");
// };
//   return (
//     <div className="flex justify-center items-center h-screen text-3xl">
//       Login Successful 🎉
//     </div>
//   );
// };

// export default Profile;
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch(logout());

    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <h1 className="text-3xl font-bold">
        Login Successful 🎉
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;