const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/",async (req,res)=>{
    try{
        const[categories]=await db.query("SELECT * FROM categories");
        res.json({
            success:true,
            count:categories.length,
            data:categories
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const [category]=await db.query(
            "SELECT * FROM categories WHERE id=?",
            [req.params.id]
        );

        if(category.length ===0){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            });
        }

        const [products]=await db.query(
            "SELECT * FROM products WHERE category_id = ?",
            [req.params.id]
        );

        res.json({
            success:true,
            category:category[0],
            products:products
        });
    }catch (error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
});

module.exports=router;