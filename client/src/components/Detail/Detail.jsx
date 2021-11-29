import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import { getVideogamesById, removeVideogame } from '../../Redux/actions';

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
                <>
                <div>
                    <div><img src={videogame.image} alt="img not found" width="400px" heigth="290px"/></div>

                    <div>
                        <h3>{videogame.name}</h3>
                    </div>

                    <div>
                        <p>Genres: {videogame.genres}</p>
                    </div>

                    <div>
                        Description: <p dangerouslySetInnerHTML={{__html: videogame.description,}}/>
                    </div>

                    <div>
                        <p>Released: {videogame.released}</p>
                    </div>

                    <div>
                        <p>Rating: {videogame.rating}</p>
                    </div>

                    <div>
                        <p>Platforms: {videogame.platforms}</p>
                    </div>
                </div>
                </>

                :

                <div>Loading</div>
            }
        </div>
    );
}
 
export default Detail;