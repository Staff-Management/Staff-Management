import { selectRole } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuardedRoute({ children }){
  const local_user = localStorage.getItem("user");
  const local_role = local_user === null ? null : JSON.parse(local_user).role;
  const role = useSelector(selectRole);
  return (
    local_role === 'hr' || role === 'hr' ? children : <Navigate replace to="/authenticate/signin" />
  )
}