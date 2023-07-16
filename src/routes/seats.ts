import express from 'express';
import SeatsController from '../controllers/seats';
const router = express.Router();

router.route('/seats/:cartId/qty/:qty')
      .get(SeatsController.reserve);

export = router;
