const Product=require('../models/product')
const AddProduct=async(req,res)=>{
    const{name,prix,imges,colors,sizes}=req.body
    try{

        const newproduct=new Product({
            name,
            prix,
            imgs:imges,
            color:colors,
            size: Array.isArray(sizes) ? sizes.map(s => ({ sizename: s.sizename, qnt: s.qnt })) : sizes

        
        })
        await newproduct.save()
        return res.json(newproduct)
    }catch(err){
        console.log(err)
    }

}

const Getallproduct= async(req,res)=>{
    try{
        const products=await Product.find()
        return res.json(products)

    }catch(err){
      console.log(err)
    }

}


const Getproductbyid=async(req,res)=>{
    const {id}=req.params
    try{
        const gettingproduct=await Product.findById(id)
        res.json(gettingproduct)
        
    }catch(err){
        console.log(err)
    }
}

const deleteproduct=async(req,res)=>{
    const {id}=req.params
    try{
        
        await Product.findByIdAndDelete(id)
        res.json('productdelete')
        
    }catch(err){
        console.log(err)
    }

}
const updateproduct=async(req,res)=>{
    const{name,prix,imges,colors,sizes}=req.body
    const {id}=req.params
    try{
        const newinfo={
            name,
            prix,
            imgs:imges,
            color:colors,
            size: Array.isArray(sizes) ? sizes.map(s => ({ sizename: s.sizename, qnt: s.qnt })) : sizes
        }
        const updateproduct=await Product.findByIdAndUpdate(id,newinfo,{new:true})
        return res.json(updateproduct)

    }catch(err){
        console.log(err)
    }
}
module.exports={
    AddProduct,
    Getallproduct,
    Getproductbyid,
    deleteproduct,
    updateproduct
}