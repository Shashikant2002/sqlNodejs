import app from "./app.js";
import error from "./middleware/error.js";
import db from "./models/index.js";
const PORT = process.env.PORT || 5000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Successfull !!");
  })
  .catch((err) => {
    console.log(err);
  });

// Using Error File
app.use(error);
app.listen(PORT, () => {
  console.log(`Server is Working Fine http://localhost:${PORT}`);
});
