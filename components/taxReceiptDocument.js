import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  page: {
    flexDirection: 'row'
  }
})

const TaxReceiptDocument = (props) => {
  const { transactions } = props
  console.log(transactions)
  return (
    <Document>
      <Page style={styles.page} size={[1500, 600]} page>
        <View style={styles.image}>
          <Image
            src='/images/Logo_with_text.png'
          />
          <Text>The Teacher Fund EIN: 83-2285506</Text>
        </View>
      </Page>
    </Document>
  )
}

export default TaxReceiptDocument
