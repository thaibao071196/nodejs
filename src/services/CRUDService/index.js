import bcrypt from "bcryptjs";
import db from "../../models/index";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) =>
  new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });

const createNewUser = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const hashPasswordUserFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordUserFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });

      resolve("create new user success!");
    } catch (e) {
      reject(e);
    }
  });

export const CRUDService = { createNewUser };
