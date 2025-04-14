import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [inpValue, setInpValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    // Buscar sugerencias cuando cambia el input
    useEffect(() => {
        if (inpValue.trim() === '') {
            setSuggestions([]);
            return;
        }

        const fetchMeals = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inpValue}`);
                const data = await res.json();
                if (data.meals) {
                    setSuggestions(data.meals.slice(0, 5)); // Mostrar solo las primeras 5 sugerencias
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Error fetching meals:', error);
                setSuggestions([]);
            }
        };

        fetchMeals();
    }, [inpValue]);

    const handleInputChange = (e) => {
        setInpValue(e.target.value);
    };

    const handleClick = () => {
        if (inpValue.trim() !== '') {
            // Si coincide con un nombre exacto, navegar directamente
            const match = suggestions.find(
                (meal) => meal.strMeal.toLowerCase() === inpValue.trim().toLowerCase()
            );
            if (match) {
                navigate(`/plato/${match.idMeal}`);
            } else {
                alert("No se encontró el plato exacto. Elige una sugerencia.");
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    };

    const handleSuggestionClick = (meal) => {
        navigate(`/plato/${meal.idMeal}`);
    };

    return (
        <div className="w-full h-70 lg:h-100 bg-[url(/rest1.jpg)] bg-center bg-no-repeat bg-cover relative">
            <h1 className="text-center font-bold text-4xl text-white drop-shadow-[0_4px_2px_black] h-1/2 py-8 md:text-5xl lg:text-6xl">
                Restaurant Gusteau's
            </h1>
            <div className="flex flex-col items-center relative px-10 py-2 md:px-30 lg:px-50">
                <div className="flex w-full max-w-xl">
                    <input
                        className="w-full h-10 bg-gray-700/70 hover:bg-gray-700/95 focus:bg-gray-700/95 border px-2 border-white text-white rounded-l-md"
                        placeholder="Search for a dish..."
                        type="text"
                        value={inpValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className="w-fit h-10 bg-white/70 hover:bg-white/95 active:bg-gray-500/90 border px-2 border-white text-black rounded-r-md"
                        onClick={handleClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6 h-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>

                {suggestions.length > 0 && (
                    <ul className="absolute top-full mt-1 w-full max-w-xl bg-white rounded-md shadow-md z-10 overflow-hidden">
                        {suggestions.map((meal) => (
                            <li
                                key={meal.idMeal}
                                onClick={() => handleSuggestionClick(meal)}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-200 border-b border-gray-100 text-black"
                            >
                                {meal.strMeal}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

