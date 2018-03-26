const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const rigletSchema = new mongoose.Schema({
    userName: { type: String, required: true},
    rigletName:{ type: String, required: true, unique: true },
    ownerName: String,
    emailId:String,
    createdOn: { type: Date,default:Date.now},
    slackURL: String,
    status: {type: String,default:"INITIATING"},
    appStack: String,
    rigTools:[{
        serverIP: String,
        serverUsername: String,
        serverPassword :String,
        cloudServiceProvider: String,
        tools: [{
            toolName: String,
            toolURL : String,
            logo: String,
            port: String
        }]
    }],
    customTools: [{
        customToolName: String,
        customToolURL: String,
        customToolUsername: String,
        customToolPassword: String,
        customToolType: String
    }],
    serverDetails: [{
        serverIP: String,
        serverUserName: String,
        serverPassword: String,
        serverType: String,
        serverServiceProvider : String
    }]
})

var riglets = mongoose.model('riglets',rigletSchema)
module.exports = riglets;

// let User = mongoose.model('user', schema);
// module.exports = User;
