export type VolunteerForm = {
  fullName: string;
  age?: string;
  city: string;
  phone?: string;
  email?: string;
  availability: "Weekendy" | "Dni robocze" | "Elastycznie";
  roles: string[];
  experience?: string;
  rodo: boolean;
};
