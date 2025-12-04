import type { Request, Response } from "express";
import User from "../models/user.ts";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log("Error creating current user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createCurrentUser };
