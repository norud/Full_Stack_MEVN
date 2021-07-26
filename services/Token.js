import jwt from "jsonwebtoken";
import models from "../models";

async function checkToken(token) {
  let __id = null;
  let __rol = null;
  let __email = null;
  try {
    const { _id, rol, email } = await jwt.decode(token);
    __id = _id;
    __rol = rol;
    __email = email;
  } catch (error) {
    //token is not valide
    return false;
  }
  const user = await models.User.findOne({ _id: __id, status: 1 });
  if (user) {
    const token = jwt.sign(
      { _id: __id, rol: __rol, email: __email },
      "jwt_secr3t-2121+h3lp1ng",
      {
        expiresIn: "1d",
      }
    );
    return { token, rol: user.rol };
  } else {
    return false;
  }
}

export default {
  encode: async (_id, rol, email) => {
    const token = jwt.sign(
      { _id: _id, rol: rol, email: email },
      "jwt_secr3t-2121+h3lp1ng",
      { expiresIn: "1d" }
    ); //we can change for 1m, 1h
    return token;
  },
  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, "jwt_secr3t-2121+h3lp1ng"); //{}to get only the parameters inside
      const user = await models.User.findOne({ _id, status: 1 });

      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (error) {
      //we check if token is valid
      const new_token = await checkToken(token);
      return new_token;
    }
  },
};
