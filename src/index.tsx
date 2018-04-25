import Redbox from 'redbox-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Presentation from './Presentation'

// tslint:disable-next-line:no-any
const ErrorReporter: React.SFC<{ error: any }> = ({ error }) => (
  <Redbox error={error} />
)

const MOUNTNODE = document.getElementById('root')

if (process.env.NODE_ENV === 'development') {
  try {
    ReactDOM.render(<Presentation />, MOUNTNODE)
  } catch (e) {
    ReactDOM.render(<ErrorReporter error={e} />, MOUNTNODE)
  }
} else {
  ReactDOM.render(<Presentation />, MOUNTNODE)
}
