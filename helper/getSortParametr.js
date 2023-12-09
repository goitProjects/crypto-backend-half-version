const getSortParameter = (req) => {
  const { sortOrder } = req.params; // Извлекаем значение сортировки из тела запроса
  return sortOrder === "DESC" ? -1 : 1; // Возвращаем параметр сортировки
};

module.exports = { getSortParameter };
