import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function LoginForm({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/v1/auth', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {

        if(data.success){
          Cookies.set("auth", "true", { expires: 1, secure: true, sameSite: "Strict" })
          localStorage.setItem("auth", "true");
          setIsAuthenticated(true);
          navigate("/", {replace: true});
        }else{
          alert("Wrong username or password!");
        }

      });

    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg w-150">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700">Username</label>
            <input
              type="name"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-12">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-black transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
