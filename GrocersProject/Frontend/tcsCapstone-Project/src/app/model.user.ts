export class User{
    constructor(
        public isLocked:Boolean, public loginTries:Number, public fName:string, public lName:string, 
        public email:String, public pWord:String, public dob:String, public phoneNum: String,
        public street:String, public city:String, public state:String, public zip:Number,
        public funds:Number, public actNum:Number, public balance:Number, 
        public Orders: [{ id: Number, name: String, quantity: Number}] ){}
}