import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles using Tailwind CSS principles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#f3f4f6',
  },
  section: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  text: {
    fontSize: 12,
    color: '#374151',
  },
  boldText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderColor: '#e5e7eb',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f9fafb',
    padding: 8,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  }
});

const ProductPdf = ({ product }) => {
  if (!product) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>No product data available</Text>
        </Page>
      </Document>
    )
  }

  console.log("product", product)
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Product Receipt</Text>
          <Text style={styles.boldText}>Product Name:</Text>
          <Text style={styles.text}>{product?.name}</Text>
          <Text style={styles.boldText}>Description:</Text>
          <Text style={styles.text}>{product?.description.replace(/<[^>]+>/g, '')}</Text>
          <Text style={styles.boldText}>Brand:</Text>
          <Text style={styles.text}>{product?.brand}</Text>
          <Text style={styles.boldText}>Price:</Text>
          <Text style={styles.text}>${product?.price}</Text>
          <Text style={styles.boldText}>Discount:</Text>
          <Text style={styles.text}>{product?.discount}%</Text>
          <Text style={styles.boldText}>Color:</Text>
          <Text style={styles.text}>{product?.color}</Text>
          <Text style={styles.boldText}>Status:</Text>
          <Text style={styles.text}>{product?.status}</Text>
          <Text style={styles.boldText}>In Stock:</Text>
          <Text style={styles.text}>{product?.inStock ? 'Yes' : 'No'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>User Details</Text>
          {product?.userDetails.map((user, index) => (
            <View key={index}>
              <Text style={styles.boldText}>Name:</Text>
              <Text style={styles.text}>{`${user?.firstName} ${user?.middleName} ${user?.lastName}`}</Text>
              <Text style={styles.boldText}>Address:</Text>
              <Text style={styles.text}>{`${user?.address}, ${user?.city}, ${user?.zipCode}`}</Text>
              <Text style={styles.boldText}>Phone:</Text>
              <Text style={styles.text}>{user?.phome}</Text>
              <Text style={styles.boldText}>Additional Information:</Text>
              <Text style={styles.text}>{user?.additionalInformation}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Category Fields</Text>
          {product.categoryField.map((category, index) => (
            <View key={index}>
              <Text style={styles.boldText}>Name:</Text>
              <Text style={styles.text}>{category?.name}</Text>
              <Text style={styles.boldText}>Description:</Text>
              <Text style={styles.text}>{category?.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Product Images</Text>
          {product.images.map((image, index) => (
            <View key={index}>
              <Image style={styles.image} src={image?.url} />
              <Text style={styles.text}>Uploaded by: {image?.user_id}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
};

export default ProductPdf;
