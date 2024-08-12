import jwt from 'jsonwebtoken';
import connection from '../../../../../middleware/db';
import { NextResponse } from 'next/server';
import UserSchema from '@/collections/User';
import Cookies from 'universal-cookie'; // For server-side cookie handling

const JWT_SECRET = process.env.NEXT_SECRET_TOKEN;

export async function GET(req) {
    console.log("Incoming request:", req.url);

    await connection(); // Ensure database connection

    try {
        // Extract cookies from request
        const cookies = new Cookies(req.headers.get('cookie'));
        const token = cookies.get('@Token');

        if (!token) {
            console.error("Authorization token missing in cookies");
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
            console.log("Decoded token:", decoded);
        } catch (err) {
            console.error("Token verification failed:", err.message);
            return new NextResponse(JSON.stringify({ message: 'Invalid token', error: err.message }), { status: 401 });
        }

        const user = await UserSchema.findById(decoded.userId).select('-password');
        if (!user) {
            console.error("User not found");
            return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        console.log("User found:", user);
        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error.message);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
    }
}
