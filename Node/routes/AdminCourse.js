module.exports = (app) => {
    var express = require("express");
    const Course = require("../models/AdminCourse");
    const User = require('../models-auth/User');
    app.get("/allcourses", async function (req, res, next) {
      await Course.find(function (err, data) {
        if (err) {
          console.log(err);
        }
        res.json(data);
      });
    });
  
    // GET event by id
    app.get("/blitzcourse/:id", async function (req, res, next) {
      var id = req.params.id;
      await Course.findById(id, function (err, data) {
        if (err) {
          console.log(err);
        }
        res.json(data);
      });
    });
  
    // add event
    app.post("/blitzcourse/add", async function (req, res) {
      var course = new Course();
      course.title = req.body.title;
      course.field = req.body.field;
      course.description = req.body.description;
      course.tags = req.body.tags;
      course.selectedFile = req.body.selectedFile;
      course.likeCount = req.body.likeCount;
      course.createdAt = req.body.createdAt;
      course.quiz = req.body.quiz;
      course.numberOfEnrolls = req.body.numberOfEnrolls;
      course.tutorName = req.body.tutorName;
      course.tutorDetails = req.body.tutorDetails;
      //res.send(req.body);
      try {
        var courselog = await course.save();
        console.log(courselog);
        console.log("added");
        res.send("course added");
      } catch (err) {
        console.log(err);
      }
    });
  
    // delete event
    app.delete("/blitzcourse/delete/:id", async function (req, res) {
      var id = req.params.id;
      await Course.findByIdAndRemove(id, function (err, doc) {
        if (err) {
          console.log(err);
        }
        res.send("course removed");
      });
    });
  
    // modify event
    app.put("/blitzcourse/modify/:id", async function (req, res) {
      var id = req.params.id;
      await Course.findByIdAndUpdate(id, { $set: req.body }, function (err, doc) {
        if (err) {
          console.log(err);
        }
        res.send("course updated");
        console.log(doc);
      });
    });
    app.put("/enroll/:idUser/:idCourse", async function (req, res) {
      const filter = req.params.idUser;
      const idCourse = {
        $set: {
          courses:
          req.params.idCourse,
        },
      };
      await User.updateOne({"_id":req.params.idUser}, idCourse , function (err, doc) {
        if (err) {
          console.log(err);
        }
        console.log(doc);
      });
    });
    
  };
  