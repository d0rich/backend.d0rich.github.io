import {JSField, Text} from "./index"

export class JSObject{
    name: Text
    fields: JSField[]
    constructor(fields: JSField[], name: Text) {
        this.name = name
        this.fields = []
        for (const f of fields){
            this.addField(f)
        }
    }

    addField(field: JSField){
        this.fields.push(field)
    }
}
