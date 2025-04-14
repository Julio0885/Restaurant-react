import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react"; 
import gusteauLogo from "../assets/gusteau-logo.webp"; // Ajusta la ruta si es necesario
import { useNavigate } from "react-router";

export default function SlideModal({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Función para manejar la navegación al hacer clic en una categoría
  const handleCategoryClick = (category) => {
    navigate(`/categoria/${category.strCategory}`);
    onClose(); // cierra el modal
  };

  useEffect(() => {
    if (isOpen) {
      axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => setCategories(res.data.categories))
        .catch((err) => console.error("Error al obtener categorías:", err));
    }
  }, [isOpen]);

  return (
    <>
      {/* Fondo oscuro detrás del modal */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal deslizante */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#FEFAE0] shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Encabezado con logo y botón cerrar */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <img
            src={gusteauLogo}
            alt="Restaurant Gusteau's"
            className="w-15 object-contain"
          />
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-black transition cursor-pointer" />
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[90vh] bg-white">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div
                key={cat.idCategory}
                onClick={() => handleCategoryClick(cat)}
                className="flex gap-3 items-start border rounded-lg p-3 bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
              >
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <h3 className="font-bold">{cat.strCategory}</h3>
                  <p className="text-sm text-gray-800">
                    {cat.strCategoryDescription.slice(0, 80)}...
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Cargando categorías...</p>
          )}
        </div>
      </div>
    </>
  );
}

