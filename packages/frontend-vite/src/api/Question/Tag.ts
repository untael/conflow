import { Expose } from 'class-transformer'

export default class Tag {
  @Expose()
  id: string = ''
  @Expose()
  name: string = ''

  get endpoint (): string {
    return 'tags'
  }

  constructor (data: Partial<Tag>) {
    Object.assign(this, data)
  }
}
