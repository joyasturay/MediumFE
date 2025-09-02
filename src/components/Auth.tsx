import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { z } from "zod";
import { signUpSchema } from "@joyastu/common";
import { BACKEND_URL } from '../../config';
import axios from "axios";

type SignUp = z.infer<typeof signUpSchema>;

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate();                 
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;                                        

  const [inputs, setInputs] = useState<SignUp>({
    email: '',
    password: '',
    name: ''
  });

  const sendRequest = async () => {
  try {

    const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, inputs);
    const authToken = res.data.token || res.data.jwt;

    if (authToken) {
      localStorage.setItem("token", authToken);
      navigate("/blogs");
    } else {
      console.error("No token received!");
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    } else {
      console.log(err);
    }
  } 
};


  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="font-bold text-3xl">Create an Account</div>

        <div className="mt-4 text-center">
          {type === 'signin' ? "Don't have an account?" : "Already have an account ?"}
          <Link className="pl-2 underline" to={type === 'signin' ? "/signup" : "/signin"}>
            {type === 'signin' ? 'Sign up' : 'Sign in'}
          </Link>
        </div>

        <div className="mt-4 flex flex-col">
          <LabelledInput
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => setInputs(c => ({ ...c, email: e.target.value }))}
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setInputs(c => ({ ...c, password: e.target.value }))}
          />
          {type === 'signup' && (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) => setInputs(c => ({ ...c, name: e.target.value }))}
            />
          )}

          <button
            onClick={sendRequest}
            className="mt-4 p-2 bg-black text-white rounded-md w-full"                   
          >
            {type === 'signup' ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface AuthProps {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange, type = 'text' }: AuthProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        className="mt-1 mb-1 px-10 py-3 border border-gray-300 rounded-md w-full"
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
    </div>
  );
}
