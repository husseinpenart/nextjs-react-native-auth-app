import UserSchema from '@/collections/User';
import connection from '@/middleware/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, username, password } = await req.json();
        // Validate input
        if (!name) return new NextResponse(JSON.stringify({ message: 'نام و نام خانوادگی ضروریست' }), { status: 400 });
        if (!email) return new NextResponse(JSON.stringify({ message: 'ایمیل ضروریست' }), { status: 400 });
        if (!password) return new NextResponse(JSON.stringify({ message: 'کلمه عبور الزامیست' }), { status: 400 });
        await connection();

        // Check if the user already exists
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return new NextResponse(JSON.stringify({ message: 'ایمیل از قبل موجود است' }), { status: 400 });
        }

        // Create the new user
        const newUser = new UserSchema({ name, email, username, password });

        console.log('Creating new user with password:', password);
        await newUser.save();

        // Verify stored hash
        const storedUser = await UserSchema.findOne({ email });
        console.log('Stored Hashed Password After Save:', storedUser.password);

        return new NextResponse(
            JSON.stringify({ message: 'ثبت نام با موفقیت انجام شد', user: newUser }),
            { status: 200 }
        );
    } catch (error) {
        console.error('خطایی یافت شد اتصال خود را چک کنید:', error);
        return new NextResponse(JSON.stringify({ message: `خطایی یافت شد اتصال خود را چک کنید: ${error.message}` }), {
            status: 500,
        });
    }
};
