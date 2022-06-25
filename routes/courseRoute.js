const express = require('express');
const courseController = require("../controllers/courseController");
const router = express.Router();

router.route("/").post(courseController.createCourse).get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);

module.exports = router