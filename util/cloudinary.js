const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// configuration:-
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); 

const uploadOnCloudinary = async (localFilePath) => {
  console.log("cloudinary.js file is running: ")
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("cloudinary localFilePath: ", localFilePath);
    console.log("response of clouadinary.js file: ", response);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove locally saved temporry file as the upload operation got failed.
    return null;
  }
};

module.exports = uploadOnCloudinary;
