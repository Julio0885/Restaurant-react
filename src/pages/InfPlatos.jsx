import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function InfPlatos() {
  const { idMeal } = useParams();
  const [meal, setMeal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (idMeal) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then((res) => setMeal(res.data.meals[0]))
        .catch((err) => console.error("Error al cargar el plato:", err));
    }
  }, [idMeal]);

  if (!meal) return <p className="text-center mt-10 text-gray-500">Cargando información del plato...</p>;

  return (
  <div className="bg-[url(/fondo.jpg)]">
    <div className=" max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(`/categoria/${meal.strCategory}`)}
        className="mb-6 px-4 py-2 bg-[#D4A373] text-white font-semibold rounded hover:bg-[#B97A57] transition cursor-pointer"
      >
        ← Volver a {meal.strCategory}
      </button>

      <div className="bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full max-h-[400px] object-cover rounded mb-6"
        />

        <h2 className="text-xl font-semibold mb-2">Instrucciones</h2>
        <p className="text-gray-700 whitespace-pre-line">{meal.strInstructions}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Categoría: {meal.strCategory}</h2>
        <h3 className="text-md font-medium text-gray-600">Área: {meal.strArea}</h3>

        {/* Mostrar video si existe el enlace */}
        {meal.strYoutube && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Video de preparación</h2>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
              title="Video de preparación"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

