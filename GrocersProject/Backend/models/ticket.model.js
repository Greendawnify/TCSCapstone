let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let TicketSchema = mongoose.Schema({
  id: String,
  firstname: String,
  lastname: String,
  email:String,
  username:String,
  resolve:Boolean
});

let TicketModule;

try {
  TicketModule = mongoose.model("ticket");
} catch {
  TicketModule = mongoose.model("ticket", TicketSchema);
}

module.exports = TicketModule;
