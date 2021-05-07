import models from "../models";

export default {
  addStock: async (itemId, quantity) => {
    let { stock } = await models.Item.findOne({ _id: itemId });
    let nStock = parseInt(stock) + parseInt(quantity);

    const record = await models.Item.findByIdAndUpdate(
      { _id: itemId },
      { stock: nStock }
    );
  },
  removeStock: async (itemId, quantity) => {
    let { stock } = await models.Item.findOne({ _id: itemId });
    let nStock = parseInt(stock) - parseInt(quantity);

    const record = await models.Item.findByIdAndUpdate(
      { _id: itemId },
      { stock: nStock }
    );
  },
};
