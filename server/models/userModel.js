const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const validator = require("validator");
const { USER_ROLES } = require("../utils/Constant");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Vui lòng nhập tên của bạn"],
        },
        email: {
            type: String,
            required: [true, "Vui lòng nhập email của bạn"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Email không hợp lệ"],
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Độ dài mật khẩu nên lớn hơn hoặc bằng 8 kí tự"],
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, "Vui lòng nhập lại mật khẩu"],
            validate: {
                validator: function (val) {
                    return val === this.password;
                },
                message: "Mật khẩu không khớp",
            },
        },
        phone: {
            type: String,
            required: [true, "Vui lòng nhập số điện thoại của bạn"],
            unique: true,
        },
        role: {
            type: Number,
            enum: [USER_ROLES.ADMIN, USER_ROLES.CUSTOMER, USER_ROLES.STAFF],
            default: USER_ROLES.CUSTOMER,
        },
        photo: {
            type: String,
            default: "https://res.cloudinary.com/dp6iurtza/image/upload/v1679667323/qfjekmarkicryiaksnvu.png",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        address: [
            {
                name: String,
                phone: String,
                province: String,
                district: String,
                ward: String,
                note: String,
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
