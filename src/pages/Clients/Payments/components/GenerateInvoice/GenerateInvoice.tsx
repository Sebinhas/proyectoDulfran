import React from 'react';
import { PDFViewer, Document, Page, View, Text, Image } from '@react-pdf/renderer';
import styles from './styles';
import logo from '../../../../../../public/standarConectionLOGO.png';
// import electronicSignature from '../../../../../assets/images/signature.jpg';
import { priceFormatter } from '../../../../../helpers/priceFormatter.helper';
// import { Invoices } from '../../useInvoices';
import { DTOPayment } from '../../DTOPayment';

const GenerateInvoice = ({ invoice }: { invoice: DTOPayment }) => {
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

    const fullName = `${invoice.client_first_name} ${invoice.client_second_name} ${invoice.client_first_lastname} ${invoice.client_second_lastname}`.trim();

    return (
        <div>
            <PDFViewer style={{ width: '100%', height: '650px' }}>
                <Document>
                    <Page size="LETTER" style={styles.page}>
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <Image src={logo} style={styles.logo} />
                            </View>
                            <View style={styles.companyInfo}>
                                <Text style={styles.companyName}>Standard Connection S.A.S</Text>
                                <Text style={styles.companyNit}>NIT: {invoice.admin_nit}</Text>
                                <Text style={styles.companyContact}>Tel: (604) 444-5555</Text>
                                <Text style={styles.companyAddress}>Medellín, Colombia</Text>
                            </View>
                            <View style={styles.invoiceInfo}>
                                <Text style={styles.invoiceTitle}>FACTURA DE VENTA</Text>
                                <Text style={styles.invoiceNumber}>{invoice.no_invoice}</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.clientInfo}>
                            <View style={styles.clientDetails}>
                                <Text style={styles.sectionTitle}>DATOS DEL CLIENTE</Text>
                                <Text style={styles.clientName}>{fullName}</Text>
                                <Text style={styles.clientDetail}>CC/NIT: {invoice.client_cedula}</Text>
                                <Text style={styles.clientDetail}>Tel: {invoice.client_phone}</Text>
                                <Text style={styles.clientDetail}>Email: {invoice.client_email}</Text>
                            </View>
                            <View style={styles.periodInfo}>
                                <Text style={styles.sectionTitle}>PERÍODO FACTURADO</Text>
                                <Text style={styles.periodDate}>Del: {invoice.period_start}</Text>
                                <Text style={styles.periodDate}>Al: {invoice.period_end}</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.serviceDetail}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderCell}>Descripción</Text>
                                <Text style={styles.tableHeaderCell}>Período</Text>
                                <Text style={styles.tableHeaderCell}>Valor</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>Servicio de Internet</Text>
                                <Text style={styles.tableCell}>{`${invoice.period_start} - ${invoice.period_end}`}</Text>
                                <Text style={styles.tableCell}>$ {priceFormatter(Number(invoice.amount))}</Text>
                            </View>
                        </View>

                        <View style={styles.paymentStatus}>
                            <Text style={styles.paymentMessage}>{getPaymentMessage(invoice.status)}</Text>
                        </View>

                        <View style={styles.totalSection}>
                            <Text style={styles.totalLabel}>Total a Pagar:</Text>
                            <Text style={styles.totalAmount}>$ {priceFormatter(Number(invoice.amount))}</Text>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Esta factura se asimila en sus efectos legales a una letra de cambio según el Art. 774 del Código de Comercio.
                            </Text>
                            <Text style={styles.footerText}>
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