import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryName) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then((res) => setMeals(res.data.meals || []))
        .catch((err) => console.error("Error al obtener platos:", err));
    }
  }, [categoryName]);

  const handleClick = (idMeal) => {
    navigate(`/plato/${idMeal}`);
  };

  const formatCategory = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div className="bg-[url(/fondo.jpg)] min-h-screen">
    <div className=" p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center drop-shadow-[0_2px_2px_white]">
        Platos de {formatCategory(categoryName)}
      </h1>

      {meals.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron platos para esta categoría.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              onClick={() => handleClick(meal.idMeal)}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-2 text-center hover:scale-103 hover:border-3 shadow-gray-900 "
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 font-semibold text-lg">{meal.strMeal}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
