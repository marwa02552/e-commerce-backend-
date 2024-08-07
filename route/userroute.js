const Usercontroler=require('../controler/usercontrole')
const  express = require('express');
const  router=express.Router()

router.get('/get',Usercontroler.Getallusers)
router.post('/add',Usercontroler.Adduser)
router.post('/addtowishlist/:id',Usercontroler.AddtoWishlist)
router.get('/getwishlist/:id',Usercontroler.gettProduct)
router.delete('/deletefromwishlist/:id',Usercontroler.Deltgeteproduct)
router.post('/addtocart/:id',Usercontroler.addtocart)
router.delete('/deletefromcart/:id',Usercontroler.deletefromcart)
router.put('/updatecatr/:id',Usercontroler.updatecart)
router.get('/getproduct/:id',Usercontroler.getProductincard)
router.post('/login',Usercontroler.login)
router.get('/info',Usercontroler.userinfo)
module.exports=router