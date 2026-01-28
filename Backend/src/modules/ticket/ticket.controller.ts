import { Request, Response } from "express";
import * as TicketService from "./ticket.service";

export const create = async (req: Request, res: Response) => {
  const ticket = await TicketService.createTicket(req.body);
  res.status(201).json(ticket);
};

export const getAll = async (_: Request, res: Response) => {
  const tickets = await TicketService.getAllTickets();
  res.json(tickets);
};

export const getById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const ticket = await TicketService.getTicketById(req.params.id);
  res.json(ticket);
};

export const assign = async (
  req: Request<{ id: string }, any, { agentId: string }>,
  res: Response
) => {
  const { agentId } = req.body;
  const ticket = await TicketService.assignTicket(req.params.id, agentId);
  res.json(ticket);
};

export const resolve = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const ticket = await TicketService.resolveTicket(req.params.id);
  res.json(ticket);
};
