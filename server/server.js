const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const multer = require('multer');
const fs = require("fs");


hbs.registerPartials(__dirname + '/views/partials', function(err) {});

// env file config
const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Route for user registration and authentication
app.use("/api/register", require("./routes/userRoutes"));

// Error handling middleware
app.use(errorHandler);

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');

// Define storage for multer to save files to disk in the "uploads" folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');  // Make sure the 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ROUTES BELOW
app.get('/', (req, res) => {
  res.send("Working");
});

app.get("/home", (req, res) => {
  res.render("home", { username: 'Palak' });
});

app.get("/allusers", (req, res) => {
  res.render("users", {
    usersp: [
      { id: 1, username: "abc", age: 18 },
      { id: 2, username: "xyz", age: 19 }
    ]
  });
});

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/home");
  // req.file is the avatar file
  // req.body will hold the text fields, if there were any
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// New route to display images
app.get("/images", (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res.status(500).send("Error loading images.");
    }
    1

    const images = files.filter(file => {
      return file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png") || file.endsWith(".gif");
    });

    res.render("images", { images });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
