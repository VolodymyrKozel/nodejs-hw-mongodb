import cloudinary from 'cloudinary';
import { env } from './env.js';
/*
import { CLOUDINARY } from '../constants/index.js'; */

cloudinary.v2.config({
  secure: true,
  cloud_name: env('CLOUD_NAME'),
  api_key: env('API_KEY'),
  api_secret: env('API_SECRET'),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  return response.secure_url;
};
