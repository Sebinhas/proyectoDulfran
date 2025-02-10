import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: 10,
  },
  logoSection: {
    width: '20%',
  },
  logo: {
    width: 60,
    height: 'auto',
  },
  headerInfo: {
    textAlign: 'center',
    width: '60%',
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  companySub: {
    fontSize: 10,
    color: '#666',
  },
  companyDetails: {
    fontSize: 9,
    marginTop: 3,
  },
  invoiceTitleSection: {
    textAlign: 'right',
    width: '25%',
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  invoiceNumber: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  separator: {
    marginVertical: 10,
    borderBottom: '1px solid #ddd',
  },
  separator2: {
    marginVertical: 8,
    borderBottom: '1px solid #ddd',
  },
  clientSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  clientDetails: {
    width: '60%',
  },
  clientText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  clientSubText: {
    fontSize: 9,
    color: '#555',
    marginTop: 3,
  },
  dateDetails: {
    width: '35%',
    textAlign: 'right',
  },
  dateTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  dateContent: {
    fontSize: 9,
    color: '#555',
    marginTop: 5,
  },
  tableContainer: {
    marginTop: '10px',
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: '5px',
    borderBottom: '1px solid #ccc',
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px',
    borderBottom: '1px solid #eee',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  tableCellHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    width: '25%',
    textAlign: 'center',
  },
  observationsSection: {
    marginTop: 10,
  },
  observationsTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  observationsText: {
    fontSize: 9,
    color: '#555',
    marginTop: 3,
  },
  footer: {
    marginTop: 15,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  signatureSection: {
    marginTop: 10,
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 10,
    marginBottom: 5,
  },
  signatureImage: {
    width: 100,
    height: 40,
  },
  legalText: {
    fontSize: 8,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  clientLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  clientValue: {
    fontSize: 10,
    marginBottom: 5,
  },
  clientInfo: {
    fontSize: 9,
    color: '#555',
    marginBottom: 3,
  },
  dateBox: {
    width: '40%',
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 4,
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateValue: {
    fontSize: 9,
    color: '#555',
  },
});

export default styles;