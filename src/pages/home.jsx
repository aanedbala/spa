import { useState, useEffect } from "react";
import { getAllCategories } from "../api";
import { Preloader } from "../components/preloader";
import { CategoryList } from "../components/categorylist";
import { Search } from "../components/search";

function Home() {
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]);

    useEffect(() => {
        getAllCategories().then((data) => {
            setCatalog(data.categories);
            setFilteredCatalog(data.categories); // Инициализируем filteredCatalog
        });
    }, []);

    const handleSearch = (str) => {
        setFilteredCatalog(
            catalog.filter((item) =>
                item.strCategory.toLowerCase().includes(str.toLowerCase())
            )
        );
    };

    return (
        <>
            <Search cb={handleSearch} />
            {!filteredCatalog.length ? (
                <Preloader />
            ) : (
                <CategoryList catalog={filteredCatalog} />
            )}
        </>
    );
}

export { Home };