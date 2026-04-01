import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';

type BookingStatus = 'PENDING';

interface Booking {
  bookingId: string;
  riderId: string;
  pickupLocation: {
    lat: number;
    lng: number;
  };
  dropoffLocation: {
    lat: number;
    lng: number;
  };
  scheduledTime: string;
  status: BookingStatus;
}

export interface CreateBookingResponse {
  bookingId: string;
  status: 'PENDING';
}

@Injectable()
export class BookingsService {
  private readonly bookings: Map<string, Booking> = new Map();

  create(createBookingDto: CreateBookingDto): CreateBookingResponse {
    // Validate all fields are present
    if (
      !createBookingDto.riderId ||
      !createBookingDto.pickupLocation ||
      !createBookingDto.dropoffLocation ||
      !createBookingDto.scheduledTime
    ) {
      throw new BadRequestException('All fields are required');
    }

    // Validate latitude and longitude for pickupLocation
    const { lat: pickupLat, lng: pickupLng } = createBookingDto.pickupLocation;
    if (pickupLat < -90 || pickupLat > 90) {
      throw new BadRequestException(
        'pickupLocation.lat must be between -90 and 90',
      );
    }
    if (pickupLng < -180 || pickupLng > 180) {
      throw new BadRequestException(
        'pickupLocation.lng must be between -180 and 180',
      );
    }

    // Validate latitude and longitude for dropoffLocation
    const { lat: dropoffLat, lng: dropoffLng } =
      createBookingDto.dropoffLocation;
    if (dropoffLat < -90 || dropoffLat > 90) {
      throw new BadRequestException(
        'dropoffLocation.lat must be between -90 and 90',
      );
    }
    if (dropoffLng < -180 || dropoffLng > 180) {
      throw new BadRequestException(
        'dropoffLocation.lng must be between -180 and 180',
      );
    }

    // Validate scheduledTime is a valid ISO date and not in the past
    const scheduledDate = new Date(createBookingDto.scheduledTime);
    if (Number.isNaN(scheduledDate.getTime())) {
      throw new BadRequestException('scheduledTime must be a valid ISO date');
    }
    if (scheduledDate.getTime() < Date.now()) {
      throw new BadRequestException('scheduledTime cannot be in the past');
    }

    // Generate a unique booking ID
    const bookingId = this.generateBookingId();

    // Save the booking in memory
    const booking: Booking = {
      bookingId,
      riderId: createBookingDto.riderId,
      pickupLocation: createBookingDto.pickupLocation,
      dropoffLocation: createBookingDto.dropoffLocation,
      scheduledTime: createBookingDto.scheduledTime,
      status: 'PENDING',
    };
    this.bookings.set(bookingId, booking);

    // Return a success response
    return {
      bookingId,
      status: booking.status,
    };
  }

  private generateBookingId(): string {
    return `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }
}
