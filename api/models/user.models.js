import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        reuqired: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }, 
    profilePicture: {
        type: String,
        default: "https://www.google.com/imgres?q=circle%20default%20avatar%20unknown%20profile&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F027%2F448%2F973%2Fnon_2x%2Favatar-account-icon-default-social-media-profile-photo-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F27448973-avatar-account-icon-vector-default-social-media-profile-photo&docid=9xh_1eQ22fS0DM&tbnid=Ijas_eh_edIeZM&vet=12ahUKEwiWr4iH-fyJAxWZIxAIHZPBD6cQM3oECGgQAA..i&w=980&h=980&hcb=2&ved=2ahUKEwiWr4iH-fyJAxWZIxAIHZPBD6cQM3oECGgQAA"
    }
},  {timestamps: true},
)

const User = mongoose.model('User', userSchema)

export default User;