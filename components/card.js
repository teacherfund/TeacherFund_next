// White card with a box shadow used for forms, select plans, install instuctions, etc.
import { Box } from '@chakra-ui/core'
import PropTypes from 'prop-types'

const shadowSizes = {
  md: '0 3px 6px rgba(0,0,0, .16)',
  lg: '0 3px 20px rgba(0,0,0, .16)'
}

const Card = ({ shadowSz, children, ...props }) => (
  <Box
    backgroundColor='white'
    padding={{ base: '1.5rem', md: '3.125rem' }}
    boxShadow={shadowSizes[shadowSz]}
    {...props}
  >
    {children}
  </Box>
)

Card.defaultProps = {
  shadowSz: 'md'
}

Card.propTypes = {
  shadowSz: PropTypes.string
}

export default Card
