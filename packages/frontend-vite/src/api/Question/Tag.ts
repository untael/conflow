import {Expose} from "class-transformer";

export default class Tag {
    @Expose()
    id: string = ''
    @Expose()
    name: string = ''

    constructor(data: Partial<Tag>) {
        Object.assign(this, data)
    }
}