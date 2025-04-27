import { Church } from "./church";

export type User = {
  salutation: string;
  _id: string;
  name: string;
  church: Church;
  email: string;
  phone: string;
  status: string;
  address: string;
  role: string;
};
