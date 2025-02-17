import { useEffect, useState } from "react";
import "./App.css";
import FoodList from "./components/FoodList";
import { getFoods } from "./api";
import FoodForm from "./components/FoodForm";

const LIMIT = 10;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [nextCursor, setNextCursor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState("");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");

  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleDataLoad = async (options) => {
    let result;

    try {
      setIsLoading(true);
      result = await getFoods(options);
    } catch (error) {
      setLoadingError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    const { foods, paging } = result;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setNextCursor(paging.nextCursor);
  };

  const handleLoadMore = () => {
    handleDataLoad({ order: order, cursor: nextCursor, limit: LIMIT });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  useEffect(() => {
    handleDataLoad({ order, search: search });
  }, [order, search]);

  return (
    <>
      <div className="sort-options">
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <form onSubmit={handleSearchSubmit}>
        <input name="search" type="text" />
        <button type="submit">검색</button>
      </form>
      <FoodForm />
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {nextCursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </>
  );
}

export default App;
