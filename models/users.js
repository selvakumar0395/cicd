const mongoose = require('mongoose');
const valdator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: [true, 'Firstname is required'],
        trim: true,
        minlength: [2, 'Firstname must be at least 2 characters long'],
        maxlength: [50, 'Firstname must be less than 50 characters long']
    },
    lastname:{
        type: String,
        required: [true, 'Lastname is required'],
        trim: true,
        minlength: [2, 'Lastname must be at least 2 characters long'],
        maxlength: [50, 'Lastname must be less than 50 characters long']
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [valdator.isEmail,'Please provide valid email address']
    },
    password:{
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
       //maxlength: [20, 'Password must be less than 20 characters long'],
        validate:{
            validator: function(v){
                const regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
                return regex.test(v);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one special character and one number'
        }

    },
    mobile:{
        type: Number,
        required: [true, 'Mobile number is required'],
        unique: true,
        validate:{
            validator: function(v){
                return /^\d{10}$/.test(v);
            },
             message:`Mobile number should be 10 digit!`
            //message: props => `${props.value} is not a valid mobile number!`
        }

    },
    role:{
        type: String,
        default: 'user'
    },
    loginCount:{
        type: Number,
        default: 0
    }
},{
    timestamps:true
});

UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}



module.exports = mongoose.model('User',UserSchema);