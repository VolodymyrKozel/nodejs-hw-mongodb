# Node.js Homework – MongoDB (REST API + Mongoose)

This is a complete Node.js backend project built as part of a homework assignment to master **MongoDB** and **Mongoose** in a real-world-like REST API.

The app is a **Contacts Management API** with full CRUD, authentication, avatar upload, email verification, and password recovery — very similar to the famous "goit-node-hw-rest-api" template, but using pure MongoDB instead of PostgreSQL.

Live API: https://nodejs-hw-mongodb-volodymyrkoz.onrender.com  
API Docs (Swagger): https://nodejs-hw-mongodb-volodymyrkoz.onrender.com/api-docs

## Features

- User registration / login with JWT
- Email verification (verification token + resend)
- Password reset via email
- Avatar upload (Cloudinary + multer)
- Protected routes (auth middleware)
- Full CRUD for contacts (GET, POST, DELETE, PUT, PATCH)
- Favorite field for contacts
- Contact filtering and pagination
- Input validation with Joi
- Error handling middleware
- Swagger / OpenAPI documentation
- Environment-based configuration (dev / prod)
- Logging with morgan

## Tech Stack

| Technology      | Purpose                          |
|-----------------|----------------------------------|
| Node.js         | Runtime                          |
| Express         | Web framework                    |
| MongoDB         | Database                         |
| Mongoose        | ODM & schema validation          |
| JWT             | Authentication                   |
| bcrypt          | Password hashing                 |
| Joi             | Request validation               |
| multer          | File upload middleware         |
| Cloudinary      | Avatar image hosting             |
| swagger-ui-express | API documentation             |
| morgan          | HTTP request logging             |
| cors            | Cross-origin resource sharing    |
| dotenv          | Environment variables            |
| nodemailer      | Sending verification & reset emails |
| uuid            | Verification tokens              |

## Project Structure

src/<br>
├── controllers/    # Route handlers<br>
├── middlewares/    # Auth, upload, error handler, validation<br>
├── models/         # Mongoose schemas (User, Contact)<br>
├── routes/         # Express routes<br>
├── services/       # Email service<br>
├── helpers/        # HttpError, sendEmail, ctrlWrapper<br>
├── public/avatars  # Temporary upload folder<br>
├── swagger.json    # OpenAPI spec<br>
app.js              # Express app setup<br>
server.js           # Entry point<br>
<br>


## Environment Variables (.env)

```env
PORT=3000

MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/db-contacts

JWT_SECRET=your-super-secret-jwt-key
BASE_URL=https://nodejs-hw-mongodb-volodymyrkoz.onrender.com

# Cloudinary
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (used for verification & password reset)
SENDGRID_API_KEY=SG.xxxx (or any SMTP service)
SENDER_EMAIL=no-reply@homeaway.com
