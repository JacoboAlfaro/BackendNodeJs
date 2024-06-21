const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req,res) => {
    const { name } = req.body;

    try{

        const CategoryExists = await prisma.category.findUnique({
            where: {
                name: name
            }
        })

        if(CategoryExists){
            return res.status(400).json({
                message: "Category alredy exists",
                error: `category with name ${name} alredy exists in DB`
            })
        }
        const newCategory = await prisma.category.create({
            data: { name }
        })

        res.status(201).json({
            message: "Category created",
            newCategory
        })
    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error creating category`,
            error,
        })
    }
}

const getCategories = async (req, res) => {
    try{
        const categories = await prisma.category.findMany();
        console.log(categories);
        res.status(200).json({
            message: "All categories",
            categories
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error creating category`,
            error,
        })
    }
}

module.exports = {createCategory, getCategories}