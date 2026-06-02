Markdown
# 🛒 ShopStream — Full-Stack E-Commerce Platform

ShopStream is a comprehensive MNE (MongoDB, Node.js, Express, React) full-stack e-commerce application. It features secure user authentication, role-based access controls, dynamic product catalogs, automated image management via Cloudinary, and a fully functional persistent shopping cart system.

---

## 🚀 Tech Stack

| Layer | Technology Used | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | Component-based, fast user interface with HMR |
| **Backend** | Node.js, Express.js | RESTful API architecture and request handling |
| **Database** | MongoDB & Mongoose | Schemaless document storage and data modeling |
| **Auth** | JSON Web Tokens (JWT) | Secure, stateless user sessions and route guarding |
| **Media** | Cloudinary API | Cloud storage and delivery optimization for product images |

---

## 🛠️ Core Features

* **Secure Authentication**: User registration and login protected by cryptographically hashed passwords and JWT delivery.
* **Role-Based Authorization (RBAC)**: Distinct permissions for `admin` users (full CRUD access to product inventory) and standard `customer` users (browsing and checkout capabilities).
* **Inventory Management Dashboard**: Dedicated administrative layout to create, read, update, and permanently delete product items.
* **Persistent Cart Lifecycle**: Dynamic cart tracking tied directly to individual user accounts in MongoDB.

---

## 💻 Local Installation & Quick Start

Follow these steps to clone, configure, and boot up both the frontend client and the backend API server on your local environment.

### 1. Clone the Project
```bash
git clone [https://github.com/AnanyaTulaskar1/VeloceMarket.git](https://github.com/AnanyaTulaskar1/VeloceMarket.git)
cd VeloceMarket
* **. Backend Configurations (shopstream-backendd)
Navigate into the backend directory, initialize dependencies, and set up your private environment keys.

* * *Bash
cd shopstream-backendd
npm install
Create a brand new file named .env inside the root of the shopstream-backendd/ directory. Populate it with the structural keys below:

* **Code snippet
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_custom_jwt_secret_signing_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
💡 # Note for Reviewers: A .env.example template is provided directly in the directory for convenient reference.

# Once configured, boot up the local Express gateway server:

* ** Bash
npm start

* ** Frontend Client Setup (shopstream-frontend)
Open a secondary terminal workspace tab, navigate to the React interface workspace, install its modules, and launch the Vite development server.

* ** Bash
cd ..
cd shopstream-frontend
npm install
npm run dev
# ##The local client server will initialize. Open your browser and point your URL address bar directly to http://localhost:5173.

* ** Primary REST API Blueprint
HTTP Method	Route Endpoint	Purpose / Utility	Access Layer
POST	/api/auth/register	Signs up a new customer account	Public
POST	/api/auth/login	Validates credentials and passes JWT	Public
GET	/api/products	Pulls down complete active catalog	Public
POST	/api/products	Publishes a new entry into database	Private (Admin Only)
GET	/api/cart	Pulls authenticated user's cart state	Private (Customer)
DELETE	/api/cart/:id	Discards an analytical entry from cart	Private (Customer)


Repository Directory Architecture
Plaintext
* ** VeloceMarket/
├── shopstream-backendd/     # Express API Engine & Database schemas
│   ├── config/              # Databases and Third-Party API connection handlers
│   ├── models/              # Mongoose data definitions (User, Product, Cart)
│   ├── routes/              # Express isolated API routers
│   ├── .env.example         # Variable structural configuration example
│   └── server.js            # Main application initialization point
├── shopstream-frontend/    # React/Vite Client UI Components
│   ├── src/
│   │   ├── components/      # Global shared interface components
│   │   ├── pages/           # Layout viewpoints (Shop, Cart, Dashboard Admin)
│   │   └── App.jsx          # Component routing tree configuration
└── .gitignore               # Main root repository blocking system

* ** Changes implemented:
* **Fixed Headers:** Converted broken segments like `---##` into beautifully spaced lines.
* **Code Blocks:** Re-wrapped loose bash scripts and the `.env` contents inside proper Markdown code block wrappers.
* **Table Layout:** Organized the API blueprint section into a cleanly parsed Markdown table.
* **Removed Extra Explanations:** Extraneous advice blocks were dropped so recruiters only see clean documentation.