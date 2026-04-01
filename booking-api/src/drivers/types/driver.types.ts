export type Coordinates = {
  lat: number;
  lng: number;
};

export type Driver = {
  id: string;
  location: Coordinates;
  available: boolean;
  skillTags: string[];
};

export type Rider = {
  location: Coordinates;
  requiredTags: string[];
};
