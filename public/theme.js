// From https://chakra-ui.com/theme. we want to extend default theme but add colors + icons
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fontStack = `"Oswald", Lato, Frutiger, "Frutiger Linotype",
    Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad,
    "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva,
    Arial, sans-serif`

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em'
})

const overrides = {
  breakpoints,
  fonts: {
    body: fontStack,
    heading: fontStack,
    mono: 'Menlo, monospace'
  },
  colors: {
    pencilYellow: '#f6b333',
    leadGray: '#434343',
    eraserPink: '#e06767',
    darkTeal: '#336e7b',
    lightGray: '#95a4a6'
  }
}

export default extendTheme(overrides)
