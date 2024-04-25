import { useState } from "react";
import { createContext } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);

  const contextValue = {
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
