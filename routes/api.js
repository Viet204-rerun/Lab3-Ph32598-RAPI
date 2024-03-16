var express = require('express');
var router = express.Router();

//Thêm model
const Distributors = require('../models/distributors')
const Fruits = require('../models/fruits')

//Api thêm distributor
router.post('/add-distributor',async (req,res)=>{
    try {
        const data = req.body; //lấy dữ liệu từ body
        const newDistributors = new Distributors({
            name: data.name
        });//tạo một đối tượng mới
        const result = await newDistributors.save(); //thêm vào database
        if(result){
            //neu thêm thành công result !null trả về dưc liệu
            res.json({
                "status":200,
                "messenger":"Thêm thành công",
                "data": result
            })
        }else{
            //nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status" : 400,
                "messenger":"Lỗi, Thêm không thành công",
                "data":[]
            })
        }
    } catch (error) {
        console.log(error);
    }
})
//Api thêm fruit
router.post('/add-fruit',async (req,res)=>{
    try {
        const data = req.body; //lấy dữ liệu từ body
        const newFruit = new Fruits({
            name: data.name
        });//tạo một đối tượng mới
        const result = await newFruit.save(); //thêm vào database
        if(result){
            //neu thêm thành công result !null trả về dưc liệu
            res.json({
                "status":200,
                "messenger":"Thêm thành công",
                "data": result
            })
        }else{
            //nếu thêm không thành công result null, thông báo không thành công
            res.json({
                "status" : 400,
                "messenger":"Lỗi, Thêm không thành công",
                "data":[]
            })
        }
    } catch (error) {
        console.log(error);
    }
})
//Lay danh sach fruits

router.get('/get-list-fruit',async (req,res)=>{
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status" :200,
            "messenger":"Danh sách fruit",
            "data":data
        })
    } catch (error) {
        console.log(error);
    }
})
//lay chi tiet fruits(truyen param id)
router.get('/get-fruit-by-id/:id',async(req,res)=>{
    //:id param
    try {
        const {id} =req.params //lay dữ liệu thông qua :id trên url gọi là param
        const data = await Fruits.findById(id).populate('id_distributor');
        res.json({
            "status": 200,
            "messenger":"danh sách fruit",
            "data":data
        })
    } catch (error) {
        console.log(error);
    }
})
//Lay danh sach fruits trả về name ,quantity ,...,và sắp xếp

router.get('/get-list-fruit-in-price',async(req,res)=>{
    //:id param
    try {
        const {price_start,price_end} = req.query // lấy dữ liệu thông qua :id trên url gọi là param
        const query = {price:{$gte:price_end,$lte:price_end}}
        //$gte lớn hơn hoặc bằng , $ge lớn hơn
        //$Lte nhỏ hơn hoặc bằng , $le nhỏ hơn

        const data = await Fruits.find(query,'name quantity price id_distributor')
        .populate('id_distributor')
        .sort({quantity : -1}) // giảm dần = -1 , tăng dần =1
        .skip(0) // bỏ qua số lượng row
        .limit(2) // lấy 2 sản phẩm
        res.json({
            "status":200,
            "messenger":"Danh sách fruit",
            "data":data
        })
    } catch (error) {
        console.log(error);
    }
})
//Lay danh sach fruits trả về name , quantity ,... có chữ cái bắt đầu tên là a hoặc x


router.get('/get-list-fruit-have-name-a-or-x',async(req,res)=>{
    //id:param
    try {
        const query = {$or:[
            {name:{$regex:'T'}},
            {name:{$regex:'X'}}
        ]}
        //truyền câu điều kiện,và chỉ lấy các trường mong muốn
        const data = (await Fruits.find(query,'name quantity price id_distributor')).populate('id_distributor')
        res.json({
            "status":200,
            "messenger":"Danh sách fruit",
            "data":data
        })
    } catch (error) {
        console.log(error);
    }
})

//Api cập nhật fruit
router.put('/update-fruit-by-id/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const data = req.body;//lấy dữ liệu từ body
        const updatefruit = await Fruits.findById(id)
        let result = null;
        if(updatefruit){
            updatefruit.name = date.name ?? updatefruit.name;
            updatefruit.quantity = date.quantity ?? updatefruit.quantity;
            updatefruit.price = date.price ?? updatefruit.price;
            updatefruit.status = date.status ?? updatefruit.status;
            updatefruit.image = date.image ?? updatefruit.image;
            updatefruit.description = date.name ?? updatefruit.description;
            updatefruit.id_distributor = date.name ?? updatefruit.id_distributor;
            result = await updatefruit.save();

        }
        //tạo 1 đối tượng mới
        //thêm vào database
        if(result){
            //nếu thêm thành công result !null trả về dữ liệu
            res.json({
                "status":200,
                "messenger":"Câp nhật thành công",
                "data": result
            })
        }else{
        //nếu thêm không thành công result null,thông báo không thành công
        res.json({
            "status":400,
            "messenger":"Lỗi, Cập nhật không thành công",
            "data":[]
        })
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;