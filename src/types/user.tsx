export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface UpdateProfilePayload {
  name: string;
}
