// import { useState, useEffect } from "react";

// import { useParams, useNavigate } from "react-router-dom";
// import { getMealById } from "../api";
// import { Preloader } from "../components/preloader";

// function Recipe() {
//     const [recipe, setRecipe] = useState(null);
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const goBack = () => navigate(-1);

//     useEffect(() => {
//         getMealById(id)
//             .then((data) => 
//                 setRecipe(data.meals[0]));
//     }, [id]);

//     return (
//         <>
//             {!recipe.idMeal ? (
//                 <Preloader />
//             ) : (
//                 <div className="recipe">
//                     <img src={recipe.strMealThumb} alt={recipe.strMeal} />
//                     <h1>{recipe.strMeal}</h1>
//                     <h6>Category: {recipe.strCategory}</h6>
//                     {recipe.strArea && <h6>Area: {recipe.strArea}</h6>}
//                     <p>{recipe.strInstructions}</p>
                    
//                     {recipe.strYoutube && (
//                         <div className="row">
//                             <h5 style={{ margin: "2rem 0 1.5rem" }}>Video Recipe</h5>
//                             <iframe
//                                 title={recipe.strMeal}
//                                 src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`}
//                                 allowFullScreen
//                             />
//                         </div>
//                     )}
//                 </div>
//             )}
//             <button className="btn" onClick={goBack}>
//                 Go Back
//             </button>
//         </>
//     );
// }

// export { Recipe };

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealById } from "../api";
import { Preloader } from "../components/preloader";

function Recipe() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        setLoading(true);
        getMealById(id)
            .then((data) => {
                if (data.meals && data.meals[0]) {
                    setRecipe(data.meals[0]);
                } else {
                    setError("Recipe not found");
                }
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Preloader />;
    if (error) return <div className="error">{error}</div>;
    if (!recipe) return <div className="error">Recipe data not available</div>;

    return (
        <div className="container">
            <button className="btn" onClick={goBack}>
                Go Back
            </button>
            
            <div className="recipe">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <h1>{recipe.strMeal}</h1>
                <h6>Category: {recipe.strCategory}</h6>
                {recipe.strArea && <h6>Area: {recipe.strArea}</h6>}
                <p>{recipe.strInstructions}</p>

                <table className="centered">
                    <thead>
                        <tr>
                            <th>Ingredients</th>
                            <th>Measure</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(recipe).map((key) => {
                            if (key.includes("Ingredient") && recipe[key]) {
                                return (
                                    <tr key={key}>
                                        <td>{recipe[key]}</td>
                                        <td>{recipe[`strMeasure${key.slice(13)}`]}</td>
                                    </tr>
                                );
                            }
                            return null;
                        })}
                    </tbody>
                </table>
                
                {recipe.strYoutube && (
                    <div className="row">
                        <h5 style={{ margin: "2rem 0 1.5rem" }}>Video Recipe</h5>
                        <iframe
                            title={recipe.strMeal}
                            src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`}
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export { Recipe };