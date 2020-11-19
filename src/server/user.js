
const bcrypt = require('bcrypt');
const express = require('express');

const userSchema = new mongoose.Schema({
    name: { 
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
},
    email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
    },
    password: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 5
    },
    isGoldMember: {
    type: Boolean,
    default: false
    },
    shoppingCart: {
    type: [productSchema],
    default: []
    },
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, name: this.name }, config.get('jwtSecret'));
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    });
return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;



router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        const salt = await bcrypt.genSalt(10);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
    });

    await user.save();

    const token = user.generateAuthToken();
    
    return res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send({ _id: user._id, name: user.name, email: user.email });
}   catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
}
});
