import express from 'express';
import movieController from '../controllers/movieController';

const router = express.Router();

router.post('/create', movieController.createMovie);

router.get('/find/:id', movieController.getMovieById);

router.get('/random', movieController.getRandomMovie);

export default router;
