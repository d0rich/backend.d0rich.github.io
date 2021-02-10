import {Text} from "./text";

const imageExample = {
    src: '',
    phSrc: '',
    alt: new Text(),
    path: ''
}

export class ImageModel{
    alt: Text
    path: string
    src: string
    phSrc: string
    constructor(image = imageExample) {
        this.alt = Text.fromObj(image.alt)
        this.path = image.path
        this.src = image.src
        this.phSrc = image.phSrc
    }

}
