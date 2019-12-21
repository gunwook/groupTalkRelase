class CError {
    
    private message : string
    private responseMessage : string
    private stack : string
    private status : number
    private INTERNAL_ERROR : string = "INTERNAL ERROR"

	constructor(err, responseMessage = null) {
		if (!err) {
			let error = new Error();
			this.message = this.INTERNAL_ERROR;
			this.responseMessage = responseMessage || this.INTERNAL_ERROR;
			this.stack = error.stack;
		}
		else if (typeof(err) == "string") {
			let error = new Error();
			this.message = err;
			this.responseMessage = responseMessage || err;
			this.stack = error.stack;
		} else if (err instanceof Error) {
			this.message = err.message;
			this.responseMessage = responseMessage || this.INTERNAL_ERROR;
			this.stack = err.stack;
			this.status = 500;
		} else if (err instanceof CError) {
			this.message = err.message;
			this.responseMessage = err.responseMessage || this.INTERNAL_ERROR;
			this.stack = err.stack;
			this.status = 500;
		}
	}
}

export default CError;
