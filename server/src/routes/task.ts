import express from 'express';
import controller from '../controllers/task';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:taskID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:taskID', controller.update);
router.delete('/:taskID', controller.deleteTask);

export = router;
