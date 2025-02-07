import { BaseService } from "./Service";
import { prisma } from "../utils/client";
import {
  CreateContactDto,
  IResponse,
  TContact,
} from "../utils/interfaces/common";
import AppError from "../utils/error";

export class ContactService extends BaseService {
  public async createContact(
    contactData: CreateContactDto,
  ): Promise<IResponse<TContact>> {
    try {
      const newContact = await prisma.contact.create({
        data: {
          email: contactData.email,
          message: contactData.message,
          name: contactData.name,
          location: contactData.location || undefined,
          phoneNumber: contactData.phoneNumber || undefined,
          photo:
            typeof contactData.photo === "string"
              ? contactData.photo
              : undefined,
        },
      });
      return {
        statusCode: 201,
        message: "newContact created successfully",
        data: newContact,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getContact(
    contactId: number,
  ): Promise<IResponse<TContact>> {
    try {
      const contact = await prisma.contact.findUnique({
        where: {
          id: contactId,
        },
      });

      if (!contact) {
        throw new AppError("contact post not found", 404);
      }
      return {
        statusCode: 200,
        message: "contact post fetched successfully",
        data: contact,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getAllContact(): Promise<IResponse<TContact[]>> {
    try {
      const contact = await prisma.contact.findMany();

      return {
        statusCode: 200,
        message: "contact fetched successfully",
        data: contact,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async updateContact(
    contactId: number,
    contactData: Partial<CreateContactDto>,
  ): Promise<IResponse<TContact>> {
    try {
      const updatedContact = await prisma.contact.update({
        where: { id: contactId },
        data: {
          ...contactData,
          photo:
            typeof contactData.photo === "string"
              ? contactData.photo
              : undefined,
        },
      });
      return {
        statusCode: 200,
        message: "contact post updated successfully",
        data: updatedContact,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async deleteContact(
    contactId: number,
  ): Promise<IResponse<null>> {
    try {
      await prisma.contact.delete({ where: { id: contactId } });
      return {
        statusCode: 200,
        message: "contact post deleted successfully",
        data: null,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }
}
