const {PrismaClient} = require('@prisma/client');
const { hashSync, compareSync } = require('bcrypt');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

const signup = async (req,res) => {
    const {identification, email, password} = req.body;
    console.log(req.body);

    try{
        const user = await prisma.user.findFirst({
            where:{
                OR: [
                    {
                        email: email,
                    },
                    {
                        identification: identification,
                    }
                ]
            }
        });
        console.log(user)
        if(user){
            return res.status(400).send('user alredy exists')
        }else{
            const newUser = await prisma.user.create({
                data:{
                    identification,
                    email,
                    password: hashSync(password,10)
                }
            })
            res.status(201).json({
                message: "user created",
                newUser
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error creating user",
            error,
        })
    }
}



const login = async (req,res) => {
    const {email, password} = req.body;
    console.log(req.body);

    try{
        const userExist = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })

        console.log(userExist);

        if(!userExist){
            return res.status(400).send('user not found');
        }else{
            const passwordIsvalid = compareSync(password, userExist.password)
            if(!passwordIsvalid){
                return res.status(400).send("Invalid password")
            }else{
                const token = jwt.sign({id: userExist.id}, process.env.SECRET, {
                    expiresIn: 86400,
                });
        
                console.log(token)
                res.status(200).json({
                    message: "User logged In",
                    token
                })
            }
        }

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error during login",
            error,
        })
    }
    

}

module.exports = {signup, login}