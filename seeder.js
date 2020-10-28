const colors = require("colors");
const mongoose = require("mongoose");
const courses_data = require("./test/data/courses_data");
const mentors_data = require("./test/data/mentors_data");

const Course = require("./models/mentors/CourseModel");
const Mentor = require("./models/mentors/MentorModel");
require("dotenv").config();

// DB Config
const db = process.env.MongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const importData = async () => {
  try {
    await Course.deleteMany();
    await Mentor.deleteMany();

    const createdCourses = await Course.insertMany(courses_data);
    const createdMentors = await Mentor.insertMany(mentors_data);
    //console.log(createdCourses);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Course.deleteMany();
    await Mentor.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
