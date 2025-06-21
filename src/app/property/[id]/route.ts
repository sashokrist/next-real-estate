import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const item = await prisma.renovation.findUnique({ where: { id: Number(params.id) } });
    return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    const updated = await prisma.renovation.update({
        where: { id: Number(params.id) },
        data,
    });
    return NextResponse.json(updated);
}