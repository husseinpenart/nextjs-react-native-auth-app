// pages/api/login.ts
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import connection from '../../../../../middleware/db';
import UserSchema from '@/collections/User';
export const dynamic = "force-dynamic";

const SECRET_KEY = process.env.NEXT_SECRET_TOKEN;

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();

        // Validate input
        if (!email || !password) {
            return new NextResponse(
                JSON.stringify({ message: 'ایمیل و کلمه عبور الزامیست' }),
                { status: 400 }
            );
        }

        await connection(); // Ensure database connection

        // Find the user by email
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: 'کاربری یافت نشد' }),
                { status: 404 }
            );
        }

        // Validate password
        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
            return new NextResponse(
                JSON.stringify({ message: 'کلمه عبور اشتباه است' }),
                { status: 400 }
            );
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '30d' });
        console.log("Create JWT token: ", token)
        // Set token in HttpOnly cookie
        return new NextResponse(
            JSON.stringify({ message: `خوش آمدید ${user.name}`, user, token }),
            { status: 200 }
        );
        // response.cookies.set('@Token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', // Ensure secure cookie in production
        //     sameSite: 'strict',
        //     maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
        //     path: '/', // Adjust path as needed
        // });

        // return response;
    } catch (error) {
        console.error('Error in login:', error);
        return new NextResponse(
            JSON.stringify({ message: `Error in login: ${error.message}` }),
            { status: 500 }
        );
    }
};
