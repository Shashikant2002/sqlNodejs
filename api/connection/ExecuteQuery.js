import myConnection from "./SqlConnection.js";

const ExeQuery = async (query) => {
  return new Promise((resolve, reject) => {
    try {
      myConnection.query(query, function (err, result) {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default ExeQuery;
