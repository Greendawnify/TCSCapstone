let RequestModel = require("../models/request.model");

let createRequest = (req, res) => {
  let request = new RequestModel({
    type: req.body.type,
    description: req.body.description,
  });

  request.save((err, result) => {
    if (!err) {
      res.send("Request added");
    } else {
      res.send("Request didnot get saved");
    }
  });
};

let getAllRequests = (req, res) => {
  RequestModel.find({}, (err, result) => {
    if (!err) {
      res.json(result);
    }
  });
};

module.exports = { createRequest, getAllRequests };
