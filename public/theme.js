// From https://chakra-ui.com/docs/theming/customization/overview. we want to extend default theme but add colors + icons
import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineTextStyles,
  defineRecipe
} from '@chakra-ui/react'

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
  base: {
    pt: '2rem',
    pb: '2rem',
    _invalid: {
      borderColor: 'red.500'
    }
  }
})

const FormErrorRecipe = defineRecipe({
  base: {
    color: 'red.500'
  }
})

export const textStyles = defineTextStyles({
  body: {
    fontSize: 'md',
    lineHeight: 'base'
  },
  heading: {
    fontWeight: 'bold',
    lineHeight: 'shorter'
  }
})

const customConfig = defineConfig({
  theme: {
    breakpoints,
    textStyles,
    tokens: {
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
    },
    recipes: {
      input: InputRecipe,
      formError: FormErrorRecipe
    }
  }
})

export const system = createSystem(defaultConfig, customConfig)
