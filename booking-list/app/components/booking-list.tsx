'use client';

import { useCallback, useEffect, useState } from 'react';
import { Booking } from '@/types/booking';

export function BookingList() {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchBookings = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch('/api/bookings', {
				method: 'GET',
				cache: 'no-store',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch bookings');
			}

			const data: Booking[] = await response.json();
			setBookings(data);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Something went wrong',
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void fetchBookings();
	}, [fetchBookings]);

	if (loading) {
		return (
			<div>
				<h2>Bookings</h2>
				<p>Loading bookings...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<h2>Bookings</h2>
				<button type="button" onClick={() => void fetchBookings()}>
					Refresh
				</button>
				<p>Error: {error}</p>
			</div>
		);
	}

	return (
		<div>
			<h2>Bookings</h2>

			<button type="button" onClick={() => void fetchBookings()}>
				Refresh
			</button>

			{bookings.length === 0 ? (
				<p>No bookings found.</p>
			) : (
				<ul style={{ marginTop: '1rem' }}>
					{bookings.map((booking) => (
						<li key={booking.bookingId} style={{ marginBottom: '0.75rem' }}>
							<strong>{booking.bookingId}</strong>
							<div>Rider ID: {booking.riderId}</div>
							<div>Status: {booking.status}</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}