import multer from 'multer';
import path from 'path';
import fs from 'fs'; 

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Option 1: Block ALL image files completely
const blockImagesFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(new Error('Image files are not allowed!'));
    } else {
        cb(null, true);
    }
};

// Option 2: Allow only specific file types (excluding images)
const allowSpecificTypesFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Define allowed file types (excluding images)
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'text/csv',
        'application/json',
        'application/xml'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`File type ${file.mimetype} is not allowed!`));
    }
};

// Option 3: Allow images but filter by content (more advanced)
const contentBasedFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Check file extension and mimetype
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt', '.csv', '.json', '.xml'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (file.mimetype.startsWith('image/')) {
        cb(new Error('Image files are not allowed!'));
    } else if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error(`File extension ${fileExtension} is not allowed!`));
    }
};

// Option 4: Original filter (allow images only)
const allowImagesFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

// Choose which filter to use by changing this line:
const fileFilter = blockImagesFilter; // Change this to use different filters

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
});

export default upload;
