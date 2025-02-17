function FoodListItem({ item, onDelete }) {
  const { imgUrl, title, calorie, content } = item;

  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className="food-item">
      <img src={imgUrl} alt={title} width={200} />
      <div className="info">
        <div>{item.id}</div>
        <div>{title}</div>
        <div>칼로리: {calorie}</div>
        <div>{content}</div>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <FoodListItem item={item} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

export default FoodList;
