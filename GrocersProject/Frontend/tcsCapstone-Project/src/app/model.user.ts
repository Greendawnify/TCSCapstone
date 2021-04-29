export class User{
    constructor(
        public isLocked:Boolean, 
        public loginTries:Number, 
        public fName:string, 
        public lName:string, 
        public email:String, 
        public pWord:String, 
        public dob:Date, 
        public phoneNum: String,
        public street:String, 
        public city:String, 
        public state:String, 
        public zip:Number,
        public funds:Number, 
        public actNum:Number, 
        public balance:Number, 
        public ticketRaised:Boolean,
        public autoGenID:string,
        public Orders: [
            { 
                id: Number,
                products: [String],
                cost: number,
                status: string,
                orderDate:string
            }
        ] 
        ){}
}