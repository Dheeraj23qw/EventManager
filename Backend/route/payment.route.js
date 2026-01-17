import express from 'express';
import { createPaymentIntent } from '../controller/payment.controller';

const router = express.Router();

router.post("/create-intent", createPaymentIntent);

export default router;