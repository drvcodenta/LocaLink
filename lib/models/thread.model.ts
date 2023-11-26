import mongoose, { mongo } from "mongoose";

const ThreadSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    communityId: {type: mongoose.Schema.Types.ObjectId, ref: "Community"},
    createdAt: {type: Date, default: Date.now},
    parentId: {type: String},
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
    }]

});

const Thread = mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);

export default Thread;