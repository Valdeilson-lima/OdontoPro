import { DefaulAuthSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaulAuthSession["user"];
  }
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: null | string | boolean;
  image?: string | null;
  strip_customer_id?: string | null;
  times: string[];
  address?: string | null;
  phone?: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  
}