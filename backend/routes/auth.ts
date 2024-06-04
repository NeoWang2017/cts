import express from "express";
import authController from "../controller/AuthController";

const router = express.Router();

/* GET users listing. */
router.post('/verify', authController.verify);

router.get('/token/callback', authController.tokenCallback);

export default router;
