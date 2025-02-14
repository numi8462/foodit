import { useEffect, useState } from "react";
import "./App.css";
import FoodList from "./components/FoodList";
// import mockItems from "./mocks/mock.json";
import { getFoods } from "./api";

function App() {
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[sortOrder] - a[sortOrder]);

  const handleClick = (order) => setSortOrder(order);

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleDataLoad = async (query) => {
    const { foods } = await getFoods(query);
    setItems(foods);
  };

  useEffect(() => {
    handleDataLoad(sortOrder);
  }, [sortOrder]);

  return (
    <>
      <div className="sort-options">
        <button onClick={() => handleClick("createdAt")}>최신순</button>
        <button onClick={() => handleClick("calorie")}>칼로리순</button>
      </div>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {/* <button onClick={handleDataLoad}>불러오기</button> */}
    </>
  );
}

export default App;
