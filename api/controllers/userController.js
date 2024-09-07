import ExeQuery from "../connection/ExecuteQuery.js";
import CatchAsyncHandeler from "../utils/CatchAsyncHandeler.js";
import ErrorHandeler from "../utils/ErrorHandaler.js";
import { bcryptPassword } from "../utils/Password.js";
import {
  deleteUserByUserIdValidation,
  findUserByUserIdValidation,
  registerUserValidation,
  updateIDUserByUserIdValidation,
  updateUserByUserIdValidation,
} from "./Validations/UserValidation.js";
import db from "../models/index.js";

export const registerUser = CatchAsyncHandeler(async (req, res, next) => {
  console.log(req.body);

  await registerUserValidation.validateAsync(req.body);

  const { permalink, name, email, phone, password } = req.body;

  const bcryptedPass = await bcryptPassword(password);

  await db.User.create({
    permalink: permalink,
    name: name,
    email: email,
    phone: phone,
    password: bcryptedPass,
  });

  res.status(201).json({
    success: true,
    message: `User Created Successfull !!`,
    data: {
      name,
      email,
      phone,
    },
  });
});

export const getUserByUserID = CatchAsyncHandeler(async (req, res, next) => {
  await findUserByUserIdValidation.validateAsync(req.params);

  console.log(req.params);

  const { userid } = req.params;

  const data = await db.User.findOne({
    where: {
      userid: userid,
    },
    attributes: [
      "userid",
      "permalink",
      "name",
      "email",
      "phone",
      "enabled",
      "deleted",
      "createdat",
      "updatedat",
    ],
  });

  if (!data) {
    return next(new ErrorHandeler("User is not Exiest !!", 404));
  }

  res.status(200).json({
    success: true,
    message: "All Users",
    data: data,
  });
});

export const deleteUserById = CatchAsyncHandeler(async (req, res, next) => {
  await deleteUserByUserIdValidation.validateAsync(req.params);

  console.log(req.params);

  const { userid } = req.params;

  const isExiest = await db.User.findOne({
    where: {
      userid: userid,
    },
    attributes: ["userid"],
  });

  if (!isExiest) {
    return next(new ErrorHandeler("User is Not Exiest !!", 404));
  }

  await db.User.destroy({
    where: {
      userid: userid,
    },
  });

  res.status(200).json({
    success: true,
    message: "User Deleted Successfull !!",
  });
});

export const deleteUserByIdFromListOnly = CatchAsyncHandeler(
  async (req, res, next) => {
    await deleteUserByUserIdValidation.validateAsync(req.params);

    const { userid } = req.params;

    const isExiest = await db.User.findOne({
      where: {
        userid: userid,
      },
      attributes: ["userid", "deleted"],
    });

    if (!isExiest) {
      return next(new ErrorHandeler("User is Not Exiest !!", 404));
    }

    await db.User.update(
      { deleted: !isExiest.deleted },
      {
        where: {
          userid: userid,
        },
      }
    );

    if (isExiest?.deleted) {
      return res.status(200).json({
        success: true,
        message: "Back in List Successfull !!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Remove from list Successfull !!",
    });
  }
);

export const updateUserById = CatchAsyncHandeler(async (req, res, next) => {
  await updateUserByUserIdValidation.validateAsync(req.body);
  await updateIDUserByUserIdValidation.validateAsync(req.params);

  const { userid } = req.params;

  const updateFields = req.body;

  const isExiest = await db.User.findOne({
    where: {
      userid: userid,
    },
    attributes: ["userid"],
  });

  if (!isExiest) {
    return next(new ErrorHandeler("User is Not Exiest !!", 404));
  }

  await db.User.update(updateFields, {
    where: {
      userid: userid,
    },
  });

  res.status(200).json({
    success: true,
    message: "User Updated Successfull !!",
  });
});

export const getAllUsers = CatchAsyncHandeler(async (req, res, next) => {
  const { deleted, enabled, search, limit = 2, page = 1, orderby } = req.query;

  let query = `SELECT userid, permalink, name, email, phone, enabled, deleted, createdat, updatedat FROM users `;
  let countQuery = `SELECT userid FROM users `;

  // Adding Where Part
  if (deleted || enabled || search) {
    query += ` WHERE `;
    countQuery += ` WHERE `;
  }

  //   Search Start Here
  if (search) {
    query += `userid LIKE "%${search}%" OR `;
    query += `name LIKE "%${search}%" OR `;
    query += `email LIKE "%${search}%" OR `;
    query += `permalink LIKE "%${search}%" OR `;
    query += `phone LIKE "%${search}%" AND`;

    countQuery += `userid LIKE "%${search}%" OR `;
    countQuery += `name LIKE "%${search}%" OR `;
    countQuery += `email LIKE "%${search}%" OR `;
    countQuery += `permalink LIKE "%${search}%" OR `;
    countQuery += `phone LIKE "%${search}%" AND`;
  }
  //   Search End Here

  //   Filter Start Here
  if (deleted) {
    query += ` deleted=${deleted == "true" || deleted == "1" ? 1 : 0} AND`;
    countQuery += ` deleted=${deleted == "true" || deleted == "1" ? 1 : 0} AND`;
  }
  if (enabled) {
    query += ` enabled=${enabled == "true" || enabled == "1" ? 1 : 0} `;
    countQuery += ` enabled=${enabled == "true" || enabled == "1" ? 1 : 0} `;
  }
  //   Filter End Here

  if (query.endsWith("AND")) {
    query = query.slice(0, query.length - 3);
  }
  if (countQuery.endsWith("AND")) {
    countQuery = countQuery.slice(0, countQuery.length - 3);
  }

  console.log(countQuery);

  // Checking Order By Start
  if (orderby) {
    query += ` ORDER BY ${orderby}`;
  }
  // Checking Order By End

  // Pagination Start ===========>>>>>>>>>>>>>>>>>>>
  let skip = limit * (page - 1);
  query += ` LIMIT ${limit} OFFSET ${skip}`;
  // Pagination End ===========>>>>>>>>>>>>>>>>>>>

  const [data, totlaCount] = await Promise.all([
    ExeQuery(query),
    ExeQuery(countQuery),
  ]);

  res.status(200).json({
    success: true,
    message: "All Users",
    data: {
      totalCount: totlaCount?.length,
      totalPages: Math.ceil(totlaCount?.length / limit),
      users: data,
    },
  });
});
