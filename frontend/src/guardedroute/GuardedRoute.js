import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuardedRoute({ children }){
  const user = localStorage.getItem("user");
  return (
    user ? children : <Navigate replace to="/Login" />
  )
}