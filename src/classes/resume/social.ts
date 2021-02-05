import {Text} from "../text";

const socialExample = {
    title: new Text(),
    link: '',
    icon: ''
}
export class Social{
    title: Text
    link: string
    icon: string
    constructor(social = socialExample) {
        this.title = Text.fromObj(social.title)
        this.link = social.link
        this.icon = social.icon
    }
}
