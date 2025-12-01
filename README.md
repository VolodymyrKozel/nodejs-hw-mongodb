# Node.js Homework – MongoDB (REST API + Mongoose)

This is a complete Node.js backend project built as part of a homework assignment to master **MongoDB** and **Mongoose** in a real-world-like REST API.

The app is a **Contacts Management API** with full CRUD, authentication, avatar upload, email verification, and password recovery.

**Live API:**  
[![Live API](https://img.shields.io/badge/Live_API-000000?style=for-the-badge&logo=render&logoColor=white)](https://contact-app-backend-mh5h.onrender.com)

**API Documentation (Swagger):**  
[![Swagger Docs](https://img.shields.io/badge/Swagger_Docs-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://contact-app-backend-mh5h.onrender.com/api-docs)

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
API_KEY=
API_SECRET=
APP_DOMAIN=
CLOUD_NAME=
ENABLE_CLOUDINARY=
JWT_SECRET=
MONGODB_DB=
MONGODB_PASSWORD=
MONGODB_URL=
MONGODB_USER=
PORT=
SMTP_FROM=
SMTP_HOST=
SMTP_PASSWORD=
SMTP_PORT=
SMTP_USER=

GOOGLE_AUTH_CLIENT_ID=
GOOGLE_AUTH_CLIENT_SECRET=

