import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import Media from "../models/media.model";

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    const { title, description, tags, category, problem, solution } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No images uploaded." });
    }

    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, { folder: "media-uploads" })
    );
    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.secure_url);

    const newMedia = await Media.create({
      title,
      description,
      tags: tags.split(",").map((tag: string) => tag.trim()),
      category,
      problem,
      solution,
      images: imageUrls,
    });

    res.status(201).json({ message: "Upload successful!", data: newMedia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
