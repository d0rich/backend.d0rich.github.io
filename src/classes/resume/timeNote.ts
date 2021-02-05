import {Text} from "../text";

const noteExample = {
    title: new Text(),
    place: new Text(),
    period: {
        begin: new Text(),
        end: new Text()
    },
    description: new Text()
}

export class TimeNote{
    title: Text
    place: Text
    period: {
        begin: Text,
        end: Text
    }
    description: Text

    constructor(note = noteExample) {
        this.title = Text.fromObj(note.title)
        this.place = Text.fromObj(note.place)
        this.period = {
            begin: Text.fromObj(note.period.begin),
            end: Text.fromObj(note.period.end)
        }
        this.description = Text.fromObj(note.description)
    }

}
