import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@blackteam/commonlib';
import { Product } from '../models/product';
import { uploadToS3 } from '../services/uploads3';
const router = express.Router();

router.post(
  '/api/product',
  requireAuth,
  [
    body('name').not().isEmpty().withMessage('name is required'),
    body('description').not().isEmpty().withMessage('description is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('image').not().isEmpty().withMessage('name is required'),
    body('nameImage')
      .not()
      .isEmpty()
      .withMessage('name of the image is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const data = await uploadToS3({
      name: req.body.nameImage,
      data: req.body.image,
    });

    const newProduct = Product.build({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: data.Location,
      keyimage: data.key,
      status: true,
    });

    await newProduct.save();
    res.send(newProduct);
  }
);

export { router as createProductRouter };
