const {getAllCartItems,updateCart} =require('../models/Cart.model');
const router= require('express').Router();

const getAllCartItemsController = async(req,res)=>{
    try{
       const result =  await getAllCartItems(req.params.user_id);
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json("Internal server error");
    }
}
const updateCartController = async (req,res)=>{
    try{
        console.log(req.body)
        await updateCart(req.params.user_id,req.body.courseIds);
        return res.status(200).json("Cart updated successfully");
    }catch(err){
        return res.status(500).json("Internal Server error");
    }
}
module.exports = {getAllCartItemsController,updateCartController};