const mongoose  = require('mongoose');

const ToursSchema = new mongoose.Schema({
OrganizerId:{type:String , required: true},
name:{type:String , required: true},
desc:{type:String , required: true},
photoThimeline:{type:String , required: true},
Days:[
    {
        DayName:String,
        photo:String,
        location:String,
        

    }
]
})