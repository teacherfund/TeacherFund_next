/* global fetch */
import React, { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/core'
import { getCurrentYear, getDateAsYYYYMMDD, isFutureDate } from '../utils/date.utils'
import { formatQueryParams } from '../utils/formatting'
import { PDFDownloadLink } from '@react-pdf/renderer'
import TaxReceiptDocument from '../components/taxReceiptDocument'

const TaxReceiptButton = () => {
  const [transactionsLoading, setTransactionsLoading] = useState(false)
  const [userTransactions, setUserTransactions] = useState(null)
  const [showDownloadLink, setShowDownloadLink] = useState(false)
  const [transactionYears, setTransactionYears] = useState(null)
  const [selectedTaxYear, setSelectedTaxYear] = useState(null)

  const updateTaxReceiptButton = () => {
    const currentYear = getCurrentYear()
    const years = [currentYear]
    const taxDeadline = new Date(currentYear, 4, 15)
    const isBeforeTaxDeadline = isFutureDate(taxDeadline)

    if (isBeforeTaxDeadline) {
      years.push(currentYear - 1)
    }

    setTransactionYears(years)

    if (years.length > 1) {
      setShowDownloadLink(false)
      return
    }

    setSelectedTaxYear(currentYear)
    getUserTransactions(currentYear)
    setShowDownloadLink(true)
  }

  useEffect(() => {
    updateTaxReceiptButton()
  }, [])

  const getUserTransactions = async (year) => {
    const params = {
      start: getDateAsYYYYMMDD(new Date(year, 0, 1)),
      end: getDateAsYYYYMMDD(new Date(year, 11, 31))
    }

    try {
      setTransactionsLoading(true)
      const resStream = await fetch(`/api/user-donations?${formatQueryParams(params)}`)
      const res = await resStream.json()

      if (res && res.length) {
        setUserTransactions(res)
        setShowDownloadLink(true)
      }
    } catch (e) {
    } finally {
      setTransactionsLoading(false)
    }
  }

  const handleSelectTaxYear = (year) => {
    setSelectedTaxYear(year)
    getUserTransactions(year)
  }

  const getSaveFileName = () => {
    return `${selectedTaxYear}-tax-receipt-TF`
  }

  const getTaxReceiptButtonMenu = () => (
    transactionYears &&
    <Menu>
      <MenuButton className='ttu btn-primary tf-lato b tc pa3 w-50 m-auto br-pill pointer'>
      Tax Receipts
      </MenuButton>
      <MenuList>
        {transactionYears.map(year => (
          <MenuItem onClick={() => handleSelectTaxYear(year)} key={year}>
            {year}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )

  const getTaxReceiptDownloadLink = () => (
    <PDFDownloadLink
      className='mt3 ttu btn-primary tf-lato b tc pa3 w-50 br-pill pointer'
      document={<TaxReceiptDocument transactions={userTransactions} />}
      fileName={getSaveFileName()}
      onClick={() => setShowDownloadLink(false)}
    >
      {({ blob, url, loading, error }) => (loading ? 'Preparing Document...' : 'Download Tax Receipt')}
    </PDFDownloadLink>
  )

  return (
    <div className='mb2 mt3'>
      {transactionsLoading
        ? <div className='white no-underline pa3 db ttu br-pill tf-lato b v-mid bg-tf-gray w-50 m-auto tc'>Preparing Document...</div>
        : showDownloadLink
          ? getTaxReceiptDownloadLink()
          : getTaxReceiptButtonMenu()
      }
    </div>
  )
}

export default TaxReceiptButton
