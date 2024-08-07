const productControler=require('../controler/productControler')
const  express = require('express');
const  router=express.Router()

router.post('/addproduct',productControler.AddProduct)
router.get('/getproducts',productControler.Getallproduct)
router.get('/product/:id',productControler.Getproductbyid)
router.delete('/del/:id',productControler.deleteproduct)
router.put('/put/:id',productControler.updateproduct)
module.exports=router