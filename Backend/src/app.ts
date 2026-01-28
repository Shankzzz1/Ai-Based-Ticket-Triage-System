import express from "express";
import cors from "cors";
import ticketRoutes from "./modules/ticket/ticket.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketRoutes);

export default app;
