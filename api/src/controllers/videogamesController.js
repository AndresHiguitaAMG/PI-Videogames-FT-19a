const { Videogame, Genre, Op } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

//Mi arreglo de promesas para las paginas, en este caso me traigo 5 paginas para poder cargar 100 videojuegos.
const videogamesPerPage = async () => {
    let myVideogamesOnPageOne = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    let myVideogamesOnPageTwo = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    let myVideogamesOnPageThree = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    let myVideogamesOnPageFour = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    let myVideogamesOnPageFive = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    
    let data = await Promise.all([myVideogamesOnPageOne, myVideogamesOnPageTwo, myVideogamesOnPageThree, myVideogamesOnPageFour, myVideogamesOnPageFive]);

    myVideogamesOnPageOne = data[0].data.results;
    myVideogamesOnPageTwo = data[1].data.results;
    myVideogamesOnPageThree = data[2].data.results;
    myVideogamesOnPageFive = data[3].data.results;
    myVideogamesOnPageFour = data[4].data.results;

    const myVideogame = myVideogamesOnPageOne.concat(myVideogamesOnPageTwo).concat(myVideogamesOnPageThree).concat(myVideogamesOnPageFour).concat(myVideogamesOnPageFive);
    return myVideogame;
};



const getVideogames = async(req, res, next) =>{
    try{
        let {
            name,
            order
        } = req.query 

        let infoApi
        let infoDb
        let allData = []
    
        //#region name
        if(name && name !== ""){
            const dataApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
            infoApi = await dataApi.data.results.map(el => {
                return {
                    image: el.background_image,
                    name: el.name,
                    genres: el.genres.map(e => e.name),
                    id: el.id
                }
            })
            infoDb = await Videogame.findAll({
                where:{
                    name:{
                        [Op.iLike]: `%${name}%` 
                    }
                }
            })
            allData = infoDb.concat(infoApi) 
        }else{
        const dataApi = await videogamesPerPage() 
        infoApi = dataApi.map(el =>{
            return {
                image: el.background_image,
                name: el.name,
                genres: el.genres.map(e => e.name), 
                id: el.id
            }
        })
        infoDb = await Videogame.findAll({include: [Genre]})
        allData = infoDb.concat(infoApi)
        } 
        //#endregion

        //#region order
        if(order === "asc" || !order || order === ""){
            allData = allData.sort((a, b) =>{
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            })
        }else{
            allData = allData.sort((a, b) =>{
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            }) 
        }   
        //#endregion
        
        return res.json(allData);
    }catch(error){
        next(error);       
    }
}

const getVideogamesById = async(req, res, next) =>{
    const id = req.params.id;
    if(id){
        try{
            if(!id.includes("-")){
                const idApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=8483b3abd0774e898a6add0aa27122b7`)
                const info = {
                    image: idApi.data.background_image,
                    name: idApi.data.name,
                    genres: idApi.data.genres.map(e => e.name),
                    description: idApi.data.description,
                    released: idApi.data.released,
                    rating: idApi.data.rating,
                    platforms: idApi.data.platforms.map(el => el.platform.name)
                }
                res.json(info)
            }else{
                const dB = await Videogame.findOne({
                    where:{
                        id: id
                    },
                    include: Genre
                })
                const gameDb = {
                    image: null,
                    name: dB.name,
                    genres: dB.genres.map(el => el.name),
                    description: dB.description,
                    released: dB.released,
                    rating: dB.rating,
                    platforms: dB.platforms
                }
                if(!dB){
                    return res.status(400).send({message: "It was not found"})
                }
                return res.json(gameDb)
            }
        }catch(error){
            next(error);
        }
    }
}


const postVideogames = async(req, res, next) =>{
    try{
        const { name, description, released, rating, platforms, genres } = req.body;
        let createVideoGame = await Videogame.create({
            // image, 
            name,
            description,
            released, 
            rating,
            platforms 
        })
        // const mapeo = createVideoGame.map(el => {
        //     return {
        //     name: el.name,
        //     description: el.description,
        //     released: el.released, 
        //     rating: el.rating,
        //     platforms: el.platform
        //     }
        // })
        genres.forEach(async el => {
            const genre = await Genre.findOne({where:{name: el}})
            await createVideoGame.setGenres(genre.dataValues.id)
            console.log(genre.dataValues.id);
        })
        // const genresDb = await Genre.findAll({where: {name: genres}})
        // await createVideoGame.addGenres(genresDb) //Linkeo, siempre prural
        return res.status(200).send("Successfully created")
    }catch(error){
        res.status(200).send("Error");
    }
}

module.exports = {
    getVideogames,
    getVideogamesById,
    postVideogames
}