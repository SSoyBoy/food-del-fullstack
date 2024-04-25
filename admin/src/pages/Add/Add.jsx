import React, { useState } from "react";
import "./Add.css";
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  name: "",
  description: "",
  price: "",
  category: "Salad",
};

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState(initialFormData);
  const navigate = useNavigate();
  const { currentUpdatedProduct, setCurrentUpdatedProduct } =
    useContext(StoreContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (currentUpdatedProduct !== null) {
      formData.append("id", data._id);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response =
      currentUpdatedProduct !== null
        ? await axios.put(url + "/api/food/edit", formData)
        : await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setCurrentUpdatedProduct(null);
      setData(initialFormData);
      setImage(false);
      toast.success(response.data.message);
      if (response.data.message === "Product Updated") navigate("/list");
    } else {
      setData(initialFormData);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (currentUpdatedProduct !== null) setData(currentUpdatedProduct);
  }, [currentUpdatedProduct]);

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : data && data.image
                  ? `${url}/images/${data.image}`
                  : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            required
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            id=""
            cols="30"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" id="">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              required
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button className="add-btn" type="submit">
          {currentUpdatedProduct ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Add;
