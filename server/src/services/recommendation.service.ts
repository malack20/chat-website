import { Profile } from "../models/Profile";

// Placeholder for more advanced matching / recommendation logic
const getRecommendedProfiles = async (userId: string) => {
  // TODO: implement real scoring based on preferences, location, interests, etc.
  return Profile.find({ user: { $ne: userId } }).limit(50);
};

export const recommendationService = {
  getRecommendedProfiles
};



