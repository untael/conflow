import {Expose, Type} from 'class-transformer'
import Tag from "@/api/Question/Tag";

export default interface IQuestion {
    id: string;
    name: string
    description: string
    answer?: string
    mark?: number
    rating?: string
    code?: any
    date_start: Date | null
    date_end: Date | null
    time_spent: number
    type: string
    tags: Tag[]
    // readonly is_completed: boolean
    // readonly is_in_progress: boolean
    // readonly start: () => void
    // readonly end: () => void
}

export default class Question implements IQuestion {
    @Expose()
    id = ''
    @Expose()
    name = ''
    @Expose()
    description = ''
    @Expose()
    answer?: string = ''
    @Expose()
    mark?: number = 0
    @Expose()
    rating?: number = 0
    @Expose()
    code?: any
    @Expose()
    date_start: null
    @Expose()
    date_end: null
    @Expose()
    time_spent: number = 0
    time_spent_description: string = ''
    @Expose()
    type: string = ''
    @Expose()
    @Type(() => Tag)
    tags: Tag[] = []

    get is_in_progress() {
        return !!this.date_start
    }

    get is_completed() {
        return !!this.time_spent
    }

    start() {
        this.date_start = new Date()
    }

    end() {
        this.date_end = new Date()
        this.time_spent = this.date_end - this.date_start
    }

    //ToDo: 3 sec should looks like 0:03 instead of 0:3
    get formatted_time_spent() {
        const minutes = Math.round(this.time_spent / 60000)
        const seconds = Math.round((this.time_spent % 60000) / 1000)
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    constructor(data: any) {
        Object.assign(this, data)
    }
}
