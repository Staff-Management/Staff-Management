const mongoose = require("mongoose");
const uri =
"mongodb+srv://HRApp:StaffManagement@staff-management.hn7vc.mongodb.net/Staff-Management?authSource=admin&replicaSet=atlas-tvkrha-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      return console.log(error);
    }
    console.log("connect to db");
  }
);
