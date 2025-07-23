# ✍️ InkPress - A Blog Platform

InkPress is a full-stack blog platform built using **Node.js**, **Express**, **MongoDB**, and **EJS**, where users can sign up, log in, and create beautiful blog posts. The platform supports editing, deleting, categorizing posts, and adding reviews/comments with star ratings.

---

## 🚀 Features

- ✅ User Authentication & Authorization using **Passport.js**
- 📝 Create, Read, Update, Delete (CRUD) for blog posts
- 🗂️ Blog Categorization
- 💬 Commenting System
- ⭐ Star-based Review System
- 📁 MVC (Model-View-Controller) Project Structure
- 🎨 Clean and Responsive UI using **Bootstrap 5**
- 🧰 MongoDB (via Mongoose) for data handling

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML, CSS, Bootstrap
- **Database:** MongoDB with Mongoose
- **Authentication:** Passport.js
- **Templating Engine:** EJS

---

## 🔐 Authentication Flow

- Users can **register** and **log in** securely
- Only authenticated users can:
  - Create, Edit, or Delete blogs
  - Comment and leave reviews on others' blogs
- Middleware used to protect routes and actions

---

## 📂 Project Structure

InkPress/
│
├── models/ # Mongoose schemas
|    ├── listings.js
|    ├── users.js
|    └── reviews.js

├── views/ # EJS templates
|    ├── includes/
|        ├──flash.ejs
|        ├──footer.ejs
|        ├──navbar.ejs
|    ├── layouts/
|        ├──boilerplate.ejs
|    ├──listings/
|        ├──edit.ejs
|        ├──index.ejs
|        ├──new.ejs
|        ├──show.ejs
|    ├──users/
|        ├──login.ejs
|        ├──signup.ejs
|    ├──error.ejs
├──app.js
├──middleware.js
├──schema.js
├──package-lock.json
├──package.json

