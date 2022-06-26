import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import paltaLogo from "../assets/logo.svg";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const handleLogOut = async () => {
    await logout();
  };

  return (
    <>
      <div className="z-0 flex items-center justify-around w-full text-2xl text-white bg-green-900 h-14">
        <div className="flex items-center justify-between w-full">
          <div className="hidden md:flex">
            <ion-icon size="large" name="person-circle-outline"></ion-icon>
            <h4 className="pl-2 text-lg">{user.email}</h4>
          </div>
          <Link to="/">
            <div className="flex justify-start w-full ml-6 sm:justify-center">
              <h1 className="text-center sm:mr-32">Palta Stock</h1>
            </div>
          </Link>
          <div className="flex w-100">
            <button
              onClick={() => {
                navigate("/create");
              }}
              className="hidden px-1 py-1 m-2 rounded text-md bg-lime-700 hover:bg-lime-600 md:block"
            >
              Agregar Item
            </button>
            <button
              onClick={handleLogOut}
              className="hidden px-1 py-1 m-2 rounded text-md bg-lime-700 hover:bg-lime-600 md:block"
            >
              Logout
            </button>
          </div>
        </div>
        <div
          className="pr-4 md:hidden"
          onClick={() => {
            setNavOpen(true);
          }}
        >
          {!navOpen && <ion-icon size="large" name="menu-outline"></ion-icon>}
        </div>
      </div>
      <div
        className={`absolute z-40 ${
          !navOpen ? `translate-x-full` : ``
        } flex flex-col w-full h-screen justify-start bg-green-900 md:hidden duration-300`}
      >
        <div className="h-full">
          <div
            onClick={() => {
              setNavOpen(false);
            }}
            className="absolute text-white top-2 right-2"
          >
            <ion-icon size="large" name="close-outline"></ion-icon>
          </div>
          <img src={paltaLogo} alt="paltaLogo" />
          <div className="flex justify-center mt-3 text-3xl text-white">
            <h1 className="my-3">Palta Stock</h1>
          </div>
          <hr />
          <ul className="flex flex-col justify-between mt-10 text-2xl text-center text-white h-1/6 ">
            <li className="py-4 hover:bg-green-700 checked:animate-ping">
              Inicio
            </li>
            <li className="py-4 hover:bg-green-700 target:animate-ping">
              Agregar Producto
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-between ">
          <div className="flex items-center justify-center w-full pl-4 text-center text-white ">
            <ion-icon size="large" name="person-circle-outline"></ion-icon>
            <h4 className="pl-2 text-lg">{user.email}</h4>
          </div>
          <button
            onClick={handleLogOut}
            className="flex items-center justify-center w-10/12 my-2 text-xl text-white rounded text-md bg-lime-700 hover:bg-lime-600"
          >
            <ion-icon
              size="medium"
              className=""
              name="log-out-outline"
            ></ion-icon>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
