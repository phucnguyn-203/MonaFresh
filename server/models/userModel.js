const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "User must have a name"],
        },
        email: {
            type: String,
            required: [true, "Please provide us your email"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Invalid email"],
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password length must be greater than 8 characters or equal"],
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, "please confirm your password"],
            validate: {
                validator: function (val) {
                    return val === this.password;
                },
                message: "Confirm password is not same password field",
            },
        },
        phone: {
            type: String,
            required: [true, "User must have phone number"],
        },
        role: {
            type: String,
            enum: ["customer", "admin", "staff"],
            default: "customer",
        },
        photo: String,
        isActive: {
            type: Boolean,
            default: true,
            select: false,
        },
        deliveryAddress: [
            {
                province: String,
                district: String,
                ward: String,
                note: String,
                name: String,
                phone: String,
            },
        ],
    },
    {
        timestamps: true,
    },
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
    }
    next();
});

userSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});

userSchema.methods.correctPassword = async function (password, userPassword) {
    return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
