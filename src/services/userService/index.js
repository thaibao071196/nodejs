import db from "../../models";
import bcrypt from "bcryptjs";

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExits = await checkUserEmail(email, password);

      if (isExits) {
        const user = await db.User.findOne({
          where: {
            email,
          },
          attributes: ["email", "password", "roleId"],
          raw: true,
        });

        if (user) {
          const isCheckCorrectPassword = await bcrypt.compareSync(
            password,
            user.password
          );

          if (isCheckCorrectPassword) {
            delete user.password;

            resolve({
              errCode: 0,
              message: "OK",
              user,
            });
          } else {
            resolve({
              errCode: 1,
              message: "wrong password",
            });
          }
        } else {
          resolve({
            errCode: 1,
            message: "your email isnt exits",
          });
        }
      } else {
        resolve({
          errCode: 1,
          message: "your email isnt exits",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const userService = { handleUserLogin };
