const { default: next } = require("next")
const CatchAsyncError = require("../middlewares/CatchAsyncError")
const TaskModel = require("../models/TaskModel")
const TeamModel = require("../models/TeamModel")
const ErrorHandler = require("../utils/ErrorHandler")
const UserModel = require("../models/UserModel")

exports.addTask = CatchAsyncError(async(req,res,next)=>{


    const {internName, assignee,dueDate,task,status,description} = req.body

    const {teamId} = req.query

    console.log(req.query)

    const team = await TeamModel.findById(teamId)
    if(!team)
    {
        return next(new ErrorHandler("First Create Team",401))
    }
    const newTask = await TaskModel.create({
        internName: internName,
        assignee: assignee,
        dueDate: dueDate,
        task: task,
        status: status,
        description: description,
    })
    
console.log(teamId)
   
    newTask.teams.push(teamId)
    console.log(newTask)
    team.tasks.push(newTask.id)
    
 
    await team.save()
    await newTask.save()

    res.status(200).json({
        success: true,
        message: "Task Added",
        newTask
    })
})

exports.getAllTasks = CatchAsyncError(async(req,res)=>{

    const {userEmail} = req.body
    const allTasks = await TaskModel.find(userEmail)

    res.json({
        success: true,
        allTasks
    })
})

exports.updateTasks = CatchAsyncError(async(req,res)=>{

    const {task_id} = req.body
    const {internName, assignee,dueDate,task,status,description} = req.body

    const updatedTask  = await TaskModel.findByIdAndUpdate(task_id,{
        internName: internName,
        assignee: assignee,
        dueDate: dueDate,
        task: task,
        status: status,
        description: description,
    },{new:true})

    if(!updatedTask)
        {
            return next(new ErrorHandler("No tasks is Found",400))
        }

    res.json({
        success: true,
        updatedTask
    })
})

exports.deleteTask = CatchAsyncError(async(req,res)=>{
    const {task_id} = req.body
})

