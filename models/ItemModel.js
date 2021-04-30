import mongoose, {Schema} from 'mongoose';

const itemSchema = new Schema({
   category:{type: Schema.objectId, ref:'category'},
   code:{type:String, maxlength:50, required:true},
    name:{type:String, maxlength:80, required:true},
    description:{type:String, maxlength:255},
    sale_price:{type:Number, required:true},
    stock:{type:Number, required:true},
    status:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date, default:null},
    deletedAt:{type:Date, default:null}
});

//export as models
const Item = mongoose.model('item', itemSchema);
export default Item;