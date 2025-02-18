import { useEffect, useState } from "react";
import "./App.css";
import FoodList from "./components/FoodList";
import { deleteFood, getFoods, updateFood } from "./api";
import FoodForm from "./components/FoodForm";
import { LocaleContext } from "./components/contexts/LocaleContext";

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

  const handleDelete = async (id) => {
    const result = await deleteFood(id);
    if (!result) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
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

  const handleSubmitSuccess = (food) => {
    setItems((prevItems) => [food, ...prevItems]);
  };

  const handleUpdateSuccess = (food) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === food.id);
      return [
        ...prevItems.slice(0, splitIdx),
        food,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleDataLoad({ order, search: search });
  }, [order, search]);

  return (
    <LocaleContext value={"ko"}>
      <div>
        <div className="sort-options">
          <button onClick={handleNewestClick}>최신순</button>
          <button onClick={handleCalorieClick}>칼로리순</button>
        </div>
        <form onSubmit={handleSearchSubmit}>
          <input name="search" type="text" />
          <button type="submit">검색</button>
        </form>
        <FoodForm onSubmit={updateFood} onSubmitSuccess={handleSubmitSuccess} />
        <FoodList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {nextCursor && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
    </LocaleContext>
  );
}

export default App;
