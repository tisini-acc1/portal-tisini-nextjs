import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"

import { authOptions } from "../../auth/[...nextauth]/options"

export async function GET(reguest: Request, {params}: any) {
    const {compId} = params

    const session = await getServerSession(authOptions)
    const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

    const res = await fetch(`${url}/api/competitions/${compId}/fixtures/`, {
        headers: { Authorization: `JWT ${session?.accessToken}` },
      })

    const fixtureData = await res.json()

    return NextResponse.json(fixtureData)
}