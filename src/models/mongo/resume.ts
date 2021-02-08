import {Schema, model} from "mongoose"

const resumeSchema = new Schema({
    photo: Object,
    header: Object,
    intro: Object,
    phone: Object,
    email: Object,
    address: Object,
    social: Array,
    skills: Array,
    experience: Array,
    education: Array,
})
export default model('Resume', resumeSchema)
