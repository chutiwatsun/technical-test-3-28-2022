/*
This is the model which indicate data from csv to put in database also create a file in uploads
*/

var mongoose  =  require('mongoose');

var csvSchema = new mongoose.Schema({
    ID:{
        type:Number
    },
    AccountID:{
        type:String
    },
    Area:{
        type:String
    },
    Gender:{
        type:String
    },
    MultipleLines:{
        type:String
    },
    InternetService:{
        type:String
    },
    PhoneService:{
        type:String
    },
    StreamingTV:{
        type:String
    },
    StreamingMovies:{
        type:String
    },
    TechSupport:{
        type:String
    },
    FaultPowerOutagePerMonth:{
        type:Number
    },
    FaultCableCutPerMonth:{
        type:Number
    },
    Contract:{
        type:String
    },
    PaperlessBilling:{
        type:String
    },
    PaymentMethod:{
        type:String
    },
    MonthlyCharges:{
        type:Number
    },
    TotalCharges:{
        type:Number
    },
    Churn:{
        type:String
    }
});

module.exports = mongoose.model('customerdata',csvSchema);