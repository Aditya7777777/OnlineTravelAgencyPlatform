class ExpressError extends Error{ //Error is an inbuilt function in  express
    constructor(status,message){
        super();
        this.status = status;
        this.message = message;
    }

}

module.exports = ExpressError;