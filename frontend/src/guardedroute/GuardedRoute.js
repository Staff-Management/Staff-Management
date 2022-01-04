import { selectLogin } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuardedRoute({ children }){
  const local_user = localStorage.getItem("user");
  const loggedin = useSelector(selectLogin);
  return (
    local_user || loggedin ? children : <Navigate replace to="/Login" />
  )
}