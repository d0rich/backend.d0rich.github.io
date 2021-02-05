import {Text} from "./text"

export class JSField{
    key: Text
    value: Text
    constructor(field: {key: Text, value: Text}) {
        this.key = Text.fromObj(field.key)
        this.value = Text.fromObj(field.value)
    }

}
