# Very Spectacle Presentations
This is a simple presentation framework build with [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript) [docs](https://github.com/wmonk/create-react-app-typescript/blob/master/packages/react-scripts/template/README.md) and [Spectacle](http://formidable.com/open-source/spectacle/)

## Getting Started
Clone the project and install the dependencies via `yarn install`.

You can now start the project via `yarn start`.


## Creating Your First Presentation
Navigate to `presentations` and make a new directory called `my-first-presentation`.

### Presentation Config
Within that folder, create your presentation's config in a file named `index.yml`. Every presentation must have this file in order to build.

Config Example:
```
title: My first presentation
description: This is the description

# Set theme colors and fonts for Spectacle:
# https://github.com/FormidableLabs/spectacle#createthemecolors-fonts

colors:
  primary: 'white'
  secondary: '#1F2022'
  tertiary: '#03A9FC'
  quarternary: '#CECECE'

fonts:
  primary: Helvetica
  secondary:
    name: Droid Serif
    googleFont: true
    styles:
      - "400"
      - "700i"

# Configure the <Deck />:
# http://formidable.com/open-source/spectacle/docs/tag-api/#deck

deck:
  transition:
    - zoom
    - slide
  transitionDuration: 500

# Define the order of your presentation.
# The keys must match the slide filenames in your presentation's dir

outline:
  - two
  - one

```

### Making Slides
In the same directory as your config, add slides by creating `*.yml` files.

To include a slide in the presentation, add it to the outline in the config using the filename as the key.

Slide Example:
```
# The front matter are the props for Spectacle's <Slide />:
# http://formidable.com/open-source/spectacle/docs/tag-api/#slide-base
#
# It also takes the "Base" props:
# http://formidable.com/open-source/spectacle/docs/props/
---
  transition:
    - zoom
  bgColor: primary
---

# This is the content of your slide. It accepts any valid Spectacle tag:
# http://formidable.com/open-source/spectacle/docs/tag-api/
#
# You can pass any of the accepted tag's props as a map.
# the 'content' prop is what will get rendered inside the tag.
Heading:
  size: 1
  fit: true
  caps: true
  lineHeight: 1
  textColor: secondary
  content: My First Slide
Text:
  margin: "10px 0 0"
  textColor: tertiary
  fit: true
  bold: true
  content: It's pretty nifty you can build clean presentations with YML
```

### Changing The Active Presentation
In `src/loader`, update the `presentationContext` with the correct location of your presentation:

```
const presentationContext = require.context(
  '../presentations/my-first-presentation',     /** <-------- Update this */
  true,
  /(.*\/.*.yml)$/
)
```
