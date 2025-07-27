import React from 'react'
import PropTypes from 'prop-types'
import { Text, Button, CloseButton } from '@chakra-ui/react'
import {
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
  DialogActionTrigger
} from './ui/dialog'

const ExistingDonationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  currentAmount,
  newAmount
}) => {
  return (
    <DialogRoot
      placement='center'
      motionPreset='slide-in-bottom'
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent
        portalled
        backdrop
        width='100%'
        maxWidth='500px'
        className='tf-lato'
        borderRadius='1rem'
        boxShadow='0 10px 25px rgba(0, 0, 0, 0.15)'
      >
        <DialogHeader>
          <DialogTitle className='tf-oswald tf-dark-gray text-center'>
            Looks like you already have a monthly donation
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text
            fontSize='1.1rem'
            marginBottom='1rem'
            className='tf-lato tf-dark-gray text-center leading-relaxed'
          >
            Looks like you already have a monthly donation of <strong>${currentAmount}</strong>,
            we'll update it for you to <strong>${newAmount}</strong> from now on.
          </Text>
        </DialogBody>
        <DialogFooter className='flex justify-center gap-4'>
          <DialogActionTrigger asChild>
            <Button
              onClick={onCancel}
              className='tf-lato btn-alt ttu b tc pa3 br-pill'
              backgroundColor='white'
              color='#336e7b'
              border='2px solid #336e7b'
              borderRadius='9999px'
              padding='0.75rem 1.5rem'
              fontSize='0.9rem'
              fontWeight='bold'
              textTransform='uppercase'
              boxShadow='none'
              _hover={{
                backgroundColor: '#336e7b',
                color: 'white',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(51, 110, 123, 0.3)'
              }}
              transition='all 0.2s ease-in-out'
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={onConfirm}
            className='tf-lato btn-primary ttu b tc pa3 br-pill'
            backgroundColor='#f6b333'
            color='white'
            borderRadius='9999px'
            padding='0.75rem 1.5rem'
            fontSize='0.9rem'
            fontWeight='bold'
            textTransform='uppercase'
            _hover={{
              backgroundColor: 'transparent',
              color: '#f6b333',
              border: '2px solid #f6b333',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(246, 179, 51, 0.3)'
            }}
            transition='all 0.2s ease-in-out'
          >
            Continue
          </Button>
        </DialogFooter>
        <DialogCloseTrigger asChild>
          <CloseButton
            size='sm'
            position='absolute'
            top='1rem'
            right='1rem'
            color='#95a4a6'
            _hover={{
              color: '#434343',
              backgroundColor: 'rgba(149, 164, 166, 0.1)'
            }}
          />
        </DialogCloseTrigger>
      </DialogContent>
    </DialogRoot>
  )
}

ExistingDonationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  currentAmount: PropTypes.number.isRequired,
  newAmount: PropTypes.number.isRequired
}

export default ExistingDonationDialog
