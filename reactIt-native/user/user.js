"use strict";
exports.__esModule = true;
exports.User = exports.PersonalSettings = void 0;
var PersonalSettings = /** @class */ (function () {
    function PersonalSettings() {
        this.backgroundcolor = "";
        this.language = "";
        this.fontstyle = "";
    }
    return PersonalSettings;
}());
exports.PersonalSettings = PersonalSettings;
var User = /** @class */ (function () {
    function User(username, password, role, name, email, age, personalsettings, emailvalidated, phonenumber) {
        this.username = '';
        this.password = '';
        this.role = '';
        this.name = '';
        this.email = '';
        this.age = -1;
        this.phonenumber = "";
        this.personalsettings = new PersonalSettings();
        this.emailvalidated = false;
        this.username = username;
        this.password = password;
        this.role = role;
        this.name = name;
        this.email = email;
        this.age = age;
        this.personalsettings = personalsettings;
        this.emailvalidated = emailvalidated;
        this.phonenumber = phonenumber;
    }
    return User;
}());
exports.User = User;
