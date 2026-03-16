const express = require("express");
const app = express();

const connection = require("./config/db");
const carSchema = require("./model/carSchema");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/"));
app.use(express.json());

const HOST = "127.0.0.1";
const PORT = 3000;

app.get("/addCar", (req, res) => {
  res.render("addCar.ejs");
});

app.get("/", async (req, res) => {
  try {
    const result = await carSchema.find();
    const obj = { data: result };
    res.render("Dashboard.ejs", obj);
  } catch (error) {
    res.render("ServerError.ejs");
    console.log(error);
  }
});

// ****************************************************************
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/upload/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// ******************************************************************
app.post("/saveCar", upload.single("carImage"), async (req, res) => {
  try {
    const carImage = req.file.filename;
    const {
      carName,
      brand,
      model,
      year,
      price,
      fuelType,
      transmission,
      mileage,
      colors,
      engine,
      seatingCapacity,
      isAvailable,
    } = req.body;
    const result = new carSchema({
      carName,
      brand,
      model,
      year,
      price,
      fuelType,
      transmission,
      mileage,
      colors,
      engine,
      seatingCapacity,
      isAvailable,
      carImage,
    });
    await result.save();
    res.redirect("/");
  } catch (error) {
    res.render("ServerError.ejs");
    console.log(error);
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await carSchema.findById(id);
    const car = { data: result };
    console.log(car);
    res.render("editCar.ejs", car);
  } catch (error) {
    res.render("ServerError.ejs");
    console.log(error);
  }
});

app.post("/update/:id", upload.single("carImage"), async (req, res) => {
  try {
    const id = req.params.id;

    const {
      carName,
      brand,
      model,
      year,
      price,
      fuelType,
      transmission,
      mileage,
      colors,
      engine,
      seatingCapacity,
      isAvailable,
    } = req.body;

    let updateData = {
      carName,
      brand,
      model,
      year,
      price,
      fuelType,
      transmission,
      mileage,
      colors,
      engine,
      seatingCapacity,
      isAvailable,
    };

    if (req.file) {
      updateData.carImage = req.file.filename;
    }

    await carSchema.findByIdAndUpdate(id, updateData);

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("ServerError.ejs");
  }
});

const fs = require("fs");

app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const car = await carSchema.findById(id);

    fs.unlinkSync("public/upload/" + car.carImage);

    await carSchema.findByIdAndDelete(id);

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("ServerError.ejs");
  }
});

app.use((req, res) => {
  res.render("404.ejs");
});

app.listen(PORT, HOST, (req, res) => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
