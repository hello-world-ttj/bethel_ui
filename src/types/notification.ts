import { User } from "./user";

export type Notification = {
  _id: string;
  content: string;
  subject: string;
  users: User[];
  type: string;
  createdAt: string;
};
