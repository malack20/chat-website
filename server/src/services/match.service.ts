import { Match } from "../models/Match";
import { Profile } from "../models/Profile";

const getRecommendations = async (userId: string) => {
  // Very simple placeholder: return all profiles except current user
  return Profile.find({ user: { $ne: userId } }).limit(20);
};

const likeUser = async (userId: string, likedUserId: string) => {
  // Placeholder: when both users have "liked" each other, create a match
  // For now, just create a match document with both users
  const existing = await Match.findOne({ users: { $all: [userId, likedUserId] } });
  if (existing) {
    return existing;
  }
  const match = await Match.create({ users: [userId, likedUserId] });
  return match;
};

const getMatches = async (userId: string) => {
  return Match.find({ users: userId }).populate("users");
};

export const matchService = {
  getRecommendations,
  likeUser,
  getMatches
};


