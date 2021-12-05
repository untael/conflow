import Tag from '@/api/Question/Tag'
import {Ref, ref} from 'vue'
import axios from 'axios'
import {classToPlain, plainToClass} from 'class-transformer'


export const useTag = () => {
    const tags: Ref<Tag[]> = ref([])

    const getTags = async () => {
        const plainTags: any[] = (await axios.get(`${import.meta.env.VITE_API_URL}/tags?_start=0&_limit=200`)).data
        const mappedTags = plainToClass(Tag, plainTags, {excludeExtraneousValues: true})
        return mappedTags
    }
    const createTag = async (tag: Tag) => {
        try {
            const transformedTag = classToPlain(tag)
            await axios.post(`${import.meta.env.VITE_API_URL}/tags`, transformedTag)
        } catch (error) {
            throw new Error()
        }
    }
    return {
        getTags,
        createTag,
    }
}
