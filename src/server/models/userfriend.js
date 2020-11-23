



var Schema = mongoose.Schema
    const userFriendSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Friends'}]
        },
        {timestamps: true})


module.exports = mongoose.model('UserFriends', userFriendSchema)