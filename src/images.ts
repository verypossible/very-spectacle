import * as S from 'string'

const context: any = require.context(
  '../presentations',
  true,
  /\.(jpeg|jpg|png|svg)$/
)

const images = {}

context.keys().map((key: string) => {
  const module = context(key)
  const file = key.split('/').pop()
  const attr = S(file).between('', '.').s
  console.log(attr)
  images[attr] = module
})

export default images
