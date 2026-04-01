import { Injectable } from '@nestjs/common';
import { matchDriver } from './match.driver';
import { Driver, Rider } from './types/driver.types';

@Injectable()
export class DriverMatchingService {
  match(drivers: Driver[], rider: Rider): Driver | null {
    return matchDriver(drivers, rider);
  }
}
