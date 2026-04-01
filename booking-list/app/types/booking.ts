export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Booking {
	bookingId: string;
	riderId: string;
	status: BookingStatus;
}