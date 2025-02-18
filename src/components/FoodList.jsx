import { useContext, useState } from "react";
import FoodForm from "./FoodForm";
import { LocaleContext } from "./contexts/LocaleContext";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

// food item component
function FoodListItem({ item, onEdit, onDelete }) {
  const locale = useContext(LocaleContext);
  const { imgUrl, title, calorie, content, createdAt } = item;

  const handleEditClick = () => {
    onEdit(item.id);
  };

  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className="food-item">
      <img src={imgUrl} alt={title} width={200} />
      <div className="info">
        <div>{title}</div>
        <div>칼로리: {calorie}</div>
        <div>{content}</div>
        <div>{formatDate(createdAt)}</div>
        <p>언어: {locale}</p>
        <button onClick={handleEditClick}>수정</button>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

// foodlist componennt
function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, calorie, content } = item;
          const initialValues = { title, calorie, content };

          const handleSubmit = (formData) => onUpdate(id, formData);

          const handleSubmitSuccess = (food) => {
            onUpdateSuccess(food);
            setEditingId(null);
          };
          return (
            <li key={item.id}>
              <FoodForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem
              item={item}
              onEdit={setEditingId}
              onDelete={onDelete}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
