import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { currentUpdatedProduct, setCurrentUpdatedProduct } =
    useContext(StoreContext);

  useEffect(() => {
    if (pathname !== "/add" && currentUpdatedProduct !== null)
      setCurrentUpdatedProduct(null);
  }, [pathname]);
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
