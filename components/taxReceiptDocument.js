import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { formatUnixDateAsMMDDYYYY } from '../utils/date.utils'
import { formatCurrency } from '../utils/formatting'

const styles = StyleSheet.create({
  image: {
    width: 150,
    margin: '0 auto',
    height: 75
  },
  page: {
    fontFamily: 'Helvetica',
    color: '#212121',
    fontSize: 14,
    padding: 50
  },
  header: {
    textAlign: 'center',
    margin: '50 0 20 0'
  },
  section: {
    margin: '20 0'
  },
  transactions: {
    width: '75%'
  },
  transactionRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  transactionRowItem: {
    margin: '3 0',
    width: 140
  },
  bold: {
    fontFamily: 'Helvetica-Bold'
  }
})

const getTotalTransactions = (transactions) => {
  if (!transactions) {
    return 0
  }

  return formatCurrency((transactions.reduce((acc, transaction) => acc + transaction.amount, 0)) / 100)
}

const Header = (props) => (
  <View style={styles.header}>
    <Text>{props.text}</Text>
  </View>
)

const Transaction = ({ transaction }) => {
  const { amount, created, description } = transaction
  const createdDate = new Date(created)
  return (
    <View style={styles.transactionRow}>
      <Text style={styles.transactionRowItem}>{formatUnixDateAsMMDDYYYY(createdDate)}</Text>
      <Text style={styles.transactionRowItem}>${formatCurrency(amount / 100)} </Text>
      <Text style={styles.transactionRowItem}>{description || 'cash'} </Text>
    </View>
  )
}

const TransactionsView = ({ transactions }) => (
  <View>
    <View style={styles.transactionRow}>
      <Text style={{ ...styles.transactionRowItem, ...styles.bold }}>Date</Text>
      <Text style={{ ...styles.transactionRowItem, ...styles.bold }}>Amount</Text>
      <Text style={{ ...styles.transactionRowItem, ...styles.bold }}>Description</Text>
    </View>
    <View style={styles.transactions}>
      {transactions.map((transaction, idx) => (
        <Transaction transaction={transaction} key={`transaction-${idx}`} />
      ))}
    </View>
    <View style={styles.section}>
      <Text style={styles.bold}>Total Amount Donated</Text>
      <Text>${getTotalTransactions(transactions)}</Text>
    </View>
  </View>
)

const TaxReceiptDocument = ({ transactions, year }) => {
  return (
    <Document>
      <Page style={styles.page} size='A4' page>
        <View>
          <Image
            style={styles.image}
            src='/images/Logo_with_text.png'
          />
        </View>
        <Header text={`${year} Donations`} />
        <View style={styles.section}>
          <Text>Organzation: The Teacher Fund</Text>
          <Text>EIN: 83-2285506</Text>
          <Text>Donor: Locus Wines</Text>
        </View>
        {transactions &&
          <TransactionsView transactions={transactions} />
        }
      </Page>
    </Document>
  )
}

export default TaxReceiptDocument
