import React, { useState, ChangeEvent } from "react";
import imageToAddUser from "./../assets/User.png";
import imageToAddLock from "./../assets/Lock.png";
import imageToAddEye from "./../assets/Eye.png";
import imageToAddEye_closed from "./../assets/Eye-closed.png";
import Group from "./../assets/Group.png";
import { Link } from "react-router-dom";

interface UserInput {
  username: string;
  password: string;
  rememberPassword: boolean;
}

const initialState: UserInput = {
  username: "",
  password: "",
  rememberPassword: false,
};

const Login: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput>(initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const setUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, username: e.target.value });
  };

  const setPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, password: e.target.value });
  };

  const toggleRememberPassword = () => {
    setUserInput({
      ...userInput,
      rememberPassword: !userInput.rememberPassword,
    });
  };

  return (
    <div className="h-screen">
      <div className="md:flex md:flex-row p-2 ">
        <div className="md:flex-1 flex justify-center items-center ">
          <div className="m-4">
            <div className="text-4xl  m-2 mt-5 mb-5 ">เข้าสู่ระบบ</div>
            <div className="m-2 mt-12">ชื่อผู้ใช้งาน</div>
            <div className="flex flex-row items-center border-b-2">
              <img
                src={imageToAddUser}
                alt="User"
                className="w-6 h-6 object-cover rounded-full mt-2"
              />
              <input
                className="focus:outline-none m-2"
                placeholder="กรอกชื่อผู้ใช้งานของคุณ"
                onChange={setUsername}
                value={userInput.username}
              />
            </div>
            <div className="m-2 mt-10">รหัสผ่าน</div>
            <div className="flex flex-row items-center border-b-2">
              <img
                src={imageToAddLock}
                alt="Lock"
                className="w-6 h-6 object-cover rounded-full mt-2"
              />
              <input
                className="focus:outline-none m-2"
                placeholder="กรอกรหัสผ่านของคุณ"
                type={showPassword ? "text" : "password"}
                onChange={setPassword}
                value={userInput.password}
              />
              <button
                className="focus:outline-none mb-2 ml-32"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img
                    src={imageToAddEye}
                    alt="Eye Open"
                    className="w-6 h-6 object-cover rounded-full mt-2"
                  />
                ) : (
                  <img
                    src={imageToAddEye_closed}
                    alt="Eye Closed"
                    className="w-6 h-6 object-cover rounded-full mt-2"
                  />
                )}
              </button>
            </div>
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={userInput.rememberPassword}
                  onChange={toggleRememberPassword}
                  className="form-checkbox h-5 w-5 text-gray-600"
                />
                <span className="ml-2 mt-5 mb-5 text-sm text-gray-600">
                  Remember me
                </span>
              </label>
            </div>
            <Link to="/Health_Station">
              <div className="md:w-96 text-center bg-blue-500 rounded-full py-2 px-4 n">
                <button className="text-white">Login</button>
              </div>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex-1 rounded-lg justify-center items-center md:block">
          <div className="text-white">
            <img
              src={Group}
              alt="Group"
              className="object-cover md:place-items-start bg-auto hover:bg-contain w-[900px] h-[730px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
