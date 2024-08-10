const multer = require('multer');
const { extname } = require('path');

exports.uploadFile = fieldName => {
    const storage = multer.diskStorage({
        filename: async (request, file, callback) => {
            try {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random()*1e9)}`;
                const ext = extname(file.originalname);
                const filename = `${uniqueSuffix}${ext}`;
                callback(null, filename);
            } catch (error) {
                callback(null, error);
            }
        }
    });

    return multer({storage}).fields([{name: fieldName}]);
}