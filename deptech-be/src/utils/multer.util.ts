// backend/src/config/multer.ts
import multer, { type StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { getDirname } from "../global/path.global.js";

const __dirname = getDirname(import.meta.url);

export default class MulterUtil {
    private readonly uploadDir: string;
    private readonly pathName: string;

    constructor(pathName: string = "") {
        this.pathName = pathName;
        this.uploadDir = path.join(__dirname, `../../assets/uploads/${pathName}`);
        this.ensureUploadDir();
    }

    private ensureUploadDir() {
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    public getStorage(): StorageEngine {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, this.uploadDir);
            },
            filename: (req, file, cb) => {
                (req as any).filePathName = this.pathName;
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + path.extname(file.originalname));
            },
        });
    }

    public getUploader() {
        return multer({
            storage: this.getStorage(),
            limits: {
                fileSize: 10 * 1024 * 1024,
            },
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.startsWith("image/")) {
                    return cb(new Error("Only image files are allowed"));
                }
                cb(null, true);
            },
        });
    }
}
