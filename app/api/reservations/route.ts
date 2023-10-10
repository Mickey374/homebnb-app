import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request): Promise<Response> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return new Response("Bad Request", { status: 400 });
  }

  const listingAndReservation = await prisma.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return new Response(JSON.stringify(listingAndReservation), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
