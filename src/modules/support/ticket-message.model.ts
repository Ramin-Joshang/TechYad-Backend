import { Schema, Types, model, Document } from "mongoose";

export interface ITicketMessage extends Document {
  ticketId: Types.ObjectId;
  senderId: Types.ObjectId;
  message: string;
  attachments?: Types.ObjectId[];
}

const ticketMessageSchema = new Schema<ITicketMessage>(
  {
    ticketId: { type: Schema.Types.ObjectId, ref: "Ticket", required: true, index: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    attachments: [{ type: Schema.Types.ObjectId, ref: "File" }],
  },
  { timestamps: true }
);

export const TicketMessage = model<ITicketMessage>("TicketMessage", ticketMessageSchema);
