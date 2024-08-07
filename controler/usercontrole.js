const User=require('../models/user')
const Product =require('../models/product')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const createToken=(id)=>{
  return jwt.sign({id},'thesecretekey',{
    expiresIn:'10m'
  })
}

const Getallusers = async(req,res)=>{
   try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
}
 const Adduser=async(req,res)=>{
   
     const {firstName,lastName,password,email}=req.body
    
    try{
       const user= new User({
        firstName,lastName,password,email,wishlist:[],card:[]
       })
       await user.save()
       const token=createToken(user._id)
       res.cookie('jwt',token)
       res.json(user._id)
    }catch(err){
      res.status(500).json('failde to add data')
    }
 }

 const AddtoWishlist =async (req,res)=>{
  const {id}=req.params
  const {idProduct}=req.body
  try{
   const user= await User.findById(id)
   if(user.wishlist.includes(idProduct)){
    return res.json('this product is allready existe in the wishlist')
   }
   user.wishlist.push(idProduct)
   await user.save()
   return res.json('product add to widhlist')

  }catch(err){
    console.log(err)
    res.status(500).json('errore to add product to wishlist')
  }

 }


 const gettProduct=async(req,res)=>{
  const {id}=req.params
  try{
    const user=await User.findById(id)
    const products= await Product.find({_id:{$in:user.wishlist}})
    return res.json(products)

  }catch(err){
    console.log(err)
    res.status(500).json('errore gett product')
  }
 }
const Deltgeteproduct=async(req,res)=>{
  const {id}=req.params
  const {idproduct}=req.body
  try{
    const user=await User.findById(id)
    user.wishlist.pull(idproduct)
    await user.save()
    return res.json('product delete from wishlist')
  }
  catch(err){
    console.log(err)
    res.status(500).json('errore gett product')
  }
}

const addtocart=async(req,res)=>{
  const {id}=req.params
  const {idProduct,size,color,qnt}=req.body
  try{
    const user=await User.findById(id)
    

    const existeProduct=user.card.find((product)=>{
      return(
         product.id.toString() === idProduct &&
        product.size === size &&
        product.color === color 
      )
    })
    if(existeProduct){
      return res.json('this product allready eexiste in the data base')
    }
    user.card.push({
      id:idProduct,
      size:size,
      color:color,
      qnt:qnt
    })
    await user.save()
    return res.json('product add to cart')


  }catch(err){
    console.log(err)
    res.status(500).json('errore gett product')
  }
}
const deletefromcart =async(req,res)=>{
  const {id}=req.params
  const { idProduct, size, color } = req.body
  try{
   await User.findByIdAndUpdate(id,{
    $pull:{
      card:{
        id:idProduct,
        size:size,
        color:color
      }
    }
   })
     
   return res.json('product delete from cart')


  }catch(err){
    console.log(err)
    res.json(err)
  }
  
}

const updatecart=async(req,res)=>{
  const {id}=req.params
  const {size,color,qnt,cartitemId}=req.body
  try{
     await User.updateOne({
      _id:id,
      'card._id':cartitemId
     },
     {
      $set:{
        'card.$.size':size,
        'card.$.color':color,
        'card.$.qnt':qnt
      }
     }
     )
     return res.json('cart item update')
  }catch(err){
    console.log(err)
    res.json(err)
  }

}

const getProductincard=async(req,res)=>{
  const {id}=req.params

  try{
   const user=await User.findById(id)

   //Perform an aggregation using MongoDB's aggregate function
   const cardinfo= await User.aggregate([

    // helps us find and select only the user document that matches the given _id
    {$match:{_id:user._id}},
     
    // stage is to separate each item in the card array into its own document
    {$unwind:'$card'},

    //
    {
      $lookup:{
        from:'products',
        localField:'card.id',
        foreignField:'_id',
        as:'productDetails'
      }
    },
    {$unwind:'$productDetails'},
    {$group:{
      _id:'$card.id',
      idProduct:{$first:'$productDetails._id'},
      size: { $first: '$card.size' }, // Get the size
      color: { $first: '$card.color' }, // Get the color
      qnt: { $first: '$card.qnt' }, // Get the quantity
      imgs:{$first:'$productDetails.imgs'},
      prix:{$first:'$productDetails.prix'},
      name:{$first:'$productDetails.name'}
    }},
    {
      $project: {
        _id: 0, // Exclude the '_id' field from the output
        name:1,
        cardItemId: '$_id', // Rename '_id' to 'cardItemId' for clarity
        idProduct: 1, // Include the 'idProduct' field
        size: 1, // Include the 'size' field
        color: 1, // Include the 'color' field
        qnt: 1, // Include the 'qnt' field
        imgs: 1, // Include the 'imgs' field
       
        totaleprice:{ $multiply: ["$prix", "$qnt"] }
      },
    },


   ])
   return res.json(cardinfo)
  }catch(err){
    console.log(err)
    res.json('errore to get product')
  }
}
const login=async(req,res)=>{
  const{email,password}=req.body
  try{
    const user=await User.findOne({email:email})
    if(!user){
      return res.json('incorect email')
    }
    const matchingpassword=user.password === password
    if(!matchingpassword){
      return res.json('incorect password or email')
    }
    const token=createToken(user._id)
    res.cookie('jwt',token)
    res.json(user._id)

  }catch(err){
    console.log(err)
  }


}
const auth=require('../middelware/authMidellware')

const userinfo = async (req, res) => {
  try {
    const user = req.decodedToken; // Assuming your decoded token contains user info
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports={
  userinfo,
   login,
    Getallusers,
    Adduser,
    AddtoWishlist,
    gettProduct,
    Deltgeteproduct,
    addtocart,
    deletefromcart,
    updatecart,
    getProductincard,
    auth
}