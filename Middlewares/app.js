const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");


const checkToken = (req,res,next) =>{
    let {token} = req.query;
    if(token == "giveaccess"){
        next();
    }

    throw new ExpressError(401,"ACCESS DENIED!");
}

app.get("/err" , (req,res) =>{
    abcd = abcd;
});

app.get('/admin',(req,res)=>{
    throw new ExpressError(403,"Access to admin is forbidden");
})


app.get("/api" ,checkToken, (req,res) =>{
    res.send("data");
})

app.use((err,req,res,next) =>{
    let {status = 500,message = "Some Error Occured"} = err;
    res.status(status).send(message);
});




app.listen(8080,()=>{
    console.log("server listening to port 8080");
});






/* Notes while doing practical */

// app.use((req,res,next)=>{
//     req.time = new Date(Date.now()).toString(); //Date.now() in javascript returns exact time and exact date 
//                                                 //This is written under a Date() function and applied a method is applied to it 
//                                                 //so that the date can be printed in an readable format  
//     console.log(req.method,req.hostname,req.path,req.time);
//     next();
// });


// let us take an example of an case,the code is written below :
/* app.get("/err" , (req,res) =>{
    abcd = abcd;
});


app.use((err,req,res,next) =>{
    let {status,message} = err;
    res.status(status).send(message);
});


here when the /err api will be called then the below  middleware will be called 
.As the middleware will get executed then then it will try to send response
in response it will try to send the status code and message but it will throw an error
**** The error is not because that abcd = abcd the error will be because there are no status code and 
message defined for the error and that is important to notice in the above code 
.Here we are trying to handle the error by our own so custom express error handler will not intervene here 
,So we are trying to handle the error but while handling the error we are unable to provide status code and 
message and beacuse of that custom error handler will not intervene.
 */

/* In an asynchronous function if an error occured and we are  handling the error explicitly 
by using custom error class then by default express does'nt call the next() method and if next is called 
then we will not be able to handle the error properly so in async function we have to call next() 
explicitly as in simple error handling we write:
throw new ExpressError(); but in async function we have to write
next(new ExpressError(404,"Message not found"));


********************** How you can generate an mongoose error or in which case mongoose error get's generated ***********************
suppose there is an route :
localhost:8080/chats/6516ec3a1623c20a2e3de7b5 
and the chat route is defined asynchronously 
and custom error handling is done 
if i try to change the id then the route will throw
an error which is defined inside the /chats api

suppose I make Id to 6516ec3a1623c20a2e3de7b5 to 
6516ec3a1623c20a2e3de7c6 changing last two positions in the id 
the data with  this 6516ec3a1623c20a2e3de7c6  id will is not present inside the 
database and because of that the route will throw error

now if i make changes to 6516ec3a1623c20a2e3de7c6123helloworld
then mongoose will throw an error because the above id length increased
and the data with the above id length isnot present in the database and this 
mongoose identifies and throw error 

*/

/******************************************               ********************************************************* */
/* How errors are handled */
/* I am writing this type because for now only this types of error handling methods we have learnt and in future 
if we want to built a website we can refer and know what all types of error exists */
// 1.we learnt how normal error can be handled
// 2.We learnt that how asynchronous error can be handled for a specific case
// 3.If there are multiple asynchronous error are there we can handle them by 
// using try catch block
// 4. asyncWrap
           /****** wrapAsync ********/
/* Using  try catch block is a bulky way to handle the error because it becomes repetative and 
consumes lot of lines so to write this try catch block in an better way we can use an functionality or utility 
is wrapAsync 

Basically we will make an new function called wrapAsync
so in order to wrap asynchronous function we are using this function 

This function will be an unique function which will return another function 
and in this function the argument is also an function 

how this will function look:

function wrapAsync(argFunction){
return function(req,res,next){
  argFunction(req,res,next).catch(err) => next(err);
}
}

*/
