
import {User} from "../models/UserModel.js";
import {generateJWTToken} from "../utils/UserUtils.js";

const loginUser = async (req, res) => {

    const { email, password } = req.body
  
    try{

        const user = await User.findOne({ email })
  
        if (user && (await user.matchPassword(password))) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateJWTToken(user._id),
          })
        } else {
          res.status(401)
          res.json({
            message: 'Invalid email or password'
          })
        }    
    }catch (error){
        console.log(error);
        res.status(404);
        res.json({
            message: error
        })
    }

  }

  export {loginUser}