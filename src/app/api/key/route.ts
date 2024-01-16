'use server';

import addKey from '@/util/add-key';
import deleteKey from '@/util/delete-key';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
    const session = await getServerSession();
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.key)
        return NextResponse.json({ error: 'No key provided' }, { status: 400 });
    const response = await addKey(
        body.key,
        session.user!.name!.replace(/ /g, '')
    ).catch((err) => {
        console.log(err);
        return false;
    });
    if (response) {
        return NextResponse.json({ success: true }, { status: 200 });
    }
    return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
    );
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    const session = await getServerSession();
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
    }

    await deleteKey(session.user!.name!.replace(/ /g, ''));
    return NextResponse.json({ success: true }, { status: 200 });
};
