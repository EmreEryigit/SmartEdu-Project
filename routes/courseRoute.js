const express = require("express");
const courseController = require("../controllers/courseController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();
//    /courses/*
router
  .route("/")
  .post(roleMiddleware(["teacher", "admin"]), courseController.createCourse)
  .get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse).delete(courseController.deleteCourse).put(courseController.updateCourse);
router.route("/enroll").post(courseController.enrollCourse);
router.route("/release").post(courseController.releaseCourse);

module.exports = router;
