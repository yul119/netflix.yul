import customRespond from '../helper/customRespond';
import Movies from '../models/movieModel';

const movieController = {
  createMovie: async (req, res) => {
    const newMovie = new Movies(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      return customRespond(res, 500, err.message);
    }
  },
  getMovieById: async (req, res) => {
    try {
      const movie = await Movies.findById(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      return customRespond(res, 500, err.message);
    }
  },
  getRandomMovie: async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === 'series') {
        movie = await Movies.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movies.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (err) {
      return customRespond(res, 500, err.message);
    }
  },
};

export default movieController;
