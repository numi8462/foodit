import { useState } from "react";
import "./FoodForm.css";

function FoodForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="food-form">
      <input
        name="title"
        type="text"
        value={values.title}
        onChange={handleChange}
      />
      <input
        name="calorie"
        type="number"
        value={values.calorie}
        onChange={handleChange}
      />
      <textarea
        name="content"
        type="text"
        value={values.content}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        확인
      </button>
    </form>
  );
}

export default FoodForm;
