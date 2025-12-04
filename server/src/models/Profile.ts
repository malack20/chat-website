import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProfile extends Document {
  user: Types.ObjectId;
  bio?: string;
  interests: string[];
  photos: string[];
  location?: string;
  lookingFor?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    bio: { type: String },
    interests: [{ type: String }],
    photos: [{ type: String }],
    location: { type: String },
    lookingFor: { type: String }
  },
  { timestamps: true }
);

export const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);



