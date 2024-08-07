const  express = require('express');
const  router=express.Router()
const CreaditCart=require('../controler/craditcardcontrole')

router.get('/getbankcart',CreaditCart.Getallbankcards)
router.post('/addbankcart',CreaditCart.Addbankcart)
router.post('/descount',CreaditCart.chechinanddescount)
module.exports=router