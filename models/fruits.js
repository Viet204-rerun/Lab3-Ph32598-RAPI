const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const Fruits = new Scheme({
    name:{type: String},
    quantity: {type: Number},
    price : {type: Number},
    status:{type:Number},// status = 1 => Còn hàng, 0 => hết hàng , -1 => ngừng kinh doanh
    image:{type:Array},// kiểu dữ liệu danh sách
    description:{type:String},
    id_distributor:{type: Scheme.Types.ObjectId,ref: 'distributor'}

},{
    timestamps:true
})
module.exports = mongoose.model('fruit',Fruits)