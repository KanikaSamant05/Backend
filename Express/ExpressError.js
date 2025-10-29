// used for error handling using middleware 
// here custom error handling is created 
class ExpressError extends Error{
    constructor(status,message){
        super();
        this.status=status;
        this.message=message;
    }
}
module.exports = ExpressError;