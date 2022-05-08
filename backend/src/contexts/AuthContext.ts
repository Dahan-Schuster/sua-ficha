import { Request, Response } from "express";
import { User } from "../models/User";

export interface AuthContext {
	req: Request;
	res: Response;
	user: User;
}