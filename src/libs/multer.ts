import multer from 'multer';

const storage = multer.memoryStorage();
const uploadStrategy = multer({storage: storage}).single('image')

export default uploadStrategy;