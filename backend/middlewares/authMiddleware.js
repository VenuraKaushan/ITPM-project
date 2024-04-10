import jwt from 'jsonwebtoken';


//validate staff routes
export const validateUSers = (req,res,next) =>{
    const accessToken = req.cookies.accessToken;

    if(accessToken){
        // verify the token if exist
        jwt.verify(accessToken,process.env.SECRET_KEY,(err,decode)=>{
            if(err){
                console.log(err.message);
                res.status(403).json({error:"Token was changed by someone"})
            }else{
                if(decode.role === "SUPERVISOR"  ){
                    next();
                }else if(decode.role === "PROJECTMEMBER"){
                    next();
                }else if(decode.role === "EXAMINER"){
                    next();
                }else if(decode.role === "COORDINATOR"){
                    next();
                }else if(decode.role === "STUDENT"){
                    next();
                }else{
                    res.status(403).json({error:"Unknown user"});
                }
            }
        })
    }else{
        res.status(403).json({error:"Token was not found!"});
    }
}


// create validation for student routes
// export const validateStudent = (req,res,next) =>{
//     const accessToken = req.cookies.accessToken;

//     if(accessToken){
//         // verify the token if exist
//         jwt.verify(accessToken,process.env.SECRET_KEY,(err,decode)=>{
//             if(err){
//                 console.log(err.message);
//                 res.status(403).json({error:"Token was changed by someone"})
//             }else{
//                 if(decode.role === "STUDENT"){
//                     next();
//                 }else{
//                     res.status(403).json({error:"Unknown user"});
//                 }
//             }
//         })
//     }else{
//         res.status(403).json({error:"Token was not found!"});
//     }
// }