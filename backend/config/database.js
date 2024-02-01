const mongo=require('mongoose')

const connectDataBase=()=>{

    mongo.connect(process.env.Db_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex:true
    }).then((data)=>{
        console.log(`Mongo is connceted with server ${data.connection.host}`);
        
    }).catch((err)=>{
        console.log("Error "+err);
        
    })
}

module.exports=connectDataBase