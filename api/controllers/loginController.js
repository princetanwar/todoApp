const registerModal = require("../../modal/user")
const bcrypt = require("bcrypt")
const loginController = async  (req, res) => {
    try{
        const {email,password} = req.body;
        let getAccount = await registerModal.findOne({email: email})
        if(!getAccount){
            res.status(400).send("<h1>We don't have any account with your email id</h1>")
            return
        }
            let matchPassword = await bcrypt.compare(password, getAccount.password)

            if(!matchPassword){
                res.status(400).send("<h1>Your password dose't match</h1>")
                return
            }

                await getAccount.genrateJwtToken()
                res.status(200).render("../views/dashboard/dashboard")
            
       
    }catch(error){
        console.log(`Error from login controller ${error}`)
    }
}

module.exports = loginController