const express = require("express");
const fs = require("fs");
const app = express();

const HOST = "127.0.0.1";
const PORT = 3000;
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));

const carouselSchema = require("./model/carouselSchema");
const connection = require("./config/db");

app.get("/", async (req, res) => {
  const result = await carouselSchema.find();
  const obj = { data: result };
  res.render("home.ejs", obj);
});

app.get("/dashboard", async (req, res) => {
  const result = await carouselSchema.find();
  const obj = { data: result };
  res.render("dashboard.ejs", obj);
});

app.get("/newCrousel", (req, res) => {
  res.render("newCrousel.ejs");
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/saveForm", upload.array("sliderImage"), async (req, res) => {
  try {
    if (!req.files || req.files.length < 3) {
      return res.send("Please upload at least 3 images");
    }

    const { sliderCaption, sliderTitle } = req.body;

    const images = req.files.map((file) => file.filename);

    const result = new carouselSchema({
      sliderTitle,
      sliderCaption,
      sliderImage: images,
    });

    await result.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("ServerError.ejs");
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await carouselSchema.findById(id);
    const obj = { data: result };
    res.render("editCrousel.ejs", obj);
  } catch (error) {
    console.log(error);
    res.render("ServerError.ejs");
  }
});
app.post("/update/:id", upload.array("sliderImage"), async (req, res) => {
  try {
    const id = req.params.id;
    const { sliderTitle, sliderCaption } = req.body;

    if (!sliderTitle || !sliderCaption) {
      return res.send("All fields are mandatory");
    }

    let updateData = {
      sliderTitle,
      sliderCaption,
    };

    if (req.files && req.files.length > 0) {
      if (req.files.length < 3) {
        return res.send("Please upload at least 3 images");
      }

      const images = req.files.map((file) => file.filename);
      updateData.sliderImage = images;
    }

    const result = await carouselSchema.findById(id);
    result.sliderImage.forEach((img) => {
      fs.unlink(`public/uploads/${img}`, () => {});
    });

    await carouselSchema.findByIdAndUpdate(id, updateData);

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("ServerError.ejs");
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await carouselSchema.findById(id);
    result.sliderImage.forEach((img) => {
      fs.unlink(`public/uploads/${img}`, () => {});
    });
    await carouselSchema.findByIdAndDelete(id);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("ServerError.ejs");
  }
});

app.use((req, res) => {
  res.render("404.ejs");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is up http://${HOST}:${PORT}`);
});
