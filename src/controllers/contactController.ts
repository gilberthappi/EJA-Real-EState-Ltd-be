import {
  Body,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
  Request,
  Middlewares,
} from "tsoa";
import { ContactService } from "../services/contactService";
import {
  CreateContactDto,
  IResponse,
  TContact,
} from "../utils/interfaces/common";
import { Request as Req } from "express";
import upload from "../utils/cloudinary";
import { appendPhotoAttachments } from "../middlewares/company.middlewares";

@Tags("Contact")
@Route("/api/contact")
export class ContactController {
  @Get("/")
  public async getContacts(): Promise<IResponse<TContact[]>> {
    return ContactService.getAllContact();
  }

  @Get("/{id}")
  public async getContact(
    @Path() id: number,
  ): Promise<IResponse<TContact | null>> {
    return ContactService.getContact(id);
  }

  @Post("/")
  @Middlewares(upload.any(), appendPhotoAttachments)
  public async createContact(
    @Body() contactData: CreateContactDto,
    @Request() request: Req,
  ): Promise<IResponse<TContact>> {
    return new ContactService(request).createContact(contactData);
  }

  @Put("/{id}")
  public async updateContact(
    @Path() id: number,
    @Body() contactData: CreateContactDto,
  ): Promise<IResponse<TContact | null>> {
    return ContactService.updateContact(id, contactData);
  }

  @Delete("/{id}")
  public async deleteContact(@Path() id: number): Promise<IResponse<null>> {
    await ContactService.deleteContact(id);
    return {
      statusCode: 200,
      message: "Contacts post deleted successfully",
    };
  }
}
