import { Router } from "express";
import * as TicketController from "./ticket.controller";

const router = Router();

router.post("/", TicketController.create);
router.get("/", TicketController.getAll);
router.get("/:id", TicketController.getById);
router.put("/:id/assign", TicketController.assign);
router.put("/:id/resolve", TicketController.resolve);

export default router;
