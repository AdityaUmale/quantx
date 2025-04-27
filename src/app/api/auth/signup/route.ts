import dbConnect from "@/app/lib/db";
import User from "@/app/lib/models/User";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response){
    try {
        await dbConnect();
        const {username, email, password} = await req.json();
        if (!username || !email || !password) {
            return res.status(400).json({message: 'Please provide all the required fields'});
        }
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        const response = NextResponse.json({
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                createdAt: newUser.createdAt,
            }
        }, {status: 201, statusText: 'Created'});

        return response;
    } catch (error){
        console.log(error);
        return NextResponse.json({message: 'Something went wrong'}, {status: 500});
    }

}

