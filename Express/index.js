// this express is a function here which will be stores in a constant app. THis app will later help in creating the server-side app, this app is an object.
// then express is required
const express= require("express");
const app = express();
const ExpressError = require("./ExpressError");
const cookieParser = require("cookie-parser"); 
const session= require("express-session");
const flash = require("connect-flash");
const path= require("path");
// to print the app what is inside it now run node index.js

// console.dir(app);

// to use view folder for template or styling pages 
app.set("view engine", "ejs");
// helps in rendering path from the folder here for views( path.ejs)
app.set("views", path.join(__dirname,"views"));

// now use method is used to listen all the requests from any URL  i.e. use() checks whether the requests are received or not. res(response) and req (request) are its 2 parameter

// app.use((req,res)=>{
    // console.log(req);
    
    // console.log("request received");

// sending a response(PArsing: converting these http respnses into object and response is in json format)
// written where request is received i.e. inside app.use func and response is shown in the server i.e. in a web page of defined port no.
// one tym one res is accepted for new response run the server again an then use that response.

// res.send("this is a basic response"); 
// res.send({
//     name:"apple",
//     color:"red",
// })
// let code="<h1>Fruits</h1><ul><li>apple</li><li>orange</li></ul>"
// res.send(code)
// })


// get()method is used to route the path
app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("Hello,welcome to the root path");
})
app.get("/apple",(req,res)=>{
    res.send("this is the apple path");
})
app.get("/mango",(req,res)=>{
    res.send("this is the mango path");
    console.log("mankj");
    
})
// now using params which is used to access parameters which we are requesting to the server. It opens page, here response is through text on server so that if other languages are using it it would be easier for them to undestand in a text format rather than js lang. or any other lang.
// app.get("/:username/:id",(req,res)=>{
//     console.log(req.params);
//     res.send("hello, I am root ")    
// })
// OR
app.get("/:username/:id",(req,res)=>{
    let{username,id}=req.params;
    let htlmlStr=`<h1>Welcome to the page of @${username}</h1>`
    // res.send(`Welcome to the page of @${username}`);
    res.send(htlmlStr);
})
// query parameter: this is used as an extra para. to get the particular or deep understanding of what is searched. This is written inside search where we can write extra description which shows information in the backend.
app.get("/search",(req,res)=>{
    // console.log(req.query);
    // res.send("no results");
// OR
 let {q}=req.query;
//  res.send(`search results for query: ${q}`);
if(!q){
    res.send("nothing searched yet.")
}
    res.send(`<h1>search for query ${q} </h1>`)
})


// USING MIDDLEWARE FOR ERROR HANDLING
// app.get("username/:id",async(req,res)=>{
//     let{id}=req.params;
//     let chat = await username.findById(id);
//     if(!chat){
//         next(new ExpressError(404, "chat not found")) 
//     }
//     res.render("edit.ejs",{chat});
// })

// we will use try and catch for asunc error handling
// app.post("usernames",async(req,res)=>{
// try{
// let{ username,id}=  req.body;
// let newUsername= new username({
//     usrname:username,
//     id:id,
//     created_at: new Date(),
// });
// await newUsername.save()
// res.redirect("/usernames")
// }catch(err){
//     next(err);
// }
// });

// WrapAsync :error handler preferred against try and catch
// In this asyncWrap function is created which calls other funcn to handle errors
// function asyncWrap(fn){
//     return function(req,res,next){
//         fn(req,res,next).catch((err)=>next(err));
//     }
// }

// app.get("username/:id",asyncWrap(req,res)=>{
//     let{id}=req.params;
//     let chat = await username.findById(id);
//     if(!chat){
//         next(new ExpressError(404, "chat not found")) 
//     }
//     res.render("edit.ejs",{chat});
// });

//    app.use((err,req,res,next)=>{
//     let{ status=500, message="some error occured"}=err;
//     res.status(status).send(message);
//    })

// THESE ARE THE ERRORS MOSTLY RELATED TO EXPRESS 
// THERE ARE SOME MONGOOSE ERRORS
//    const handleValidationErr= (err)=>{
//     console.log("Validation erroe.Pleaase follow rules");
//     console.dir(err);
//     // to printonly message and not the entire error text
//     console.dir(err.message);
//     return err;   
//    }
//    app.use((err, req,res,next)=>{
//     console.log(err.name);
//     if(err.name ==="ValidationError"){
//         err= handleValidationErr(err);
//     }
//     next(err);
//    })

// SESSION: interaction bwteen client and server (can be multiple or single interaction). Stateful protocol: where info about interaction is saved (eg. ftp=> transactions {name, date, time, reciever etc} from any online paying app etc). Stateless protocol: where no info is saved about interaction (eg http)
// Express sessions: helps in making stateless (http) to stateful (not ftp, but stores info which is required). For this, install express-sessions and require, then pass require arguments

// connect flash: it is used to pop-up the notification when there is any change in a page(update, delete, edit, add etc), and makes sure that thAT Notification appears only once.
// install connect-flash package , require 
// In place of connect-flash, we may use res.locals for this we will req.flash inside res.locals 
const sessionOptions={
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
      req.flash("success","registeres successfully")
    // console.log(req.session.name);
   res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
res.render("page.ejs", { name: req.session.name, msg: req.flash("success") });
})

// app.get("/reqcount",(req,res)=>{
//      if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`sent request ${req.session.count} times`);
// });

// COOKIES: piece of info directed by server where differnt pages allowed to use them. If cookies are sent, they will be applied for all the pages or paths mentioned in the file, it can be verified by using console (application) whie inspecting
// but if we try to print the cookies in paths, the output doesn't print so we will use parse with cookies and install cookies-parse

app.use(cookieParser("secretcode"));

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namaste");
    res.cookie("madeIn" ,"India");
    res.send("sent you some cookies");
})

app.get("/greet", (req,res)=>{
    let{name="anonymous"} = req.cookies;
    res.send(`Hi,${name}`);
})

// SIGNED COOKIES: to check and verifyy if there are any changes done in cookies
// add secretcode in cookieparser
app.get("/getsignedcookies",(req,res)=>{
    res.cookie("made-In","India",{signed: true});
    res.send("signed cookie sent")
})
// here if changes are done in whole value it will print empty string{} , and if change is done only on particular part it will print false (s)
app.get("/verify",(req,res)=>{
console.log(req.signedCookies);
res.send("verified");
});

// it includes all those path which are invalid, this get in non existing path sometime cAN show errortherfore other method use is implemented
// app.get("*",(req,res)=>{
//     res.send("this path doesn't exist");
// });
app.use((req,res)=>{
    res.status(404).send("this path doesn't exist");
});


// Ports: point of network connection or path that connects different web server and execute request an response. If the port no. is wrong then the work defined to that port will not be executed.
// to send request to the server: go to any web page and write localhost:port no. ; this localhost defines that the server is from the our own laptop or computer. If port is valid for now it will show cannot get / .If it is wrong then it will show site can't be reached
// listen: a method or function which forms web server used to take requests(incoming). For this, we define ports
// always ensure to start server(here:node index.js) while defining port or changing the port no., server needs to be restarted every tym.
let port= 8080;
// we will pass arguments i.e. port and call back func {(=>{here we will print})}
app.listen(port, ()=>{
    console.log(`app is listerning to port ${port}`);
    
});