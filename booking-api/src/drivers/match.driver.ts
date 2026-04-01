import { Coordinates, Driver, Rider } from './types/driver.types';

function calculateDistance(a: Coordinates, b: Coordinates): number {
  const latDiff = a.lat - b.lat;
  const lngDiff = a.lng - b.lng;

  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

export function matchDriver(drivers: Driver[], rider: Rider): Driver | null {
  const availableDrivers = drivers.filter((driver) => driver.available);

  const matchingDrivers = availableDrivers.filter((driver) =>
    rider.requiredTags.every((tag) => driver.skillTags.includes(tag)),
  );

  if (matchingDrivers.length === 0) {
    return null;
  }

  let bestDriver = matchingDrivers[0];
  let bestDistance = calculateDistance(bestDriver.location, rider.location);

  for (let index = 1; index < matchingDrivers.length; index += 1) {
    const currentDriver = matchingDrivers[index];
    const currentDistance = calculateDistance(
      currentDriver.location,
      rider.location,
    );

    if (currentDistance < bestDistance) {
      bestDriver = currentDriver;
      bestDistance = currentDistance;
      continue;
    }

    if (currentDistance === bestDistance && currentDriver.id < bestDriver.id) {
      bestDriver = currentDriver;
    }
  }

  return bestDriver;
}
