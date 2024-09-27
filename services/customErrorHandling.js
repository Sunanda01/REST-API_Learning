class customErrorHandling extends Error{
      constructor(status,msg){
        super();
        this.status=status;
        this.message=msg;
      }

      static unAuthorisedUser(message="Unauthorised User"){
         return new customErrorHandling(401,message);
      }
}

module.exports=customErrorHandling;