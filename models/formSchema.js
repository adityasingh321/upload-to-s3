const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const contactListSchema = new Schema({
   
    listTitle: {
        type: String
    },
    fileLocation: {
        type: String
    },
    uploadedBy: {
        type: String,
        default: "Admin"
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    clientApproval: {
        type: String
    },
    filterTags: {
        type: String
    },
    fileNotes: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("contactLists", contactListSchema)


