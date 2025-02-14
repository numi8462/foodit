export async function getFoods(queryOrder) {
  const query = `order=${queryOrder}`;
  const response = await fetch(`https://learn.codeit.kr/1234/foods?${query}`);
  const body = await response.json();
  console.log(body);
  return body;
}
