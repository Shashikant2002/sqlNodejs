import bcrypt from "bcrypt";

export const bcryptPassword = async (pass) => {
  return await bcrypt.hash(pass, 10);
};

export const comparePassword = async (inputPass, dbPass) => {
  return await bcrypt.compare(inputPass, dbPass);
};
