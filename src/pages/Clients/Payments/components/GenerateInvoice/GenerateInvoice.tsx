import React from 'react';
import { PDFViewer, Document, Page, View, Text, Image } from '@react-pdf/renderer';
import styles from './styles';
import logo from '../../../../../../public/standarConectionLOGO.png';
// import electronicSignature from '../../../../../assets/images/signature.jpg';
import { priceFormatter } from '../../../../../helpers/priceFormatter.helper';
// import { Invoices } from '../../useInvoices';

const GenerateInvoice = ({ invoice }: { invoice: any }) => {
    const getPaymentMessage = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pagado':
                return 'Factura pagada. ¡Gracias por su pago!';
            case 'vencido':
                return 'Factura vencida. Por favor, póngase en contacto con nosotros para regularizar su situación.';
            case 'pendiente':
                return 'Por favor realice su pago antes de la fecha de vencimiento.';
            default:
                return 'Por favor realice su pago antes de la fecha de vencimiento.';
        }
    };

    return (
        <div>
            <PDFViewer style={{ width: '100%', height: '650px' }}>
                <Document>
                    <Page size="LETTER" style={styles.page}>
                        <View style={styles.headerContainer}>
                            <View style={styles.logoSection}>
                                <Image src={logo} style={styles.logo} />
                            </View>
                            <View style={styles.headerInfo}>
                                <Text style={styles.companyName}>Standard Connection S.A.S</Text>
                                <Text style={styles.companySub}>NIT: 901844427-1</Text>
                                <Text style={styles.companyDetails}>Tel: (604) 444-5555</Text>
                                <Text style={styles.companyDetails}>Medellín, Colombia</Text>
                            </View>
                            <View style={styles.invoiceTitleSection}>
                                <Text style={styles.invoiceTitle}>Factura de Venta</Text>
                                <Text style={styles.invoiceNumber}>N° {invoice?.numberContract}</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.clientSection}>
                            <View style={styles.clientDetails}>
                                <Text style={styles.clientLabel}>Cliente:</Text>
                                <Text style={styles.clientValue}>{invoice?.name}</Text>
                                <Text style={styles.clientInfo}>NIT/CC: {invoice?.client_cedula}</Text>
                                <Text style={styles.clientInfo}>Email: {invoice?.email}</Text>
                                <Text style={styles.clientInfo}>Teléfono: {invoice?.phone}</Text>

                            </View>
                            <View style={styles.dateBox}>
                                <Text style={styles.dateLabel}>Período de Facturación:</Text>
                                <Text style={styles.dateValue}>{invoice?.paymentPeriod}</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.tableContainer}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderCell}>Descripción</Text>
                                <Text style={styles.tableHeaderCell}>Período</Text>
                                <Text style={styles.tableHeaderCell}>Valor</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>Servicio de Internet Banda Ancha</Text>
                                <Text style={styles.tableCell}>{invoice?.paymentPeriod}</Text>
                                <Text style={styles.tableCell}>$ {priceFormatter(invoice?.total)}</Text>
                            </View>
                        </View>

                        <View style={styles.observationsSection}>
                            <View style={styles.separator2} />
                            <Text style={styles.observationsTitle}>Información de Pago:</Text>
                            <Text style={styles.observationsText}>
                                {getPaymentMessage(invoice?.status)}
                                {invoice?.status !== 'pagado' && `\nEstado: ${invoice?.status}`}
                            </Text>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.footer}>
                            <View style={styles.totalSection}>
                                <Text style={styles.totalLabel}>Total a Pagar:</Text>
                                <Text style={styles.totalValue}>$ {priceFormatter(invoice?.total)}</Text>
                            </View>
                            <Text style={styles.legalText}>
                                Esta factura se asimila en sus efectos legales a una letra de cambio según el Art. 774 del Código de Comercio.
                                Después de vencida causará intereses de mora a la tasa máxima legal permitida.
                            </Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default GenerateInvoice;