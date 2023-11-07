const express=require('express')
const app=express()
const morgan=require('morgan')
const cors = require('cors');
const  {findTodayBirthdays}=require('./userModel')


app.use(cors());
app.use(morgan('dev'))

app.get('/',async(req,res)=>{
    try{
        const allUsersHaveTodayBirthday=await findTodayBirthdays()
        res.status(200).json({
            totalResults:allUsersHaveTodayBirthday.length,
            allUsersHaveTodayBirthday
        })
    }catch(err){
        console.log(err)
    }
})

module.exports=app