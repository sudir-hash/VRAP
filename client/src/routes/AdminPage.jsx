import { useEffect, useState } from "react";
import { TabTitle } from "../utils/General";
import axios from "axios";
import ShopCategory from "../components/Shop/Container/ShopCategory";
import ReactLoading from "react-loading";
import "../css/AdminPage.css";
import AdminCard from "../components/Admin/AdminCard/AdminCard";
import BASE_URL from "../constants/BASE_URL";
const Shop = () => {
  TabTitle("Shop - SHEMA");
  const [menItems, setMenItems] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(BASE_URL+"/product/view-all")
      .then((res) => {
        setMenItems(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="admin__contianer">
      {loading && (
        <ReactLoading
          type="balls"
          color="#FFE26E"
          height={100}
          width={100}
          className="container h-100 w-10 justify-self-center align-self-center m-auto"
        />
      )}
      {menItems && (
        <ShopCategory name="Your Products" key="men" items={menItems} />
      )}
      <AdminCard />

   
    </div>
  );
};

export default Shop;
