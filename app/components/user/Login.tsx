import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "universal-cookie";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const cookies = new Cookies();
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        // Store the token in a secure cookie
        cookies.set("@Token", data.token, {
          sameSite: "strict",
          path: "/"
        });

        // Log to verify the cookie is set
        console.log("Token set in cookie: ", cookies.get("@Token"));

        alert(data.message);
        data.user.isAdmin
          ? router.push("/pages/admin")
          : router.push("/pages/profile");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred, please try again later.");
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto block">
      <h3 className="text-center text-3xl text-slate-900">Login</h3>
      <div className="grid grid-cols-2 gap-5 my-10 ">
        <input
          name="email"
          type="email"
          className="p-5 border-2 w-96 h-10 rounded-lg"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        onClick={handleLogin}
      >
        login
      </button>
    </div>
  );
};

export default Login;
