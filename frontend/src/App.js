import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin } from './slices/userSlice';
import GuardedRoute from './guardedroute/GuardedRoute';
import Onboarding from './features/onboarding/Onboarding';
import SignUp from './features/signup/SignUp';
import Login from './features/login/Login'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const local_user = localStorage.getItem("user");
    if (local_user) {
      dispatch(setLogin());
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />}/>
        <Route 
          path="/"
          element={
          <GuardedRoute>
            <SignUp />
          </GuardedRoute>
          }
        />
        {/* <Route 
          path="/"
          element={<Onboarding />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
