import express from 'express';
import listController from '../controllers/listController';

const router = express.Router();

router.post('/create', listController.createList);

router.get('/', listController.getList);

export default router;
