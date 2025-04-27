import dbConnect from "@/app/lib/db";
import User from "@/app/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {
    try {
        await dbConnect();
        const { email, password } = await req.json();
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all the required fields' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const response = NextResponse.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
            }
        }, { status: 200, statusText: 'OK' });
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500, statusText: 'Internal Server Error' });
    }
}