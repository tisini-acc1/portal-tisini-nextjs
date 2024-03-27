import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"

import { authOptions } from "../../auth/[...nextauth]/options"

export async function GET(reguest: Request, {params}: any) {
    const { teamId } = params;

    const session = await getServerSession(authOptions);
    const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

    const res = await fetch(`${url}/api/teams/${teamId}/players/`, {
        headers: { Authorization: `JWT ${session?.accessToken}` },
      });

    const playersData = await res.json();

    return NextResponse.json(playersData);
}