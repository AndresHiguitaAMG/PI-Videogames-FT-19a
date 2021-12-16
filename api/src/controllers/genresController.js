const { Genre } = require('../db');

const getGenres = async(req, res, next) => {
    try{
        const dbInfo = await Genre.findAll()  
        if(dbInfo.length)
        return res.status(200).json(dbInfo)
        else{
            return res.status(400).json({message: "Your request could not be processed"})
        }
    }catch{
        return res.status(400).json({message: "Error"})
    }
}

module.exports = getGenres; 
