import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import { getVideogamesById, removeVideogame } from '../../Redux/actions';
import './Detail.modules.css';

const Detail = (props) => {
    const { id } = props.match.params;
    const { videogame } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect (() => {
        dispatch(getVideogamesById(id))
        return () => {
            dispatch(removeVideogame())
        }
    }, [dispatch, id])

    const handleGoToBack = () => {
        history.goBack();
    }

    return (
        <div>
            <button onClick={handleGoToBack}>To return◀</button>

            {
                videogame.name ? 
                <div className= "container-detail">
                    <div className = "tarjeta">
                        <div className = "tarjeta-image">
                            <img src={videogame.image} alt="img not found" width="400px" heigth="290px"/>
                        </div>
                        
                        <div tajeta-text>
                            <h3>{videogame.name}</h3>
                        
                        
                        
                            <p>Genres: {videogame.genres}</p>
                        
                        
                        
                            Description: <p dangerouslySetInnerHTML={{__html: videogame.description,}}/>
                      
                        
                       
                            <p>Released: {videogame.released}</p>
                        
                        
                       
                            <p>Rating: {videogame.rating}</p>
                        
                        
                        
                            <p>Platforms: {videogame.platforms}</p>
                        </div>
                        
                    </div>  
                </div>

                :

                <div>Loading</div>
            }
        </div>
    );
}
 
export default Detail;