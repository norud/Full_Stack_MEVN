import mongoose, {Schema} from 'mongoose';

const categoriesSchema = new Schema({
    name:{type:String, maxlength:50, required:true},
    description:{type:String, maxlength:255},
    status:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date, default:null},
    deletedAt:{type:Date, default:null}
});

//export as models
const Category = mongoose.model('category', categoriesSchema);
export default Category;