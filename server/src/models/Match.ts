import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMatch extends Document {
  users: Types.ObjectId[]; // two users in a match
  createdAt: Date;
}

const MatchSchema = new Schema<IMatch>(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }]
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Match = mongoose.model<IMatch>("Match", MatchSchema);



