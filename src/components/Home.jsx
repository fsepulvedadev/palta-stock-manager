import { useAuth } from "../context/authContext";
import ItemListContainer from "./ItemListContainer/ItemListContainer";
import paltaLogo from "../assets/logo.svg";

const Home = () => {
  const { user, loading } = useAuth();
  console.log(user);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-100">
        <img src={paltaLogo} alt="Palta Logo" className="w-1/6 animate-spin" />
      </div>
    );
  } else {
    return (
      <>
        <h1 className="w-full my-4 text-4xl tracking-widest text-center uppercase">
          Items actuales
        </h1>
        <ItemListContainer />
      </>
    );
  }
};

export default Home;
