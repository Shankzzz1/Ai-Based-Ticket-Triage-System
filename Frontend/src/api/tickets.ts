import axios from 'axios';
import { Ticket, CreateTicketRequest } from '../types/ticket';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ticketApi = {
  async getTickets(): Promise<Ticket[]> {
    const response = await apiClient.get<Ticket[]>('/tickets');
    return response.data;
  },

  async createTicket(ticketData: CreateTicketRequest): Promise<Ticket> {
    const response = await apiClient.post<Ticket>('/tickets', ticketData);
    return response.data;
  },
};
