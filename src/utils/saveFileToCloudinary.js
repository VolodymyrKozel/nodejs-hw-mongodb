import cloudinary from 'cloudinary';

cloudinary.v2.config({
  secure: true,
  cloud_name: 'CLOUD_NAME',
  api_key: 'API_KEY',
  api_secret: 'API_SECRET',
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  return response.secure_url;
};
