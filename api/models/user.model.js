import mongoose from 'mongoose'

let schema = mongoose.Schema(
    {
        locale: String,
        family_name: String,
        given_name: String,
        email: String,
        token: String
    },
    {timestamps: true}
);

schema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

const User = mongoose.model("user", schema);

export default User
