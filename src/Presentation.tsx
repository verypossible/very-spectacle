import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Deck } from 'spectacle'

import createTheme from 'spectacle/lib/themes/default'

import config from './loader'
// import Slide from './Slide'

import './images'

require('normalize.css')

const theme = createTheme(config.colors, config.fonts)

interface State {
  // tslint:disable-next-line:no-any
  slides?: React.ReactElement<any>[]
}

export class Presentation extends React.Component<{}, State> {
  state: State = {}

  componentDidMount() {
    console.log(config.slides)

    this.setState({
      slides: config.slides
    })
  }

  render() {
    if (!this.state.slides) {
      return <div>Loading...</div>
    }

    return (
      <Deck theme={theme} {...config.deck}>
        {this.state.slides.map((slide, index) => {
          return React.cloneElement(slide, { key: index })
        })}
      </Deck>
    )
  }
}

export default hot(module)(Presentation)
