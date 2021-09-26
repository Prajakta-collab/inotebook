const express=require('express');
const fetchuser = require('../middleware/fetchuser');
const router=express.Router();
const Notes=require('../models/Notes')
const { body, validationResult } = require("express-validator");


//Router 1: Get all notes of user using :Post (/api/notes/fetchallnotes)  Login required

router.get('/fetchalluser',fetchuser,async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id});
    res.json(notes);
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal Server Error !");
    }
    

})

//Router 2: Add notes for user using :Post (/api/notes/addnotes)  Login required

router.post('/addnotes',fetchuser,[
   
    body("title", "Enter valid title").isLength({ min: 2 }),
    body("description", "Description must be of atleast 5 characters ").isLength({
      min: 5,
    }),
],async(req,res)=>{
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        const note=new Notes({
            title,description,tag, user : req.user.id
        })
        const savednote=await note.save();
        

        res.json(savednote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error !");
    }

   

})

//Router 3: update notes of user using :Post (/api/notes/updatenote)  Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        
   
    // Create a newNote object
    const newNote  = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error !");
}

})

//Router 4: delete notes of user using :Post (/api/notes/deletenote)  Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    
    try {
        
   
    
    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been Deleted !",note:note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error !");
}

})

module.exports=router