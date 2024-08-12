// // /pages/api/protected-route.js
// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import cookie from 'cookie';

// const SECRET_KEY = process.env.NEXT_SECRET_TOKEN;

// export async function GET(req: NextRequest) {
//     const cookies = cookie.parse(req.headers.get('cookie') || '');
//     const token = cookies.token;

//     console.log("token :", token);

//     if (!token) {
//         return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
//     }
//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.userId;
//         return new NextResponse(JSON.stringify({ message: 'Authorized', userId }), { status: 200 });

//     } catch (error) {
//         console.error('Token verification error:', error);
//         return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
//     }
// }
