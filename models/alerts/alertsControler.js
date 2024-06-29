const alertSchema = require('./alertsSchema');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single('image');

// Create Alerts
const createalert = async (req, res) => {
    const { title, datetime, description, category, location, immediateneeds, severity } = req.body;

    try {
      const newAlert = new alertSchema({
        title,
        datetime,
        description,
        category,
        location,
        immediateneeds,
        severity,
        image: req.file,
      });

      await newAlert.save();

      res.status(200).json({
        status: 200,
        msg: 'Alert created successfully.',
        data: newAlert,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        msg: 'Error creating alert.',
        error: error.message,
      });
    }
};

module.exports = {
  createalert,
  upload,
};
