export * from './social'
export * from './skillsSection'
export * from './timeNote'

import {Text} from "../text";
import {SkillsSection} from "./skillsSection";
import {Social} from "./social";
import {TimeNote} from "./timeNote";

const resumeExample = {
    photo: '',
    header: new Text(),
    intro: new Text(),
    phone: new Text(),
    email: new Text(),
    address: new Text(),
    social: [new Social()],
    skills: [new SkillsSection()],
    experience: [new TimeNote()],
    education: [new TimeNote()],
}

export class Resume{
    photo: string
    header: Text
    intro: Text
    phone: Text
    email: Text
    address: Text
    social: Social[]
    skills: SkillsSection[]
    experience: TimeNote[]
    education: TimeNote[]


    constructor(resume = resumeExample) {
        this.photo = resume.photo
        this.header = Text.fromObj(resume.header)
        this.intro = Text.fromObj(resume.intro)
        this.phone = Text.fromObj(resume.phone)
        this.email = Text.fromObj(resume.email)
        this.address = Text.fromObj(resume.address)
        this.social = resume.social
        this.skills = resume.skills
        this.experience = resume.experience
        this.education = resume.education
    }
}