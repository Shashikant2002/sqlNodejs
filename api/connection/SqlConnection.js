import mysql2 from "mysql2";

let myConnection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "fullStackTest",
});

myConnection.connect((err) => {
  if (err) {
    console.log("Sql Error: ", err?.message);
  } else {
    console.log("Connection Created Successfull !!");
  }
});

export default myConnection;
