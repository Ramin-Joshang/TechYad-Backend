import { Ticket } from './ticket.model.js';
import { TicketMessage } from './ticket-message.model.js';
import { AppError } from '../../common/errors/AppError.js';

export class SupportService {
  static async createTicket(userId: string, data: { subject: string, category?: string, priority?: "low" | "medium" | "high", message: string }) {
    const ticket = await Ticket.create({
      userId,
      subject: data.subject,
      category: data.category,
      priority: data.priority || 'medium'
    });

    await TicketMessage.create({
      ticketId: ticket._id,
      senderId: userId,
      message: data.message
    });

    return ticket;
  }

  static async getMyTickets(userId: string) {
    return await Ticket.find({ userId }).sort({ createdAt: -1 });
  }

  static async getTicketDetails(userId: string, ticketId: string) {
    const ticket = await Ticket.findOne({ _id: ticketId, userId });
    if (!ticket) throw new AppError('Ticket not found', 404, 'NOT_FOUND');

    const messages = await TicketMessage.find({ ticketId }).populate('senderId', 'firstName lastName role').sort({ createdAt: 1 });
    return { ticket, messages };
  }

  static async replyToTicket(userId: string, ticketId: string, message: string) {
    const ticket = await Ticket.findOne({ _id: ticketId, userId });
    if (!ticket) throw new AppError('Ticket not found', 404, 'NOT_FOUND');

    if (ticket.status === 'closed') {
      ticket.status = 'open'; // Reopen if user replies to closed ticket
      await ticket.save();
    }

    const reply = await TicketMessage.create({
      ticketId,
      senderId: userId,
      message
    });

    return reply;
  }
}
