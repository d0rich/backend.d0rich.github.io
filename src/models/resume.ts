import {Schema, model} from "mongoose"
import {Resume} from "../classes/resume";

const resumeSchema = new Schema(typeof Resume)
export default model('Resume', resumeSchema)
