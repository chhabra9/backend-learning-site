const{createModule} = require('../models/Module.model');
const createModuleController = async(req,res)=>{
    try{
        const result = await createModule(req.body);
        console.log(result);
        res.status(200).json('Success');
    }catch(err){
        res.status(500).json('Internal Server Error')
    }
}
