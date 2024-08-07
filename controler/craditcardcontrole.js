const Bankcart=require('../models/card')
const Shipinginfo =require('../models/shipinginfo')

const Getallbankcards = async(req,res)=>{
    try {
       const cards = await Bankcart.find();
       return res.json(cards);
     } catch (err) {
       res.status(500).json({ error: 'Failed to fetch users' });
     }
 }

 const Addbankcart=async(req,res)=>{
   
    const {userName,cartNumber,totel}=req.body
   
   try{
      const bankcart= new Bankcart({
        userName,cartNumber,totel
      })
      await bankcart.save()
      return res.json(bankcart)
   }catch(err){
     res.status(500).json('failde to add data')
   }
}

const chechinanddescount = async (req, res) => {
    const { cartnumber, totalePrice, idUser, Location, phonenumber, userName } = req.body;
    try {
      const user = await Bankcart.findOne({ cartNumber: cartnumber });
  
      if (!user) {
        return res.json('This cart does not exist');
      }
      if (user.totel < totalePrice) {
        return res.json('You cannot discount more than the available total');
      }
      user.totel = user.totel - totalePrice;
      const shipinginfo = new Shipinginfo({
        idUser: idUser,
        totalePrice: totalePrice,
        location: Location,
        Phonenumber: phonenumber,
        userName: userName
      });
      await user.save();
      await shipinginfo.save();
      return res.json(user);
  
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  };
  

 module.exports={
    Getallbankcards,
    Addbankcart,
    chechinanddescount
 }
