const multer = require("multer");
const uuid = require("uuid").v4;
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const uploadOnCloudinary = require("../util/cloudinary.js");

// "product-data/images"
// configuration:-
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to use Cloudinary as storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products-data/images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// console.log(cloudinary.config())
// const storage = multer({
//   storage: multer.diskStorage({
//     destination: function(req,file,cb){
//       cb(null,"product-data/images")
//     },
//     filename: function (req, file, cb) {
//       cb(null, uuid() + "-" + file.originalname);
//     },
//   }),
// });

const upload = multer({ storage: storage });

const configuredMulterMiddleware = async (req, res, next) => {
  try {
    upload.single("image")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(500).json({ error: err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(500).json({ error: "Unknown error occurred" });
      }

      // Upload the file to Cloudinary
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResponse) {
        return res
          .status(500)
          .json({ error: "Failed to upload to Cloudinary" });
      }

      // Set the Cloudinary URL or any other relevant data in the request object for further processing if needed
      req.cloudinaryUrl = cloudinaryResponse.url;

      // Pass control to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error("Error in imageUploadMiddleware:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// name of the image attribute
// const configuredMulterMiddleware = upload.single("image");

module.exports = configuredMulterMiddleware;
