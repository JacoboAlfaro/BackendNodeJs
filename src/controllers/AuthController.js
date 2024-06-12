const {PrismaClient} = require('@prisma/client');
const { hashSync } = require('bcrypt');
const prisma = new PrismaClient();

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

}

module.exports = {signup, login}