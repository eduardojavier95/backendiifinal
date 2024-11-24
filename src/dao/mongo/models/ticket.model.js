import mongoose from "mongoose";
import shortid from "shortid";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    default: shortid.generate,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
