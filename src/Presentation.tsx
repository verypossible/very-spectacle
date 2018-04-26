import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Deck } from 'spectacle'

import createTheme from 'spectacle/lib/themes/default'

import { subscribe } from './loader'
import { renderSlides, subscribeToData } from './parser'

require('normalize.css')

interface State {
  config?: {
    [key: string]: any
  }
  slides?: {
    [key: string]: React.ReactElement<any>
  }
}

export class Presentation extends React.Component<{}, State> {
  state: State = {}

  componentDidMount() {
    const data = subscribeToData(subscribe, this.updateSlide)

    this.setState(data)
  }

  public updateSlide = (slide: object) => {
    const presentation =
      this.state.config && this.state.config.activePresentation

    if (presentation) {
      this.setState({
        [presentation]: {
          ...this.state[presentation],
          ...slide
        }
      })
    }
  }

  render() {
    if (!this.state.config) {
      return <div>Loading...</div>
    }

    const { config, ...presentations } = this.state

    const active = presentations[config.activePresentation]
    const theme = createTheme(active.config.colors, active.config.fonts)

    return (
      <Deck theme={theme} {...active.config.deck}>
        {renderSlides(active)}
      </Deck>
    )
  }
}

export default hot(module)(Presentation)
