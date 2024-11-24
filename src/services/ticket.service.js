import Ticket from "../dao/mongo/models/ticket.model.js";

export const createTicket = async (ticketData) => {
  try {
    const ticket = await Ticket.create(ticketData);
    return ticket;
  } catch (error) {
    throw new Error(`Error creating ticket: ${error.message}`);
  }
};
