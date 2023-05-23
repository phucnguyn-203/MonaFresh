const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");
const { USER_ROLES } = require("../utils/Constant");
const removeAccents = require("../utils/removeAccents");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Vui lòng nhập tên của bạn"],
            trim: true,
        },
        searchName: String,
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
            required: [true, "Vui lòng nhập lại mật khẩu."],
            validate: {
                validator: function (val) {
                    return val === this.password;
                },
                message: "Mật khẩu không khớp.",
            },
        },
        phone: {
            type: String,
            required: [true, "Vui lòng nhập số điện thoại của bạn"],
            validate(value) {
                if (!validator.isMobilePhone(value, "vi-VN")) {
                    throw new Error("Vui lòng nhập đúng định dạng số điện thoại");
                }
            },
            unique: true,
        },
        role: {
            type: Number,
            enum: [USER_ROLES.ADMIN, USER_ROLES.CUSTOMER, USER_ROLES.STAFF],
            default: USER_ROLES.CUSTOMER,
        },
        photo: {
            type: String,
            default: "http://res.cloudinary.com/dp6iurtza/image/upload/v1684832235/aox46fwjxawwnquednzw.jpg",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        passwordChangeAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
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

userSchema.pre("save", function (next) {
    this.searchName = removeAccents(this.name).toLowerCase();
    next();
});

userSchema.pre("save", function (next) {
    if (this.isModified("password") && !this.isNew) {
        this.passwordChangeAt = Date.now();
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

userSchema.methods.changePasswordAfter = function (JWTTimestamps) {
    if (this.passwordChangeAt) {
        const changedTimestamp = this.passwordChangeAt.getTime() / 1000;
        return JWTTimestamps < changedTimestamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
