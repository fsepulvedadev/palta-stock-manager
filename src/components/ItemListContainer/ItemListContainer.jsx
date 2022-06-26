import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.css";
import PaltaLogo from "../../assets/logo.svg";
import { useParams, Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const db = getFirestore();
  const { cat } = useParams();
  let coleccionDeProductos = "";

  if (cat) {
    coleccionDeProductos = query(
      collection(db, "productos"),
      where("category", "==", cat)
    );
  } else if (!cat) {
    coleccionDeProductos = collection(db, "productos");
  }

  useEffect(() => {
    setloading(true);
    getDocs(coleccionDeProductos)
      .then((res) => {
        setItems(
          res.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        console.log(items);

        setloading(false);
      });
  }, [cat]);

  const selectItem = (name, price, desc, cat, stock, img, id) => {
    setSelectedItem({
      id: id,
      name: name,
      price: price,
      description: desc,
      category: cat,
      stock: stock,
      img: img,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-center h-full overflow-auto">
      {loading && (
        <div className="flex items-center justify-center h-screen w-100">
          <img src={PaltaLogo} alt="Palta Logo" className="w-52 animate-spin" />
        </div>
      )}
      {error && <h1>Ha ocurrido un error!</h1>}
      {!loading && !error && !selectedItem && (
        <ItemList items={items} selectItem={selectItem} />
      )}

      {!loading && !error && !selectedItem && items.length === 0 && (
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <h1 className="text-center">No hay productos en esta categoria.</h1>
          <button className="btn btn-primary palta-btn w-50 align">
            <Link className="text-white text-decoration-none" to="/">
              Volver
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
