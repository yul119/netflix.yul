import customRespond from '../helper/customRespond';
import Lists from '../models/listModel';
import Movies from '../models/movieModel';

const listController = {
  createList: async (req, res) => {
    const newList = new Lists(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      customRespond(res, 500, err.message);
    }
  },
  getList: async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    let resLists = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await Lists.aggregate([
            { $sample: { size: 10 } },
            {
              $match: {
                type: typeQuery,
                genre: genreQuery,
              },
            },
          ]);

          resLists = await Promise.all(
            list.map(async (el) => {
              const movies = await Promise.all(
                el.content.map(async (p) => {
                  const movie = await Movies.findById(p);
                  return movie;
                })
              );
              return { ...el, movies };
            })
          );
        } else {
          list = await Lists.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
          resLists = await Promise.all(
            list.map(async (el) => {
              const movies = await Promise.all(
                el.content.map(async (p) => {
                  const movie = await Movies.findById(p);
                  return movie;
                })
              );
              return { ...el, movies };
            })
          );
        }
      } else {
        list = await Lists.aggregate([
          { $sample: { size: 10 } },
        ]);
        resLists = await Promise.all(
          list.map(async (el) => {
            const movies = await Promise.all(
              el.content.map(async (p) => {
                const movie = await Movies.findById(p);
                return movie;
              })
            );
            return { ...el, movies };
          })
        );
      }
      res.status(200).json(resLists);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default listController;
