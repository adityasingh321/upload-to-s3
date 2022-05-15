const multer = require("multer");
const path = require("path");

const loading = multer({ dest: "uploads/" });
const fs = require("fs");

var storage = multer.memoryStorage({
    destination: function (req, file, cb) {
      fs.readdirSync(`uploads/`).forEach((file) => {
        fs.unlinkSync(`uploads/${file}`);
      });
      cb(null, `uploads/`);
    },
  
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  var upload = multer({
    storage: storage,
  
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      console.log(req.body);
      if (ext !== ".csv" && ext !== ".CSV") {
        return callback(new Error("Only .csv files can be uploaded"));
      }
      callback(null, true);
    },
  });

  module.exports = {upload}

