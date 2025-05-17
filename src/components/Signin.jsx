import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { backendAddress } from "../constants/BackendInfo";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${backendAddress}/api/v1/auth`, {
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
          navigate("/", {replace: true});
        }else{
          alert("Wrong username or password!");
        }

      });

    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#15151f]">
      <div className="flex w-[1000px] bg-[#1e1e2b] rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-[#272735] flex items-center justify-center p-20">
          <img src="/logo1.png" alt="Logo" className="w-80 h-60" />
        </div>
        <div className="w-1/2 mb-20 mt-10 p-10">
          <h2 className="text-4xl font-bold text-center text-[#d3d5de] mb-15">LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-[#ccccd6]">Username</label>
              <input
                type="name"
                className="w-full px-4 py-2 mt-2  rounded-lg bg-[#d3d5de]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-12">
              <label className="block text-[#ccccd6]">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 rounded-lg bg-[#d3d5de]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#1e1e2b] border-[#4b9eda] border-2 
              text-[#4b9eda] hover:bg-[#252c42] hover:text-[#4b9eda]  hover:cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
