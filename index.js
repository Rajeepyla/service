const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port=2000;
app.use( express.json());
mongoose.connect('mongodb://localhost:27017/comments')
.then(()=>{
    console.log('connected to comments DB')
})
.catch((err)=>{
    console.log('connection was failed')
})
const Comment = mongoose.model('Comment',new mongoose.Schema({
    comm:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
})); 
app.get('/api/comment-list',async (req,res)=>{
  const comments= await Comment.find();
    res.send(comments);
})
app.post('/api/comment-list',async(req,res)=>{
   let comment = new Comment({
    comm: req.body.comm
   })
  comment = await comment.save();
  res.send(comment);
})
app.put('/api/comment-list/:id',async(req,res)=>{
    const comment = await Comment.findByIdAndUpdate(req.params.id,{ comm:req.body.comm},{ new:true});
   
       res.send(comment); 
})
app.delete('/api/comment-list/:id',async(req,res)=>{
    const comment = await Comment.findByIdAndRemove(req.params.id)
       res.send(comment); 
});
app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})