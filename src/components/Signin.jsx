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
    <div className="flex items-center justify-center min-h-screen bg-[#15151f]">
      <div className="bg-[#1e1e2b] p-12 rounded-lg shadow-lg w-150">
        <h2 className="text-2xl font-bold text-center text-[#d3d5de] mb-6">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-[#d3d5de]">Username</label>
            <input
              type="name"
              className="w-full px-4 py-2 mt-2 border border-[#6a6a6a] rounded-lg focus:outline-[#d3d5de] focus:ring-2 focus:ring-[#d3d5de]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-12">
            <label className="block text-[#d3d5de]">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border border-[#6a6a6a] rounded-lg focus:outline-[#d3d5de] focus:ring-2 focus:ring-[#d3d5de]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#15151f] text-white py-2 rounded-lg hover:bg-[#272735] hover:outline[#6a6a6a] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
