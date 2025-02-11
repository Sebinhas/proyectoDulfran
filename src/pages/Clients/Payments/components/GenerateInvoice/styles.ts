import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottom: '1px solid #ddd',
    paddingBottom: 10,
  },
  logoContainer: {
    width: '20%',
  },
  logo: {
    width: 60,
    height: 'auto',
  },
  companyInfo: {
    width: '50%',
    textAlign: 'center',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyNit: {
    fontSize: 10,
    marginBottom: 2,
  },
  companyContact: {
    fontSize: 9,
    marginBottom: 2,
  },
  companyAddress: {
    fontSize: 9,
  },
  invoiceInfo: {
    width: '30%',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 11,
    color: '#666',
  },
  clientInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  clientDetails: {
    width: '60%',
  },
  periodInfo: {
    width: '40%',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
  },
  clientName: {
    fontSize: 11,
    marginBottom: 4,
  },
  clientDetail: {
    fontSize: 9,
    marginBottom: 2,
    color: '#666',
  },
  periodDate: {
    fontSize: 10,
    marginBottom: 2,
  },
  serviceDetail: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 8,
    marginBottom: 4,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1px solid #eee',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
  },
  paymentStatus: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
  },
  paymentMessage: {
    fontSize: 10,
    color: '#444',
    textAlign: 'center',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalAmount: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    borderTop: '1px solid #ddd',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
  separator: {
    borderBottom: '1px solid #ddd',
    marginVertical: 15,
    width: '100%'
  },
});

export default styles;