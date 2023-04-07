import { createContext, useContext, useState } from "react";

const ConfiguratorContext = createContext();

export const ConfiguratorProvider = ({ children }) => {
  const [filterColor, setFilterColor] = useState([]);

  const [matrix, setMatrix] = useState("");

  const [cursor, setCursor] = useState("");

  const [input, setInput] = useState("");

  const [position, setPosition] = useState("");

  const [activeScreen, setActiveScreen] = useState([]);

  const [price, setPrice] = useState([0, 1000]);

  const [category, setCategory] = useState([]);

  const [brand, setBrand] = useState([]);

  const [rating, setRating] = useState(0);

  const [selected, setSelected] = useState([null, 0, [0, 8, 2200]]);

  const [walk, setWalk] = useState(false);

  return (
    <ConfiguratorContext.Provider
      value={{
        filterColor,
        setFilterColor,
        matrix,
        setMatrix,
        cursor,
        setCursor,
        input,
        setInput,
        position,
        setPosition,
        activeScreen,
        setActiveScreen,
        price,
        setPrice,
        category,
        setCategory,
        brand,
        setBrand,
        rating,
        setRating,
        selected,
        setSelected,
        walk,
        setWalk,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  return useContext(ConfiguratorContext);
};
