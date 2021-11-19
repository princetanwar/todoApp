const userMdoal = require("../../modal/user")

const userRegister = async (req, res) => {
    try{
        const {password,confirmpassword,firstname,lastname,email,phonenumber} = req.body;
        // let password = req.body.password
        // let confirmPass = req.body.confirmpassword
        let userId = await userMdoal.count()        
        if(password === confirmPass){
            let userRegister = new userMdoal({
                firstname: firstname,
                lastname: lastname,
                email: email,
                phonenumber: phonenumber,
                password:password,
                confirmpassword: confirmpassword,
                userId: userId + 1 
            })
            // remove userId and user ObjectId
            await userRegister.save()
            res.status(200).render("../views/accontCreated/accountCreated")
        }
    } catch(error){
        console.log(`Error in register account ${error}`);
        if(error.keyPattern.phonenumber){ // check requied 
            res.status(400).send("<h1>This phone is already registered</h1>")
        }else if(error.keyPattern.email){
            res.status(400).send("<h1>This email id is already registered</h1>")
        }else{
            res.status(400).send("Password and confirm password does't match")
        }
    }
}

module.exports = userRegister