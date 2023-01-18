import mongoose from "mongoose";
const connectionString = "mongodb://localhost:27017/your_db_name";
mongoose.connect(connectionString, { useNewUrlParser: true });
const User = mongoose.model("User", { name: String });
const newUser = new User({ name: "John Doe" });
newUser.save();
