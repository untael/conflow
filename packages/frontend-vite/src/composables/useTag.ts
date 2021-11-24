import Tag from '@/api/Question/Tag'
import { Ref, ref } from 'vue'
import axios from 'axios'
import { plainToClass } from 'class-transformer'


export const useTag = () => {
  const tags: Ref<Tag[]> = ref([])

  const getTags = async () => {
    const plainTags: any[] = (await axios.get(`${import.meta.env.VITE_API_URL}/tags`)).data
    const mappedTags = plainToClass(Tag, plainTags, { excludeExtraneousValues: true })
    return mappedTags
  }
  const postTag = () => {
  }
  return {
    getTags,
  }
}
