import { BaseService } from "./Service";
import { prisma } from "../utils/client";
import {
  CreateTestimonyDto,
  IResponse,
  TTestimony,
} from "../utils/interfaces/common";
import AppError from "../utils/error";

export class TestimonyService extends BaseService {
  public async createTestimony(
    testimonyData: CreateTestimonyDto,
  ): Promise<IResponse<TTestimony>> {
    try {
      const newTestimony = await prisma.testimony.create({
        data: {
          name: testimonyData.name,
          message: testimonyData.message,
          photo:
            typeof testimonyData.photo === "string"
              ? testimonyData.photo
              : undefined,
        },
      });
      return {
        statusCode: 201,
        message: "Testimony created successfully",
        data: newTestimony,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getTestimony(
    testimonyId: number,
  ): Promise<IResponse<TTestimony>> {
    try {
      const testimony = await prisma.testimony.findUnique({
        where: {
          id: testimonyId,
        },
      });

      if (!testimony) {
        throw new AppError("testimony post not found", 404);
      }
      return {
        statusCode: 200,
        message: "testimony post fetched successfully",
        data: testimony,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async getAllTestimony(): Promise<IResponse<TTestimony[]>> {
    try {
      const testimony = await prisma.testimony.findMany();

      return {
        statusCode: 200,
        message: "testimony fetched successfully",
        data: testimony,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async updateTestimony(
    testimonyId: number,
    testimonyData: Partial<CreateTestimonyDto>,
  ): Promise<IResponse<TTestimony>> {
    try {
      const updatedTestimony = await prisma.testimony.update({
        where: { id: testimonyId },
        data: {
          ...testimonyData,
          photo:
            typeof testimonyData.photo === "string"
              ? testimonyData.photo
              : undefined,
        },
      });
      return {
        statusCode: 200,
        message: "Testimony post updated successfully",
        data: updatedTestimony,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  public static async deleteTestimony(
    testimonyId: number,
  ): Promise<IResponse<null>> {
    try {
      await prisma.testimony.delete({ where: { id: testimonyId } });
      return {
        statusCode: 200,
        message: "testimony post deleted successfully",
        data: null,
      };
    } catch (error) {
      throw new AppError(error, 500);
    }
  }
}
