export class PersonalSettings {
    public backgroundcolor:string = "";
    public language:string = "";
    public fontstyle:string = "";
}

export class User{
    constructor(username:string, password:string,role:string,name:string,email:string,age:number,personalsettings:PersonalSettings,emailvalidated:boolean, phonenumber?:string) {
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
    username = '';
    password = '';
    role: string = '';
    name: string = '';
    email: string = '';
    age: number = -1;
    phonenumber?: string = "";
    personalsettings: PersonalSettings = new PersonalSettings();
    emailvalidated: boolean = false;
}