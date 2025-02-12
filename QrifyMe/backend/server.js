const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");

// Import Mongoose models (ensure these modules export in CommonJS format)
const product = require("./model/product.js");
const user = require("./model/user.js");



const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://parrth20:12345678910@cluster0.mrgze.mongodb.net/Product_");
// console.log("Mongodb server started st port 3000")
// Setup uploads directory and multer configuration

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected to MongoDB");
});

// Event listener for connection errors
mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

// Event listener for disconnection
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is disconnected");
});

app.use(express.static("uploads"));

const dir = "./uploads";
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      callback(null, dir);
    },
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now();
      callback(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname).toLowerCase()
      );
    },
  }),
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      // Optionally, pass an error to the callback:
      return callback(new Error("Only .png, .jpg and .jpeg formats are allowed"), false);
    }
    callback(null, true);
  },
});

// Middleware
app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// JWT Authorization Middleware
// this happens in all of the 
app.use("/", (req, res, next) => {
  try {
    // Allow open access to login, register, and root routes
    if (req.path === "/login" || req.path === "/register" || req.path === "/") {
      next();
    } else {
      // Decode JWT token if authorized
      jwt.verify(req.headers.token, "shhhhh11111", (err, decoded) => {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: "User unauthorized!",
            status: false,
          });
        }
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: "Apis",
  });
});

// Login API
app.post("/login", async (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      const data = await user.find({ username: req.body.username });
      if (data.length > 0) {
        console.log("Incoming plain text password:", req.body.password);
        console.log("Stored hash in DB:", data[0].password);
        if (bcrypt.compareSync(req.body.password, data[0].password)) {
          checkUserAndGenerateToken(data[0], req, res);
        } else {
          console.log("Password comparison failed.");
          return res.status(400).json({
            errorMessage: "Username or password is incorrect!",
            status: false,
          });
        }
      } else {
        return res.status(400).json({
          errorMessage: "Username or password is incorrect!",
          status: false,
        });
      }
    } else {
      return res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    console.error("Exception in /login:", e);
    return res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});


// Register API
// Register API
// Register API using async/await
app.post("/register", async (req, res) => {
  console.log("Register endpoint hit. Request body:", req.body);
  try {
    if (req.body && req.body.username && req.body.password) {
      // Use async/await instead of a callback with .find()
      const data = await user.find({ username: req.body.username });
      if (data.length === 0) {
        // Hash the password before saving
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        // Create a new user using the hashed password
        const newUser = new user({
          username: req.body.username,
          password: hashedPassword,
        });

        // Save the new user
        await newUser.save();
        return res.status(200).json({
          status: true,
          title: "Registered Successfully.",
        });
      } else {
        return res.status(400).json({
          errorMessage: `UserName ${req.body.username} Already Exist!`,
          status: false,
        });
      }
    } else {
      return res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    console.error("Exception in /register:", e);
    return res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});



// Helper function to generate JWT token after login
// -----------------------
// Helper function to generate JWT token after login
// -----------------------
const generateToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user: data.username, id: data._id },
      process.env.JWT_SECRET || "shhhhh11111",
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

async function checkUserAndGenerateToken(data, req, res) {
  try {
    const token = await generateToken(data);
    res.json({
      message: "Login Successfully.",
      token: token,
      status: true,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      errorMessage: err.message || err,
    });
  }
}
// JWT Authorization Middleware
app.use((req, res, next) => {
  // Allow public routes if necessary:
  const publicPaths = ["/", "/login", "/register"];
  if (publicPaths.includes(req.path)) {
    return next();
  }
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      errorMessage: "No token provided, user unauthorized!",
      status: false,
    });
  }
  jwt.verify(token, process.env.JWT_SECRET || "shhhhh11111", (err, decoded) => {
    if (err || !decoded || !decoded.user) {
      return res.status(401).json({
        errorMessage: "User unauthorized!",
        status: false,
      });
    }
    req.user = decoded; // Now req.user is available
    next();
  });
});

app.get("/get-product", async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        errorMessage: "User not authorized",
        status: false,
      });
    }
    const query = { "$and": [] };
    query["$and"].push({
      is_delete: false,
      user_id: req.user.id,
    });
    if (req.query && req.query.search) {
      query["$and"].push({
        name: { $regex: req.query.search, $options: "i" },
      });
    }
    const perPage = 5;
    const page = parseInt(req.query.page) || 1;
    const data = await product
      .find(query, { date: 1, name: 1, id: 1, desc: 1, price: 1, discount: 1, image: 1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    const count = await product.find(query).countDocuments();
    return res.status(200).json({
      status: true,
      title: data && data.length > 0 ? "Product retrieved." : "No products found.",
      products: data || [],
      current_page: page,
      total: count,
      pages: Math.ceil(count / perPage),
    });
  } catch (e) {
    console.error("Exception in /get-product:", e);
    return res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

// -----------------------
// PRODUCT HANDLERS (using async/await)
// -----------------------

// Api to add Product
/* Api to add Product */
app.post("/add-product", upload.any(), async (req, res) => {
  try {
    if (
      req.files &&
      req.body &&
      req.body.name &&
      req.body.desc &&
      req.body.price &&
      req.body.discount
    ) {
      // Create new product instance
      let new_product = new product();
      new_product.name = req.body.name;
      new_product.desc = req.body.desc;
      new_product.price = req.body.price;
      new_product.image = req.files[0].filename;
      new_product.discount = req.body.discount;
      new_product.user_id = req.user.id;
      
      // Save using async/await (no callback)
      await new_product.save();
      
      return res.status(200).json({
        status: true,
        title: 'Product Added successfully.'
      });
    } else {
      return res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    console.error("Exception in /add-product:", e);
    return res.status(400).json({
      errorMessage: e.message || 'Something went wrong!',
      status: false
    });
  }
});

// Api to update Product
app.post("/update-product", upload.any(), async (req, res) => {
  try {
    if (
      req.files &&
      req.body &&
      req.body.name &&
      req.body.desc &&
      req.body.price &&
      req.body.id &&
      req.body.discount
    ) {
      const newProduct = await product.findById(req.body.id);
      if (!newProduct) {
        return res.status(400).json({
          errorMessage: "Product not found",
          status: false,
        });
      }

      // If a new file is provided, remove the old file if it exists
      if (req.files[0] && req.files[0].filename) {
        if (newProduct.image) {
          const filePath = `./uploads/${newProduct.image}`;
          try {
            fs.unlinkSync(filePath);
          } catch (unlinkErr) {
            console.error("Error deleting old image file:", unlinkErr);
          }
        }
        newProduct.image = req.files[0].filename;
      }

      // Update other fields
      newProduct.name = req.body.name;
      newProduct.desc = req.body.desc;
      newProduct.price = req.body.price;
      newProduct.discount = req.body.discount;

      await newProduct.save();
      return res.status(200).json({
        status: true,
        title: "Product updated.",
      });
    } else {
      return res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    console.error("Exception in /update-product:", e);
    return res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

// Api to delete Product
app.post("/delete-product", async (req, res) => {
  try {
    if (req.body && req.body.id) {
      const updatedProduct = await product.findByIdAndUpdate(
        req.body.id,
        { is_delete: true },
        { new: true }
      );
      if (updatedProduct && updatedProduct.is_delete) {
        return res.status(200).json({
          status: true,
          title: "Product deleted.",
        });
      } else {
        return res.status(400).json({
          errorMessage: "Failed to delete product.",
          status: false,
        });
      }
    } else {
      return res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    console.error("Exception in /delete-product:", e);
    return res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

// Api to get and search Product with pagination
app.get("/get-product", async (req, res) => {
  try {
    const query = { "$and": [] };
    query["$and"].push({
      is_delete: false,
      user_id: req.user.id,
    });

    if (req.query && req.query.search) {
      query["$and"].push({
        name: { $regex: req.query.search },
      });
    }

    const perPage = 5;
    const page = req.query.page || 1;

    const data = await product
      .find(query, {
        date: 1,
        name: 1,
        id: 1,
        desc: 1,
        price: 1,
        discount: 1,
        image: 1,
      })
      .skip((perPage * page) - perPage)
      .limit(perPage);

    const count = await product.find(query).countDocuments();

    if (data && data.length > 0) {
      return res.status(200).json({
        status: true,
        title: "Product retrieved.",
        products: data,
        current_page: page,
        total: count,
        pages: Math.ceil(count / perPage),
      });
    } else {
      return res.status(400).json({
        errorMessage: "There is no product!",
        status: false,
      });
    }
  } catch (e) {
    console.error("Exception in /get-product:", e);
    return res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

// Start the server on port 2000
app.listen(3000, () => {
  console.log("Server is Running On port 3000");
});
