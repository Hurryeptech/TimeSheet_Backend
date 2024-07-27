const CatchAsyncError = require("../middlewares/CatchAsyncError")
const TaskModel = require("../models/TaskModel")
const TeamModel = require("../models/TeamModel")
const UserModel = require("../models/UserModel")
const ErrorHandler = require("../utils/ErrorHandler")

exports.createTeam = CatchAsyncError(async(req,res)=>{

    const {teamName} = req.body
    const {userEmail} = req.user

    const user = await UserModel.findOne({userEmail: userEmail})
    const newTeam = await TeamModel.create({
        teamName: teamName,
        users: user.id
    })
    
    
    
    res.status(201).json({
        success : true,
        message: "Team Created",
        newTeam
    })
})

exports.addMembers = CatchAsyncError(async(req,res,next)=>{

    const {members} = req.body
    const {id} = req.params
   console.log(req.body)
    const team = await TeamModel.findById(id)
    console.log("Hello v")
    const user = await UserModel.findOne({userEmail: members})
    console.log(user)
    const alreadyMember = await TeamModel.findOne({members: user.id})
    
    if(alreadyMember)
    {
        return next(new ErrorHandler("already member",400))
    }
  
   
   team.members.push(user.id)
   user.team.push(team.id)
   
   await user.save()
   await team.save()

    res.status(201).json({
        success: true,
        message: "Members Added Successfully"
    })


})

exports.getTeams = CatchAsyncError(async(req,res)=>{

    const {id} = req.user
    const user = await UserModel.findById(id)

    const team = await TeamModel.find({users: user.id})
    if(!team)
    {
        return next(new ErrorHandler("Not a Member Of a team",401))
    }
  
    const members = await UserModel.find({id: team.members})

    // const tasks = await TeamModel.find({tasks: await TaskModel.find({teams: team.id})})

    // const tasks = await TeamModel.aggregate({$lookup{from: "tasks",localField:"tasks",foreignField: "_id",as:"taskList"}})

    const results = await TeamModel.aggregate([
        {
          $lookup: {
            from: 'tasks',        
            localField: 'tasks', 
            foreignField: '_id',      
            as: 'Details'      
          }
        }
      ]);
    
 
    res.json({
        success: true,
        team,
        members,
        results
        

    })

})

exports.addTasks = CatchAsyncError(async(req,res)=>{

    const {internName, assignee,dueDate,task,status,description} = req.body

    const {teamId} = req.query

    console.log(req.query)

    
})



