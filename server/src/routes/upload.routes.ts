import { Router } from "express";
import multer from "multer";
import { uploadMedia } from "../controllers/uploadController";
import { allMedia } from "../controllers/mediaController";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.array("images"), uploadMedia);

router.get("/uploads", allMedia);

export default router;
