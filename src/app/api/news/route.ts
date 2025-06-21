import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const file = formData.get('image') as File;

        if (!file || !title || !description) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = Date.now() + '-' + file.name.replace(/\s+/g, '_');
        const filePath = path.join(process.cwd(), 'public/uploads', fileName);

        await writeFile(filePath, buffer);

        // Save to database (update path based on your schema)
        const prisma = (await import('@/lib/prisma')).default;
        const created = await prisma.news.create({
            data: {
                title,
                content: description,
                image: `/uploads/${fileName}`,
            },
        });

        return NextResponse.json({ success: true, news: created });
    } catch (err) {
        console.error('Upload error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
