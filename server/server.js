const express =require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/todos")
    .then(()=>{console.log("mongodb  connected")})
    .catch((err)=>{console.log(err)})
    
const Todo=new mongoose.Schema({
    task:String,
    progress:{
        type:String,
        enum:["todo","progress","completed"],
        default:"todo"
    },
    time:{
        type:Date,
        default:Date.now
    }
})
const Task=mongoose.model("Task",Todo)
app.get("/task",async(req,res)=>{
    const tasks=await Task.find()
    console.log(tasks)
    res.json(tasks)
})
app.post("/task",async(req,res)=>{
    const tasks=await Task.create({task:req.body.task})
    res.json(tasks)
})
app.delete("/task/:id",async(req,res)=>{
    try{
        const del= await Task.findByIdAndDelete(req.params.id)
        if(!del){
            return res.status(404).json({ message: "Task not found" })
        }
        res.json({"message":"deleted"})
    }catch (err) {
        res.status(500).json({ error: err.message })
    }
})
app.put("/task/:id",async(req,res)=>{
    try{
        const update= await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        if(!update){
            return res.status(404).json({ message: "Task not found" })
        }
        
        res.json(update)
    }catch (err) {
        res.status(500).json({ error: err.message })
    }
})
app.listen(3000,()=>{
    console.log("server runnimng")
})