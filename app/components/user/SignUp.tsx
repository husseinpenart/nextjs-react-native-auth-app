"use client";
import { RegisterFetcher } from "@/middleware/protected/auth/Register";
import React, { FormEvent, useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await RegisterFetcher("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, username, password })
    });

    console.log("register status: ", res);

    if (res.status === 200) {
      alert(res.data.message);
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="mx-auto block">
      <h3 className="text-center text-3xl text-slate-900">Registration</h3>
      <div className="grid grid-cols-2 gap-5 my-10">
        <input
          name="name"
          type="text"
          className="p-5 border-2 w-96 h-10 rounded-lg"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          name="email"
          type="email"
          className="p-5 border-2 w-96 h-10 rounded-lg"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="username"
          type="text"
          className="p-5 border-2 w-96 h-10 rounded-lg"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="p-5 border-2 w-96 h-10 rounded-lg"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="block mx-auto border-2 border-blue-400 p-4 rounded-lg"
        onClick={handleSubmit}
      >
        Register
      </button>
    </div>
  );
};

export default SignUp;
