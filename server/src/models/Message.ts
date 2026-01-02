import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  match: Types.ObjectId;
  sender: Types.ObjectId;
  content: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    match: { type: Schema.Types.ObjectId, ref: "Match", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema);






