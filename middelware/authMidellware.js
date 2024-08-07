const jwt = require('jsonwebtoken');
const requireAuth=(req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'thesecretekey',(err,decodedToken)=>{
            if(err){
                console.log('the token is not valide')
            }else{
                console.log(decodedToken)
                next()
            }


        })

    }else{
        console.log('token not existe')
    }



}
module.exports=requireAuth