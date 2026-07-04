export type SavedLocation = {
  _id: string;
  userId: string;
  name: string;
  label: string;
  latitude: number;
  longitude: number;
  radius: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateLocationInput = {
  name: string;
  label?: string;
  latitude: number;
  longitude: number;
  radius?: number;
};
