import { Profile } from "../models/Profile";

const getByUserId = async (userId: string) => {
  return Profile.findOne({ user: userId });
};

const updateByUserId = async (userId: string, data: any) => {
  return Profile.findOneAndUpdate({ user: userId }, data, {
    new: true,
    upsert: true
  });
};

const getById = async (id: string) => {
  return Profile.findById(id);
};

export const profileService = {
  getByUserId,
  updateByUserId,
  getById
};






