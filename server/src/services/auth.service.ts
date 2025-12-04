import { User } from "../models/User";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";

const register = async (payload: {
  email: string;
  password: string;
  name: string;
  gender: string;
  age: number;
}) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new Error("Email already in use");
  }

  const hashed = await hashPassword(payload.password);

  const user = await User.create({
    email: payload.email,
    password: hashed,
    name: payload.name,
    gender: payload.gender,
    age: payload.age
  });

  const token = signToken({ id: user.id });
  return { user, token };
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const valid = await comparePassword(payload.password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }
  const token = signToken({ id: user.id });
  return { user, token };
};

export const authService = {
  register,
  login
};



