import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const AppBar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 mb-2">
    
      <Link to={"/blogs"}>
        <div className="text-2xl font-bold cursor-pointer">Medium</div>
      </Link>

     
      <div className="flex items-center">
        {token ? (
          <div className="flex items-center space-x-4">
            <Link to={"/create"}>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full">
                New Blog
              </button>
            </Link>

          
            <button
              onClick={handleSignout}
              className="text-gray-500 font-medium cursor-pointer"
            >
              Signout
            </button>

            <Avatar name="Joy" />
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to={"/signup"} className="text-blue-500 font-medium">
              Signup
            </Link>
            <Link to={"/signin"} className="text-blue-500 font-medium">
              Signin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
