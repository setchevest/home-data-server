    import  * as Mongoose from "mongoose";
    import AppConfig from "./../../config/AppConfig";
    
    export class DataAccess {
        static mongooseInstance: any;
        static mongooseConnection: Mongoose.Connection;
        
        constructor () {
        }
        
        static connect (): Mongoose.Connection {
            if(this.mongooseInstance) return this.mongooseInstance;
            
            this.mongooseConnection  = Mongoose.connection;
            this.mongooseConnection.once("open", () => {
                console.log("CONNECTED TO MONGO AT: %d");
            });
            
           this.mongooseInstance = Mongoose.connect(AppConfig.Instance.MONGO_URI);
           return this.mongooseInstance;
        }
        
    }
    DataAccess.connect();
    export default DataAccess;
     