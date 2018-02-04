const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    addressnumber: {
        type: String,
        required: false
    },
    addresspostalcode: {
        type: String,
        required: false
    },
    addresscity: {
        type: String,
        required: false
    },
    telephonenumber: {
        type: String,
        required: false
    },
    skicards: [{type: Schema.ObjectId, ref: 'SkiCard'}],
    totalskiturns: {
        type: Number,
        required: false
    },
    member: {type: Schema.ObjectId, ref: 'Member'},
    role:{
        type: String,
    }
})

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('Users', UserSchema)
