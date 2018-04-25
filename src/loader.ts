import * as React from 'react'
import * as S from 'string'
import * as Spectacle from 'spectacle'

interface ContentConfig {
  content: string
  [key: string]: string | boolean
}

interface PresentationConfig {
  colors: {
    [key: string]: string
  }
  deck: {
    [key: string]: string | string[]
  }
  fonts: {
    [key: string]: string | object
  }
  outline: string[]
}

type Presentation = {
  data: PresentationConfig
}

/** Webpack loader */
const presentationContext = require.context(
  '../presentations/my-first-presentation',
  true,
  /(.*\/.*.yml)$/
)

const parseId = (path: string) => S(path).between('/', '.').s

const getDataFromPath = (path: string) => ({
  data: presentationContext(path),
  id: parseId(path)
})

const createMap = (
  acc: object,
  { data, id }: { data: object; id: string }
) => ({
  ...acc,
  [id]: data
})

/** Load Presentation Configuration */
const pickConfig = (id: string) => id.includes('index')

const loadConfig = presentationContext
  .keys()
  .filter(pickConfig)
  .map(getDataFromPath)
  .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as Presentation

/** Load Slides */
const pickSlides = (id: string) => !id.includes('index')

const loadSlides = presentationContext
  .keys()
  .filter(pickSlides)
  .map(getDataFromPath)
  .reduce(createMap, {})

/** Configure slide & build content */
const buildSlideContents = (slideElements: object) =>
  Object.entries(slideElements).map(
    (
      [component, { content, ...props }]: [string, ContentConfig],
      index: number
    ) =>
      React.createElement(
        Spectacle[component],
        { key: index, ...props },
        content
      )
  )

const slides = loadConfig.data.outline
  .map(slide => loadSlides[slide])
  .map(([config, content], index) =>
    React.createElement(
      Spectacle.Slide,
      { key: index, ...config },
      buildSlideContents(content)
    )
  )

export default { ...loadConfig.data, slides }
