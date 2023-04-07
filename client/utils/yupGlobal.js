import * as yup from "yup";

const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{8,}$/;
const REGEX_ONLY_NUMBER = /^\d+$/;
const REGEX_PHONE = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;

yup.addMethod(yup.string, "password", function (message) {
    return this.matches(REGEX_PASSWORD, {
        message,
        excludeEmptyString: true,
    });
});

yup.addMethod(yup.string, "onlyNumber", function (message) {
    return this.matches(REGEX_ONLY_NUMBER, {
        message,
        excludeEmptyString: true,
    });
});

yup.addMethod(yup.string, "phone", function (message) {
    return this.matches(REGEX_PHONE, {
        message,
        excludeEmptyString: true,
    });
});

export default yup;
