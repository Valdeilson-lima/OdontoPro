import { DefaulAuthSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaulAuthSession["user"];
  }
}

interface User {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: null | string | boolean;
  image?: string;
  strip_customer_id?: string;
  times: string[];
  address?: string;
  phone?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  
}