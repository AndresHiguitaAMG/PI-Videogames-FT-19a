import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../../Redux/actions';
import Cards from '../Cards/Cards';
import FilterByOrigen from '../Filters/FilterByOrigen';
import OrderByName from '../Ordinances/OrderByName';
import Paged from '../Paged/Paged';
import SearchBar from '../SearchBar/SearchBar';


const Home = () => {
    const dispatch = useDispatch();
    const {  videogames } = useSelector(state => state);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const indexLastvideogames = currentPage * videogamesPerPage;
    const indexFirstVideogmaes = indexLastvideogames - videogamesPerPage;
    const currentVideogames = videogames.slice(indexFirstVideogmaes, indexLastvideogames);

    const totalPages = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect (() => {
        dispatch(getVideogames({}))
    }, [dispatch])

    
    return (
        <div>
            <div>
                <SearchBar />
            </div>

            <div>
                <OrderByName />
            </div>

            <div>
                <FilterByOrigen />
            </div>

            <div>
                {
                    currentVideogames?.length > 0 ?
                    currentVideogames?.length > 0 && currentVideogames.map((el) => {
                        return <Cards image={el.image} name={el.name} genres={el.genres} id={el.id} key={el.id} />
                    })
                    :
                    <div>Cargando...</div>
                }

                <div>
                    <Paged 
                    videogamesPerPage = {videogamesPerPage}
                    videogames = {videogames.length}
                    totalPages = {totalPages}
                    />
                </div>
            </div>
        </div>
    );
}
 
export default Home;