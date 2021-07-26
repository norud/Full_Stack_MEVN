import models from "../models"; //call index as default
import bcrypt from "bcryptjs";
import token from "../services/Token";
import commonService from "../services/CommonService";

export default {
  add: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);

      const record = await models.User.create(req.body);
      res.status(200).json(record);
    } catch (e) {
      res.status(500).send({
        status: 500,
        message: "Something went wrong",
        descriptions: e,
      });
      next(e);
    }
  },
  queryById: async (req, res, next) => {
    try {
      const record = await models.User.findOne(
        {
          _id: req.query._id,
          deletedAt: null,
        },
        {
          password: 0, //dont show
        }
      );
      if (!record) {
        res.status(400).send({
          message: "User not found",
          descriptions: e,
        });
      } else {
        res.status(200).json(record);
      }
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong",
        descriptions: e,
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      let q = req.query.condition;
      //$or:[{'name':RegExp(q,'i')}, {'description':RegExp(q,'i')}] = search where  name and description like q
      const record = await models.User.find(
        {
          $or: [{ name: RegExp(q, "i") }, { email: RegExp(q, "i") }],
          deletedAt: null,
        },
        {
          password: 0, //dont show
        }
      ).sort({ name: 1 }); //desc = -1, asc = 1
      if (Object.entries(record).length === 0) {
        res.status(200).send({
          message: "There is not records",
          descriptions: "Make sure you already have created some records",
        });
      } else {
        res.status(200).json(record);
      }
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong",
        descriptions: e,
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      //check if password is not empty and is different from DB
      let password_req = req.body.password;
      if (
        !commonService.isEmpty(password_req) &&
        !commonService.isEmpty(req.body._id)
      ) {
        //find the user
        const validate_to_change = await models.User.findOne({
          _id: req.body._id,
        });
        //commprate password
        if (password_req != validate_to_change.password) {
          req.body.password = await bcrypt.hash(password_req, 10);
        }
      }

      //verify empty fileds
      const updatedFields = {};
      Object.keys(req.body).forEach((key) => {
        if (!commonService.isEmpty(req.body[key])) {
          if (key != "_id" || key != "password") {
            updatedFields[key] = req.body[key];
          }
        }
      });

      const record = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        {
          $set: updatedFields,
          updatedAt: Date.now(),
        }
      ); //first where, second values to update
      res.status(200).json(record);
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong",
        descriptions: e,
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const record = await models.User.findByIdAndUpdate(
        { _id: req.body._id, deletedAt: null },
        { status: 0, updatedAt: Date.now(), deletedAt: Date.now() }
      ); //first where, second values to update
      res.status(200).json(record);
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong",
        descriptions: e,
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const record = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        { status: 1, updatedAt: Date.now(), deletedAt: null }
      ); //first where, second values to update
      res.status(200).json(record);
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong",
        descriptions: e,
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const record = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        { status: 0, updatedAt: Date.now() }
      ); //first where, second values to update
      res.status(200).json(record);
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong",
        descriptions: e,
      });
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      let user = await models.User.findOne({
        email: req.body.email,
        status: 1, //will be optional
        //deletedAt: null
      });

      if (user) {
        //check if user is active
        if (user.status == 0) {
          res.status(404).send({
            status: 404,
            message: "Your user is inactive",
            descriptions:
              "Please active your account or contact technical support",
          });
        } else if (user.deletedAt != null) {
          //check if not deleted
          res.status(404).send({
            status: 404,
            message: "Your user was deleted",
            descriptions: "Please contact technical support",
          });
        } else {
          let match_password = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (match_password) {
            //make token
            let user_token = await token.encode(user._id, user.rol, user.email);
            res.status(200).json({ user, user_token });
          } else {
            res.status(404).send({
              status: 404,
              message: "Password incorrect",
              descriptions: "Check the information and try again",
            });
          }
        }
      } else {
        res.status(404).send({
          message: "User isn't registered",
          descriptions: "Check the information and try again",
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong",
        descriptions: e,
      });
      next(e);
    }
  },
};
