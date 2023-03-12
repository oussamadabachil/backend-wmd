const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const connectionString = "mongodb+srv://djoussama2000:lljclFgg0HJkaQ8P@cluster0.mco0xji.mongodb.net/walouMaydi3";
mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
