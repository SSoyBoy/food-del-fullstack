import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { url } from "../../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/storeContext";

const List = () => {
  const [list, setList] = useState([]);
  const { setCurrentUpdatedProduct } = useContext(StoreContext);
  const navigate = useNavigate();
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });
    if (response.data.success) {
      await fetchList();
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => {
          return (
            <div key={item._id} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              {/* <p>{item.description}</p> */}
              <p>{item.price}</p>
              <div className="action">
                <button
                  onClick={() => removeFood(item._id)}
                  className="cursor delete"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setCurrentUpdatedProduct(item);
                    navigate("/add");
                  }}
                  className="cursor edit"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
