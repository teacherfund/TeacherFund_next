/* global fetch */
import React, { useState, useEffect } from 'react'
import { Button, Menu, MenuButton, MenuItem, MenuList, createStandaloneToast } from '@chakra-ui/react'
import { getCurrentYear, formatDateAsYYYYMMDD, isFutureDate, formatTimestamp } from '../utils/date.utils'
import { PDFDownloadLink } from '@react-pdf/renderer'
import TaxReceiptDocument from '../components/taxReceiptDocument'

const GetTaxReceiptsButton = ({ taxYears, handleSelectTaxYear, selectedTaxYear }) => (
  taxYears && taxYears.length > 1
    ? <Menu>
      <MenuButton className='ttu btn-primary tf-lato b tc pa3 w-75 w-50-ns m-auto br-pill pointer'>
      Get Tax Receipt
      </MenuButton>
      <MenuList>
        {taxYears.map(year => (
          <MenuItem onClick={() => handleSelectTaxYear(year)} key={year}>
            {year}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
    : <Button
      className='ttu btn-primary tf-lato b tc m-auto pointer'
      backgroundColor='pencilYellow'
      _hover={{ bg: 'white' }}
      borderRadius='9999px'
      padding='1rem'
      width={['75%', '50%']}
      height='56px'
      onClick={() => handleSelectTaxYear(selectedTaxYear)}
    >
        Get Tax Receipt
    </Button>
)

const TaxReceiptButton = () => {
  const [donationsLoading, setdonationsLoading] = useState(false)
  const [userDonations, setUserDonations] = useState(null)
  const [donationUser, setDonationUser] = useState(null)
  const [showDownloadLink, setShowDownloadLink] = useState(false)
  const [taxYears, setTaxYears] = useState(null)
  const [selectedTaxYear, setSelectedTaxYear] = useState(null)

  const updateTaxReceiptButton = () => {
    const currentYear = getCurrentYear()
    const years = [currentYear]
    const taxDeadline = new Date(currentYear, 3, 15)
    const isBeforeTaxDeadline = isFutureDate(taxDeadline)

    if (isBeforeTaxDeadline) {
      years.push(currentYear - 1)
    } else {
      setSelectedTaxYear(currentYear)
    }

    setTaxYears(years)
    setShowDownloadLink(false)
  }

  useEffect(() => {
    updateTaxReceiptButton()
  }, [])

  const getUserDonations = async (year) => {
    const queryParams = new URLSearchParams({
      start: formatDateAsYYYYMMDD(new Date(year, 0, 1)),
      end: formatDateAsYYYYMMDD(new Date(year, 11, 31))
    })

    try {
      setdonationsLoading(true)
      const resStream = await fetch(`/api/user-donations?${queryParams}`)
      const res = await resStream.json()

      if (res && res.data) {
        const { transactions, user } = res.data
        setUserDonations(transactions)
        setDonationUser(user)
        setShowDownloadLink(true)
      }
    } catch (e) {
      const toast = createStandaloneToast()

      toast({
        title: 'There was an issue processing the documents. Please Try Again.',
        description: 'If the problem persists please reach out to joelwass@theteacherfund.com',
        status: 'error',
        duration: 7000,
        isClosable: true,
        position: 'top'
      })
    } finally {
      setdonationsLoading(false)
    }
  }

  const handleSelectTaxYear = (year) => {
    setSelectedTaxYear(year)
    getUserDonations(year)
  }

  const getSaveFileName = () =>
    `Teacher_Fund_Tax_Receipt_${formatTimestamp(new Date())}`

  const getDownloadLinkText = ({ loading, error }) =>
    loading
      ? 'Preparing Document...'
      : error ? 'Unable to Process' : 'Download Tax Receipt'

  return (
    donationsLoading
      ? <Button
        isLoading
        backgroundColor='pencilYellow'
        height='56px'
        width='50%'
        padding='1.5rem'
        borderRadius='9999px'
        className='white'
      />
      : showDownloadLink
        ? <PDFDownloadLink
          className='db ttu btn-primary tf-lato b tc w-75 w-50-ns m-auto pa3 br-pill pointer'
          document={<TaxReceiptDocument transactions={userDonations} year={selectedTaxYear} user={donationUser} />}
          fileName={getSaveFileName()}
          onClick={() => setShowDownloadLink(false)}
        >
          {pdfState => getDownloadLinkText(pdfState)}
        </PDFDownloadLink>
        : <GetTaxReceiptsButton
          taxYears={taxYears}
          handleSelectTaxYear={handleSelectTaxYear}
          selectedTaxYear={selectedTaxYear}
        />
  )
}

export default TaxReceiptButton
