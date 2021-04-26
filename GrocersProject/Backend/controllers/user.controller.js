let UserModel = require("../models/user.model.js");

//Retrieve all user details
let getUserDetails = (req, res) => {
  UserModel.find({}, (err, result) => {
    if (!err) {
      res.json(result);
    }
  });
};

/* let getUserById = (req,res)=> {
    
    let pid = req.params.pid;       //passing id through path param 
    
    UserModel.find({_id:pid},(err,data)=> {
        if(!err){
            res.json(data);         // return array 
            //res.json(data[0])     // return only one object 
        }
    })
} */

let signUpUserDetails = (req, res) => {
  let user = new UserModel({
    isLocked: false,
    loginTries: 3,
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    pWord: req.body.pWord,
    phoneNum: req.body.phoneNum,
    dob: req.body.dob,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    funds: 100,
    actNum: req.body.actNum,
    balance: 10000,
    Orders: [
      {
        id: "",
        name: "",
        quantity: 0,
      },
    ],
  });

  user.save((err, result) => {
    if (!err) {
      res.send("Record stored successfully ");
      //res.json({"msg":"Record stored successfully"})
    } else {
      res.send(err + " Record didn't store ");
    }
  });
};

let signInUser = (req, res) => {
  let uEmail = req.body.email; //passing id through path param
  let uPassword = req.body.pWord;

  // Looking for the user through email
  UserModel.find({ email: uEmail }, (err, data) => {
    if (!err) {
      // If no initial err, then check if the user input email is found
      // If not found then user does not exist, no need to lock the
      // potential user out
      if (data.length == 0) {
        res.send("Email not found: " + data);
      }

      // If the email id exists in the db, then proceed to check the inputed
      // password
      else {
        // Looking for the user inputed password
        UserModel.find({ pWord: uPassword }, (errP, dataP) => {
          if (!errP) {
            // If the password is not found, then the user probably input
            // the password wrong, three trials begin for the user with the
            // correct email id
            if (dataP.length == 0) {
              // Check if the user with the inputed email id is locked out if not and the
              // inputed password is incorrect, then decrement their number of tries
              // if the number of tries associated with the email id reaches 0, then lock that account
              if (data[0].isLocked == false) {
                if (data[0].loginTries > 0) {
                  res.send(
                    "Incorrect Password! " + data[0].loginTries + " tries left!"
                  );
                  let tempLoginTries = data[0].loginTries;
                  tempLoginTries--;
                  UserModel.updateOne(
                    { email: uEmail },
                    { $set: { loginTries: tempLoginTries } },
                    (err, result) => {}
                  );
                } else {
                  res.send(
                    "Your number of tries depleted. You are locked out! Raise ticket!"
                  );
                  UserModel.updateOne(
                    { email: uEmail },
                    { $set: { isLocked: true } },
                    (err, result) => {}
                  );
                }
              } else {
                res.send("You are locked out! Raise ticket!");
              }
            }

            // User input correct credentials, proceed forward
            else {
              // Reset the user's number of tries, once they login correctly
              UserModel.updateOne(
                { email: uEmail },
                { $set: { loginTries: 3 } },
                (err, result) => {}
              );
              res.json(dataP);
            }
          } else {
            res.send("Finding Error: " + err);
          }
        });
        //res.send("Data is: " + data);
      }
    } else {
      res.send("Finding Error: " + err);
    }
  });
};

let editProfile = (req, res) => {
  let id = req.body.id;
  let phone = req.body.phone;
  let password = req.body.password;
  let state = req.body.state;
  let city = req.body.city;
  let street = req.body.street;
  let zip = req.body.zip;
  let email = req.body.email;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let newString = "UPDATES: ";
  phone = phone.trim();
  password = password.trim();
  state = state.trim();
  city = city.trim();
  street = street.trim();
  email = emial.trim();
  fname = fname.trim();
  lname = lname.trim();

  if (phone != "") {
    UserModel.updateOne(
      { email: id },
      { $set: { phoneNum: phone } },
      (err, result) => {
        if (!err) {
          if (result.nModified > 0) {
            newString += " Phone updated! ";
          }
        }
      }
    );
  }

  if (password != "") {
    UserModel.updateOne(
      { email: id },
      { $set: { pWord: password } },
      (err, result) => {
        if (!err) {
          if (result.nModified > 0) {
            newString += " Password updated! ";
          }
        }
      }
    );
  }

  if (state != "") {
    UserModel.updateOne(
      { email: id },
      { $set: { state: state } },
      (err, result) => {
        if (!err) {
          if (result.nModified > 0) {
            newString += " State updated! ";
          }
        }
      }
    );
  }

  if (city != "") {
    UserModel.updateOne(
      { email: id },
      { $set: { city: city } },
      (err, result) => {
        if (!err) {
          if (result.nModified > 0) {
            newString += " City updated! ";
          }
        }
      }
    );
  }

  if (street != "") {
    UserModel.updateOne(
      { email: id },
      { $set: { street: street } },
      (err, result) => {
        if (!err) {
          if (result.nModified > 0) {
            newString += " Street updated! ";
          }
        }
      }
    );
  }

  if (email != "") {
    UserModel.updateOne(
      { email: id },
      { $set: { email: email } },
      (err, result) => {
        if (!err) {
          if (result.nModified > 0) {
            newString += " Email updated! ";
          }
        }
      }
    );
  }

  if (lname != "") {
    UserModel.updateOne(
      { email: id },
      { $set: { lname: lname } },
      (err, result) => {
        if (!err) {
          if (result.nModified > 0) {
            newString += " Last name updated! ";
          }
        }
      }
    );
  }

  if (fname != "") {
    UserModel.updateOne(
      { email: id },
      { $set: { fname: fname } },
      (err, result) => {
        if (!err) {
          if (result.nModified > 0) {
            newString += " First Name updated! ";
          }
        }
      }
    );
  }

  if (zip != null) {
    UserModel.updateOne(
      { email: id },
      { $set: { zip: zip } },
      (err, result) => {
        if (!err) {
          if (result.nModified > 0) {
            newString += " Zip updated! ";
          }
        }
      }
    );
  }

  res.send(newString);
};

// done before doing a checkout. make sure user has enough money to buy
// return how much money would be left
let checkProperFunds = (req, res) => {
  let id = req.body.id;
  let cost = req.body.cost;

  UserModel.find({ email: id }, (err, result) => {
    if (!err) {
      console.log("Result:", result);
      console.log(result.funds);
      if (result[0].funds > cost) {
        let newFunds = {};
        newFunds.fund = result[0].funds - cost;
        newFunds.approved = true;
        newFunds.error = "";
        res.json(newFunds);
      } else {
        let errorObj = { fund: 0, error: "not enough funds", approved: false };
        res.json(errorObj);
      }
    } else {
      res.send("couldnt find record in checkproper funds");
    }
  });
};

// user is checkoing out and there has already been a check to make sure there is enough money to buy
let checkout = (req, res) => {
  let userID = req.body.user;
  let newFunds = req.body.newFunds;
  let newString = "";

  let orderObj = {
    id: 134,
    products: req.body.products, // array of product names,
    cost: req.body.cost,
    status: "bought",
  };

  UserModel.updateOne(
    { email: userID },
    { $set: { funds: newFunds } },
    (err, result) => {
      if (!err) {
        if (result.nModified > 0) {
          newString += "Updated funds in User. ";
        } else {
          res.send("record was not found in checkout");
        }
      } else {
        res.send("error occured in checkolut");
      }
    }
  );

  UserModel.updateOne(
    { email: userID },
    { $push: { Orders: orderObj } },
    (err, result) => {
      if (!err) {
        if (result.nModified > 0) {
          newString += "Order added to user. ";
        } else {
          res.send("record was not found in checkout");
        }
      } else {
        res.send("error occured in checkolut");
      }
    }
  );

  res.send(newString);
};

let getSingleUser = (req, res) => {
  let userID = req.params.id;

  UserModel.find({ email: userID }, (err, result) => {
    if (!err) {
      res.send(result[0].json);
    } else {
      res.send("User doesnt exits");
    }
  });
};

let updateFunds = (req, res) => {
  let id = req.body.id;
  let account = req.body.account;
  let amount = req.body.amount;

  UserModel.find({ email: id, actNum: account }, (err1, result1) => {
    if (!err1) {
      // we have the right user with account
      if (result1[0].balance > amount) {
        // subtract from balance and add to funds
        let newBalance = result1[0].balance - amount;
        let newFunds = result1[0].funds + amount;
        UserModel.updateOne(
          { email: id, actNum: account },
          { $set: { balance: newBalance, funds: newFunds } },
          (err2, result2) => {
            if (!err2) {
              if (result2.nModified > 0) {
                let obj = { approved: true };
                res.json(obj);
              } else {
                res.send("couldnt find account");
              }
            } else {
              res.send("error occured in checkaccount number 2");
            }
          }
        );
      } else {
        res.send(
          "You dont have enough money in your balance to do this transfer"
        );
      }
    } else {
      res.send("The account is wrong for user");
    }
  });
};

/* let deleteProductById= (req,res)=> {
    let pid = req.params.pid;
    UserModel.deleteOne({_id:pid},(err,result)=> {
        if(!err){
                if(result.deletedCount>0){
                    res.send("Record deleted successfully")
                }else {
                    res.send("Record not present");
                }
        }else {
            res.send("Error generated "+err);
        }
    })

}

let updateProductPrice= (req,res)=> {
    let pid = req.body.pid;
    let updatedPrice = req.body.price;
    UserModel.updateMany({_id:pid},{$set:{price:updatedPrice}},(err,result)=> {
        if(!err){
            if(result.nModified>0){
                    res.send("Record updated succesfully")
            }else {
                    res.send("Record is not available");
            }
        }else {
            res.send("Error generated "+err);
        }
    })

} */

//module.exports={getProductDetails,getProductById,storeProductDetails,deleteProductById,updateProductPrice}

module.exports = {
  getUserDetails,
  signUpUserDetails,
  signInUser,
  checkout,
  checkProperFunds,
  getSingleUser,
  editProfile,
  updateFunds,
};
