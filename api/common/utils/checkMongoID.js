const { Types } = require('mongoose');

exports.checkMongoID = async (id, model) => {
    if (!Types.ObjectId.isValid(id)) return { status: 400, message: "Invalid mongo ID" };
    const existRecord = await model.exists({ _id: id });
    if (!existRecord) return { status: 404, message: "User not found" };
    return true;
}