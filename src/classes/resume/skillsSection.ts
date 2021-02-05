import {Text} from "../text";

const sectionExample = {
    title: new Text('', ''),
    skills: ['']
}

export class SkillsSection{
    title: Text
    skills: string[]
    constructor(skillsSection = sectionExample) {
        this.title = Text.fromObj(skillsSection.title)
        this.skills = skillsSection.skills
    }
}
