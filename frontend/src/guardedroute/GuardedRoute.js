import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuardedRoute({ children }){
  const local_user = localStorage.getItem("user");
  const store_user = useSelector(selectUser);
  return (
    local_user || store_user ? children : <Navigate replace to="/Login" />
  )
}