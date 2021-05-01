import models from "../models"; //call index as default
import commonService from "../services/CommonService";

export default {
  add: async (req, res, next) => {
    try {
      
      const record = await models.People.create(req.body);
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
      const record = await models.People.findOne(
        {
          _id: req.query._id,
          deletedAt: null,
        }
      );
      if (!record) {
        res.status(400).send({
          message: "Info not found",
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
      const record = await models.People.find(
        {
          $or: [{ name: RegExp(q, "i") }, { email: RegExp(q, "i") }],
          deletedAt: null,
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
  listCustomer: async (req, res, next) => {
    try {
      let q = req.query.condition;
      //$or:[{'name':RegExp(q,'i')}, {'description':RegExp(q,'i')}] = search where  name and description like q
      const record = await models.People.find(
        {
          $or: [{ name: RegExp(q, "i") }, { email: RegExp(q, "i") }],
          deletedAt: null, person_type: 'Customer'
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
  listProvider: async (req, res, next) => {
    try {
      let q = req.query.condition;
      //$or:[{'name':RegExp(q,'i')}, {'description':RegExp(q,'i')}] = search where  name and description like q
      const record = await models.People.find(
        {
          $or: [{ name: RegExp(q, "i") }, { email: RegExp(q, "i") }],
          deletedAt: null, person_type: 'Provider'
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
      //verify empty fileds
      const updatedFields = {};
      Object.keys(req.body).forEach((key) => {
        if (!commonService.isEmpty(req.body[key]) && key != "_id") {
            updatedFields[key] = req.body[key];          
        }
      });

      const record = await models.People.findByIdAndUpdate(
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
      const record = await models.People.findByIdAndUpdate(
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
      const record = await models.People.findByIdAndUpdate(
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
      const record = await models.People.findByIdAndUpdate(
        { _id: req.body._id },
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
};
