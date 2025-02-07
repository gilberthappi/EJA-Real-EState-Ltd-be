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
import { TestimonyService } from "../services/testimonyService";
import {
  CreateTestimonyDto,
  IResponse,
  TTestimony,
} from "../utils/interfaces/common";
import { Request as Req } from "express";
import upload from "../utils/cloudinary";
import { appendPhotoAttachments } from "../middlewares/company.middlewares";

@Tags("Testimony")
@Route("/api/testimony")
export class TestimonyController {
  @Get("/")
  public async getContacts(): Promise<IResponse<TTestimony[]>> {
    return TestimonyService.getAllTestimony();
  }

  @Get("/{id}")
  public async getContact(
    @Path() id: number,
  ): Promise<IResponse<TTestimony | null>> {
    return TestimonyService.getTestimony(id);
  }

  @Post("/")
  @Middlewares(upload.any(), appendPhotoAttachments)
  public async createContact(
    @Body() testimonyData: CreateTestimonyDto,
    @Request() request: Req,
  ): Promise<IResponse<TTestimony>> {
    return new TestimonyService(request).createTestimony(testimonyData);
  }

  @Put("/{id}")
  public async updateContact(
    @Path() id: number,
    @Body() testimonyData: CreateTestimonyDto,
  ): Promise<IResponse<TTestimony | null>> {
    return TestimonyService.updateTestimony(id, testimonyData);
  }

  @Delete("/{id}")
  public async deleteContact(@Path() id: number): Promise<IResponse<null>> {
    await TestimonyService.deleteTestimony(id);
    return {
      statusCode: 200,
      message: "Contacts post deleted successfully",
    };
  }
}
