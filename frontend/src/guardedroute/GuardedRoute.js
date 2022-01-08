import { selectLogin, setEmail } from "../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuardedRoute({ children }){
  const dispatch = useDispatch();
  const local_user = localStorage.getItem("user");
  if (local_user)
  {
    dispatch(setEmail({ email: JSON.parse(local_user).email }));
  }
  const loggedin = useSelector(selectLogin);
  return (
    local_user || loggedin ? children : <Navigate replace to="/authenticate/signin" />
  )
}