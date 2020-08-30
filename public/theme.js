// From https://chakra-ui.com/theme. we want to extend default theme but add colors + icons
import { theme } from '@chakra-ui/core'

const fontStack = `"Oswald", Lato, Frutiger, "Frutiger Linotype",
    Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad,
    "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva,
    Arial, sans-serif`

const breakpoints = ['30em', '48em', '62em', '80em']
// aliases
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

export default {
  ...theme,
  fonts: {
    body: fontStack,
    heading: fontStack,
    mono: 'Menlo, monospace'
  },
  colors: {
    ...theme.colors,
    pencilYellow: '#f6b333',
    leadGray: '#434343',
    eraserPink: '#e06767',
    darkTeal: '#336e7b',
    lightGray: '#95a4a6',
  },
  icons: {
    ...theme.icons,
  }
}
