import express from 'express';
import SeatsController from '../controllers/seats';
const router = express.Router();

router.route('/seats')
      .get(SeatsController.reserve);

export = router;
