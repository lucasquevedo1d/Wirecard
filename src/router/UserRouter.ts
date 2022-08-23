import express from "express";
import { ClientController } from "../controller/ClientController";
import { PaymentController } from "../controller/PaymentController";








export const userRouter = express.Router();
userRouter.post("/createClient", new ClientController().createClient)
userRouter.post("/createPayment", new PaymentController().payment)
userRouter.get("/login", new ClientController().login)
userRouter.get("/getPayment", new PaymentController().getPaymenteController)
