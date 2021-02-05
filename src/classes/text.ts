export class Text{
    ru: string
    en: string
    constructor(ru: string = '', en: string = '') {
        this.ru = ru
        this.en = en
    }

    static fromObj(text: {ru: string, en: string}){
        return new Text(text.ru, text.en)
    }
}
