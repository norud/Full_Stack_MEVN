import models from "../models/Index"; //call index as default
import stockService from "../services/StockService";

export default {
  add: async (req, res, next) => {
    try {
      const record = await models.Sell.create(req.body);
      //update stock
      let detail = req.body.detail;
      //loop to update stock
      detail.map(function (x) {
        stockService.removeStock(x._id, x.quantity);
      });

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
      const record = await models.Sell.findOne({
        _id: req.query._id,
        deletedAt: null,
      })
        .populate("user", { name: 1 })
        .populate("people", { name: 1 });
      if (!record) {
        res.status(400).send({
          message: "Sell not found",
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
  queryByCode: async (req, res, next) => {
    try {
      const record = await models.Sell.findOne({
        code: req.query.code,
        deletedAt: null,
      })
        .populate("user", { name: 1 })
        .populate("people", { name: 1 });
      if (!record) {
        res.status(400).send({
          message: "Sell not found",
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
      const record = await models.Sell.find(
        {
          $or: [
            { register_number: RegExp(q, "i") },
            { register_serie: RegExp(q, "i") },
          ],
          deletedAt: null,
        },
        { deletedAt: 0 } //dont show deletedAt
      )
        .populate("user", { name: 1 })
        .populate("people", { name: 1 })
        .sort({ createdAt: -1 }); //desc = -1, asc = 1
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
  activate: async (req, res, next) => {
    try {
      const record = await models.Sell.findByIdAndUpdate(
        { _id: req.body._id, status: 0 },
        { status: 1, updatedAt: Date.now(), deletedAt: null }
      ); //first where, second values to update

      if (record.status == 0) {
        //update stock
        let detail = record.detail;
        //loop
        detail.map(function (x) {
          stockService.removeStock(x._id, x.quantity);
        });
      }

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
      const record = await models.Sell.findByIdAndUpdate(
        { _id: req.body._id, status: 1, deletedAt: null },
        { status: 0, updatedAt: Date.now(), deletedAt: Date.now() }
      ); //first where, second values to update
      if (record.status == 1 && record.deletedAt == null) {
        //update stock
        let detail = record.detail;
        //loop
        detail.map(function (x) {
          stockService.addStock(x._id, x.quantity);
        });
      }
      res.status(200).json(record);
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong",
        descriptions: e,
      });
      next(e);
    }
  },
  lastTwelveMonths: async (req, res, next) => {
    try {
      const record = await models.Sell.aggregate(
        [
          {
            $group: {
              _id:{
                month:{$month:"$createdAt"},
                year: {$year:"$createdAt"}
              },
              total:{$sum:"$total"},
              number:{$sum:1}
            }
          },
          {
            $sort: {
              "_id.year":-1, "_id.month":-1//-1= desc, 1=asc
            }
          }
        ]
      ).limit(12);

      //response
      res.status(200).json(record);
    } catch (e) {
      res.status(500).send({
        message: "Something went wrong",
        descriptions: e,
      });
      next(e);
    }
  },
  queryByDateRange: async (req, res, next) => {
    try {
      let start = req.query.start;
      let end = req.query.end;
      //$or:[{'name':RegExp(q,'i')}, {'description':RegExp(q,'i')}] = search where  name and description like q
      const record = await models.Sell.find({
        "createdAt": { $gte: start, $lt: end },
      })
        .populate("user", { name: 1 })
        .populate("people", { name: 1 })
        .sort({ createdAt: -1 }); //desc = -1, asc = 1
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
};
