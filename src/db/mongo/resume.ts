import {Schema, model} from "mongoose"

const resumeSchema = new Schema({
    stringId: {
        type: String,
        required: true,
        unique: true
    },
    spec: Object,
    photo: Object,
    header: Object,
    intro: Object,
    phone: Object,
    email: Object,
    address: Object,
    social: Array,
    skills: Array,
    experience: Array,
    education: Array
})
export default model('Resume', resumeSchema)
