const userMdoal = require("../../modal/user")

const userRegister = async (req, res) => {
    try{
        let password = req.body.password
        let confirmPass = req.body.confirmpassword
        let userId = await userMdoal.count()        
        if(password && confirmPass){
            let userRegister = new userMdoal({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
                userId: userId + 1 
            })
            await userRegister.save()
            res.status(200).render("../views/accontCreated/accountCreated")
        }
    } catch(error){
        console.log(`Error in register account ${error}`);
        if(error.keyPattern.phonenumber){
            res.status(400).send("<h1>This phone is already registered</h1>")
        }else if(error.keyPattern.email){
            res.status(400).send("<h1>This email id is already registered</h1>")
        }else{
            res.status(400).send("Password and confirm password does't match")
        }
    }
}

module.exports = userRegister