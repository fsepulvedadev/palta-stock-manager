import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import paltaLogo from "../assets/logo.svg";
import Alert from "./Alert";
import { v4 as uuid } from "uuid";

const Edit = () => {
  const [item, setItem] = useState(null);
  const [finishDelete, setFinishDelete] = useState(false);
  const [finishEdit, setFinishEdit] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const db = getFirestore();
  const { id } = useParams();

  const handleChange = (e) => {
    if (e.target.name === "img") {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDoc(doc(db, "productos", id));
      setItem({});
      setFinishDelete(true);
      setTimeout(() => {
        setFinishDelete(false);
      }, 2000);
      console.log("item deleted");
    } catch (error) {
      setError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setDoc(doc(db, "productos", id), {
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        stock: item.stock,

        img: item.img,
      });
      setItem({});
      setFinishEdit(true);
      setTimeout(() => {
        setFinishEdit(false);
      }, 2000);
      console.log("item edited");
    } catch (error) {
      console.log(error);
    }
  };

  const itemRef = doc(db, "productos", id);

  useEffect(() => {
    setLoading(true);
    getDoc(itemRef)
      .then((res) => {
        setItem({ id: res.id, ...res.data() });
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (item) {
    return (
      <div>
        {finishDelete && (
          <Alert
            variant="success"
            msg="El producto ha sido eliminado de la base de datos."
          ></Alert>
        )}
        {finishEdit && (
          <Alert variant="success" msg="El producto ha sido editado."></Alert>
        )}
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
              value={item.name}
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
              value={item.price}
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
              value={item.description}
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
              value={item.stock}
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
              value={item.category}
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
              value={item.img}
            />
          </div>
          <div className="flex justify-around w-full">
            <button className="w-1/2 px-2 py-4 mt-2 text-xl font-bold text-white rounded sm:w-1/3 hover:bg-lime-600 bg-lime-700">
              Editar
            </button>
            <button
              onClick={(e) => {
                handleDelete(e);
              }}
              className="w-1/2 px-2 py-4 mt-2 ml-2 text-xl font-bold text-white bg-red-700 rounded md:ml-0 sm:w-1/3 hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen w-100">
      <img src={paltaLogo} alt="Palta Logo" className="w-52 animate-spin" />
    </div>
  );
};

export default Edit;
