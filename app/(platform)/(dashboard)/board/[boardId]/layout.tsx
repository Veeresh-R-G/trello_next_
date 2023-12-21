import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import { BoardNavbar } from './_components/BoardNavBar';



export async function generateMetadata({ params }: { params: { boardId: string } }) {

    const { orgId } = auth();

    if (!orgId) {
        return {
            title: "Board",
        }
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId: orgId,
        }
    })

    return {
        title: board?.title || "Board",

    }
}

async function BoardIdLayout({ children, params }: { children: React.ReactNode, params: { boardId: string } }) {

    const { orgId } = auth();

    if (!orgId) {
        return redirect("select-org")
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId: orgId,
        }
    })

    if (!board) {
        notFound()
    }
    return (
        <div
            className="relative h-full bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${board.imageFullUrl})` }}
        >
            <BoardNavbar data={board} />

            <div className='relative pt-28 h-full'>
                <main>
                    {children}
                    {params.boardId}
                </main>

            </div>
        </div>
    )
}

export default BoardIdLayout