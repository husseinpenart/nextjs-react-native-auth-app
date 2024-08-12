"use client";
import Login from "@/app/components/user/Login";
import Camera from "@/app/components/user/model/Camera";
import Register from "@/app/components/user/SignUp";
import React, { useState } from "react";

const page = () => {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const registerButton = () => {
    setRegister(!register);
    setLogin(false);
    console.log("register part");
  };
  const LoginButton = () => {
    setLogin(true);
    setRegister(false);
    console.log("Login part");
  };
  return (
    <div className="grid grid-rows-1 gap-5">
      <Camera />
      <div className="flex  gap-10 mx-auto my-10">
        <button
          className="bg-slate-400 p-5 text-slate-300 rounded-md shadow-lg cursor-pointer"
          onClick={registerButton}
        >
          Register
        </button>
        <button
          onClick={LoginButton}
          className="bg-slate-400 p-5 text-slate-300 rounded-md shadow-lg cursor-pointer"
        >
          Login
        </button>
      </div>
      {register ? <Register /> : login ? <Login /> : <Register />}
    </div>
  );
};

export default page;
