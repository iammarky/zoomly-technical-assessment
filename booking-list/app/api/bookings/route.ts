import { NextResponse } from 'next/server';
import { Booking } from '@/types/booking';

const mockBookings: Booking[] = [
	{
		bookingId: 'bk_001',
		riderId: 'r123',
		status: 'PENDING',
	},
	{
		bookingId: 'bk_002',
		riderId: 'r456',
		status: 'CONFIRMED',
	},
	{
		bookingId: 'bk_003',
		riderId: 'r789',
		status: 'CANCELLED',
	},
];

export async function GET(): Promise<NextResponse<Booking[]>> {
	await new Promise((resolve) => setTimeout(resolve, 800));

	return NextResponse.json(mockBookings);
}