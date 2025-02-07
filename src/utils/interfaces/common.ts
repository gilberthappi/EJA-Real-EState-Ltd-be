import type { $Enums } from "@prisma/client";
import { TsoaResponse } from "tsoa";
export interface IResponse<T> {
  statusCode: number;
  message: string;
  error?: unknown;
  data?: T;
}

export type TUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  roles?: { id: number; role: string; userId: number }[];
  company?: { id: number; role: string; userId: number; companyId: number };
};

export type RoleT = "ADMIN" | "COMPANY_ADMIN" | "COMPANY_USER" | "USER";

export interface IUser extends Omit<TUser, "id" | "createdAt" | "updatedAt"> {}
export interface ILoginResponse
  extends Omit<TUser, "password" | "createdAt" | "updatedAt" | "roles"> {
  token: string;
  roles: $Enums.Role[];
}
export interface ILoginUser extends Pick<IUser, "email" | "password"> {}
export interface ISignUpUser
  extends Pick<
    IUser,
    "email" | "password" | "firstName" | "lastName" | "roles"
  > {}

export type TErrorResponse = TsoaResponse<
  400 | 401 | 500,
  IResponse<{ message: string }>
>;

export type TService = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateServiceDto {
  title: string;
  description: string;
}

export type TTestimony = {
  id: number;
  name: string;
  message: string;
  photo?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateTestimonyDto {
  name: string;
  message: string;
  photo?: Express.Multer.File | string | null;
}

export type TContact = {
  id: number;
  name: string;
  message: string;
  photo?: string | null;
  location?: string | null;
  phoneNumber?: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface CreateContactDto {
  name: string;
  message: string;
  photo?: Express.Multer.File | string | null;
  location?: string | null;
  phoneNumber?: string | null;
  email: string;
}
export interface IResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}
