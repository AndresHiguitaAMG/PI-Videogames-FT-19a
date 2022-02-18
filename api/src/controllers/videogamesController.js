const { Videogame, Genre, Op } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

//Mi arreglo de promesas para las paginas, en este caso me traigo 5 paginas para poder cargar 100 videojuegos.
const videogamesPerPage = async () => {
  let myVideogamesOnPageOne = axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`
  );
  let myVideogamesOnPageTwo = axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
  );
  let myVideogamesOnPageThree = axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
  );
  let myVideogamesOnPageFour = axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
  );
  let myVideogamesOnPageFive = axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
  );

  let data = await Promise.all([
    myVideogamesOnPageOne,
    myVideogamesOnPageTwo,
    myVideogamesOnPageThree,
    myVideogamesOnPageFour,
    myVideogamesOnPageFive,
  ]);

  myVideogamesOnPageOne = data[0].data.results;
  myVideogamesOnPageTwo = data[1].data.results;
  myVideogamesOnPageThree = data[2].data.results;
  myVideogamesOnPageFive = data[3].data.results;
  myVideogamesOnPageFour = data[4].data.results;

  const myVideogame = myVideogamesOnPageOne
    .concat(myVideogamesOnPageTwo)
    .concat(myVideogamesOnPageThree)
    .concat(myVideogamesOnPageFour)
    .concat(myVideogamesOnPageFive);
  return myVideogame;
};

const getVideogames = async (req, res, next) => {
  try {
    let { name, order } = req.query;

    let infoApi;
    let infoDb;
    let allData = [];

    //#region name
    if (name && name !== "") {
      const dataApi = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
      );
      infoApi = await dataApi.data.results.map((el) => {
        return {
          image: el.background_image,
          name: el.name,
          genres: el.genres.map((e) => e.name),
          rating: el.rating,
          id: el.id,
        };
      });
      infoDb = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            } 
        },
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          }
        }
      });

      infoDb = infoDb.map(el => {
        return {
          image: el.image,
          id: el.id,
          name: el.name,
          genres: el.genres.map(e => e.name),
          rating: el.rating
        }
      })
      allData = infoDb.concat(infoApi);
    } else {
      const dataApi = await videogamesPerPage();
      infoApi = dataApi.map((el) => {
        return {
          image: el.background_image,
          name: el.name,
          genres: el.genres.map((e) => e.name),
          rating: el.rating,
          id: el.id,
          createdInDatabase: el.createdInDatabase
        };
      });
      infoDb = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
              attributes: []
          } 
        }
      });
      infoDb = infoDb.map(el => {
        return {
          image: el.image,
          id: el.id,
          name: el.name,
          genres: el.genres.map(e => e.name),
          rating: el.rating,
          createdInDatabase: el.createdInDatabase
        }
      })
      // console.log(infoDb);
      allData = infoDb.concat(infoApi);
    }
    //#endregion

    //#region order
    if (order === "asc" || !order || order === "") {
      allData = allData.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
    } else {
      allData = allData.sort((a, b) => {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      });
    }
    //#endregion

    if (allData.length === 0) {
      res.status(400).json({message: "Not Found"})
    } else {
      return res.json(allData);
    }
  } catch (error) {
    return res.status(400).send({message: fallo});
  }
};

const getVideogamesById = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    try {
      if (!id.includes("-")) {
        const idApi = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        const info = {
          image: idApi.data.background_image,
          name: idApi.data.name,
          genres: idApi.data.genres.map((e) => e.name),
          description: idApi.data.description,
          released: idApi.data.released,
          rating: idApi.data.rating,
          platforms: idApi.data.platforms.map((el) => el.platform.name),
          id: idApi.data.id
        };
        res.json(info);
      } else {
        const dB = await Videogame.findOne({
          where: {
            id: id
          },
          include: Genre
        });
        const gameDb = {
          image: dB.image,
          name: dB.name,
          genres: dB.genres.map((el) => el.name),
          description: dB.description,
          released: dB.released,
          rating: dB.rating,
          platforms: dB.platforms,
          id: dB.id
        };
        if (!dB) {
          return res.status(400).send({ message: "It was not found" });
        }
        return res.json(gameDb);
      }
    } catch (error) {
      next(error);
    }
  }
};

const postVideogames = async (req, res, next) => {
  const {
    image,
    name,
    description,
    released,
    rating,
    platforms,
    genres,
    createdInDatabase,
  } = req.body;
  let newVideogame = {
    image,
    name,
    description,
    released,
    rating,
    platforms,
    createdInDatabase,
  };
  try {
    let createdVideogame = await Videogame.create(newVideogame);
    let arrGenres = await Genre.findAll({ where: { name: genres } });
    let ultimateGame = await createdVideogame.addGenres(arrGenres);

    res.json({
      message: "videojuego creado exitosamente",
      videogame: ultimateGame,
    });
    } catch (error) {
    next(error)
  }
};

module.exports = {
  getVideogames,
  getVideogamesById,
  postVideogames,
};
