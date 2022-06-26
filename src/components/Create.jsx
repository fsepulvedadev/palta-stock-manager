import { useState } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

import Alert from "./Alert";

const Create = () => {
  const [item, setItem] = useState({});
  const [finish, setFinish] = useState(false);

  const db = getFirestore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newId = uuid();
    try {
      await setDoc(doc(db, "productos", newId), {
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        stock: item.stock,
        img: [item.img],
      });
      setItem({});
      setFinish(true);
      setTimeout(() => {
        setFinish(false);
      }, 2000);
      console.log("item created");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {finish && <Alert variant="success" msg="Producto creado" />}

      <form
        onSubmit={handleSubmit}
        className="px-8 pt-6 pb-8 m-auto mt-20 mb-4 bg-white rounded shadow-md sm:w-1/2"
      >
        <div className="">
          <label className="block" htmlFor="name">
            Nombre
          </label>
          <input
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            id="name"
            value={item.name || ""}
          />
        </div>
        <div>
          <label className="block" htmlFor="price">
            Precio
          </label>
          <input
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="number"
            name="price"
            id="price"
            value={item.price || ""}
          />
        </div>
        <div>
          <label className="block" htmlFor="description">
            Descripcion
          </label>
          <input
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            name="description"
            id="description"
            value={item.description || ""}
          />
        </div>
        <div className="">
          <label className="block" htmlFor="stock">
            Stock
          </label>
          <input
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="number"
            name="stock"
            id="stock"
            value={item.stock || ""}
          />
        </div>
        <div>
          <label className="block" htmlFor="category">
            Categoria
          </label>
          <input
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            name="category"
            id="category"
            value={item.category || ""}
          />
        </div>
        <div>
          <label className="block" htmlFor="image">
            Imagen Link
          </label>
          <input
            onChange={handleChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            name="img"
            id="img"
            value={item.img || ""}
          />
        </div>
        <div className="flex justify-center w-full">
          <button className="w-1/2 px-2 py-4 mt-2 text-xl font-bold text-white rounded hover:bg-lime-600 bg-lime-700">
            Agregar
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="w-1/2 px-2 py-4 mt-2 ml-2 text-xl font-bold text-white bg-yellow-700 rounded hover:bg-yellow-600"
          >
            Regresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
