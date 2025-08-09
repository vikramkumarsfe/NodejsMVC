const { Schema , model } = require("mongoose")

const validateEmail = (email)=> {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //gmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return pattern.test(email)
}

const ProductSchema =  new Schema({
    emai : {
        type : String,
        // validate : {
        //     validator : validateEmail,
        //     message: 'invalid email'
        // }
        match : [
            /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
            'Invalis Api'
        ]
    },
    title : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        maxlength : 150,
    },
    description : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        maxlength : 5000,
    },
    price : {
        type : String,
        rquired : true,
    },
    discount : {
        type : Number,
        default : 0,
    },
    brand : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
    },
    status : {
        type : String,
        default : 'draft',
        enum : ['draft', 'published']
    }
}, {timestamps : true  })

ProductSchema.pre('save', async function(next){
    const count = await model("Product").countDocuments({email : this.email})

    if(count > 0)
    {
        throw next(new Error("Email already exixts"))
    }

    next()
})

const ProductModel = model("Product", ProductSchema)

module.exports = ProductModel