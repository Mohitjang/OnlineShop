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
  params: async (req, file) => {
    try {
      // Perform asynchronous operations
      // For example, generating a unique public_id using uuid
      const public_id = uuid() + "-" + file.originalname;

      // Wait for asynchronous operations to complete
      // Then return the parameters object
      return {
        folder: "products-data/images",
        format: ["jpg", "jpeg", "png"],
        public_id: public_id,
      };
    } catch (error) {
      // Handle errors gracefully
      console.error("Error generating Cloudinary params:", error);
      throw error; // Rethrow the error to propagate it
    }
  },
  // params: {
  //   folder: "products-data/images",
  //   allowed_formats: ["jpg", "jpeg", "png"],
  //   public_id: uuid() + "-" + file.originalname,
  // },
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

// name of the image attribute
const configuredMulterMiddleware = upload.single("image");

// const configuredMulterMiddleware = async (req, res, next) => {
//   try {
//     upload.single("image")(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         // A Multer error occurred when uploading.
//         return res.status(500).json({ error: err.message });
//       } else if (err) {
//         // An unknown error occurred when uploading.
//         return res.status(500).json({ error: "Unknown error occurred" });
//       }
//       // Upload the file to Cloudinary
//       console.log("fileUploadMiddleware is running:");
//       console.log(
//         "req.file object (which is uploaded on cloudinary) :  ",
//         req.file
//       );
//       const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
//       if (!cloudinaryResponse) {
//         return res
//           .status(500)
//           .json({ error: "Failed to upload to Cloudinary" });
//       }
//       // Set the Cloudinary URL or any other relevant data in the request object for further processing if needed
//       req.cloudinaryUrl = cloudinaryResponse.secure_url;
//       req.imageName = cloudinaryResponse.public_id;
//       // Pass control to the next middleware or route handler
//       next();
//     });
//   } catch (error) {
//     console.error("Error in imageUploadMiddleware:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

module.exports = configuredMulterMiddleware;
