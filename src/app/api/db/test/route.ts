// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';

export async function GET() {
    try {
        const db = await connectToDatabase();
        return NextResponse.json({
            message: 'Connected to MongoDB!',
            dbName: db.connection.name,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
            return NextResponse.json(
                { message: 'Failed to connect to MongoDB', error: error.message },
                { status: 500 }
            );
        }

    }
}
