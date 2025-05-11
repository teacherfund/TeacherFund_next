// From https://chakra-ui.com/docs/theming/customization/overview. we want to extend default theme but add colors + icons
import { createSystem, defaultConfig, defineConfig, defineTextStyles, defineRecipe } from '@chakra-ui/react'

const fontStack = `"Oswald", Lato, Frutiger, "Frutiger Linotype",
    Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad,
    "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva,
    Arial, sans-serif`

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em'
}

const InputRecipe = defineRecipe({
  baseStyle: {
    field: {
      padding: '2rem 0',
      height: '5rem',
      _invalid: {
        borderColor: 'red.500',
        borderWidth: '0.08rem'
      }
    }
  },
  defaultProps: {
    variant: null
  }
})

const FormErrorRecipe = defineRecipe({
  baseStyle: {
    text: {
      margin: '0',
      marginLeft: '0.3rem'
    }
  },
  defaultProps: {
    variant: null
  }
})

export const textStyles = defineTextStyles({
  body: fontStack,
  heading: fontStack,
  mono: 'Menlo, monospace'
})

const overrides = {
  breakpoints,
  textStyles,
  tokens: {
    colors: {
      pencilYellow: '#f6b333',
      leadGray: '#434343',
      eraserPink: '#e06767',
      darkTeal: '#336e7b',
      lightGray: '#95a4a6'
    }
  },
  recipes: {
    input: InputRecipe,
    formError: FormErrorRecipe
  }
}

const customConfig = defineConfig({
  theme: {
    ...overrides
  }
})

export const system = createSystem(defaultConfig, customConfig)
