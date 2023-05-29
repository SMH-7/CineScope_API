import express from 'express';
import { genres } from './genresData';

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    genres.genres.forEach(genre => {
        if (genre.id === id) {
          return res.status(200).json({ name: genre.name });
        }
      });
      
      res.status(404).json({
        message: 'The resource you requested could not be found.',
        status_code: 404
      });
});

export default router;
