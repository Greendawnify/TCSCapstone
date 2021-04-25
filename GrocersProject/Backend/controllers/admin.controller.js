let AdminModel = require("../models/admin.model");

let addAdmin = (req, res) => {
  let admin = new AdminModel({
    id: req.body.id,
    password: req.body.password,
    report: "none",
  });

  admin.save((err, result) => {
    if (!err) {
      res.send("Record stored succesfullyu");
    } else {
      res.send("record didn't send");
    }
  });
};

let checkCredentials = (req, res) => {
  let checkID = req.params.id;
  let checkPassword = req.params.password;

  AdminModel.find({ id: checkID, password: checkPassword }, (err, result) => {
    if (!err) {
      res.json(result);
      res.send("Found Admin");
    } else {
      res.send("Didn't find Admin");
    }
  });
};

module.exports = { addAdmin, checkCredentials };
