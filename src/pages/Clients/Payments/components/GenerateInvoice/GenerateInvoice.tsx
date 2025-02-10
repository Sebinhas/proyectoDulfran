import React from 'react';
import { PDFViewer, Document, Page, View, Text, Image } from '@react-pdf/renderer';
import styles from './styles';
// import logo from '../../../../../assets/images/productsLanding.png';
// import electronicSignature from '../../../../../assets/images/signature.jpg';
import { priceFormatter } from '../../../../../helpers/priceFormatter.helper';
// import { Invoices } from '../../useInvoices';

const GenerateInvoice = ({ invoice }: { invoice: any }) => {
    return (
        <div>
            <PDFViewer style={{ width: '100%', height: '650px' }}>
                <Document>
                    <Page size="LETTER" style={styles.page}>
                        {/* Encabezado */}
                        <View style={styles.headerContainer}>
                            <View style={styles.logoSection}>
                                {/* <Image src={logo} style={styles.logo} /> */}
                            </View>
                            <View style={styles.headerInfo}>
                                <Text style={styles.companyName}>Santiago Marín</Text>
                                <Text style={styles.companySub}>Nit: 1036952085-2</Text>
                                <Text style={styles.companyDetails}>311 729 5354 | @Santiagomarin0</Text>
                                <Text style={styles.companyDetails}>Turbo, Antioquia</Text>
                            </View>
                            <View style={styles.invoiceTitleSection}>
                                <Text style={styles.invoiceTitle}>Factura de Venta</Text>
                                <Text style={styles.invoiceNumber}>
                                    N° {invoice?.invoiceId?.toString().padStart(4, '0')}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        {/* Sección de Información del Cliente */}
                        {/* <View style={styles.clientSection}>
                            <View style={styles.clientDetails}>
                                <Text style={styles.clientLabel}>Nombre del Paciente:</Text>
                                <Text style={styles.clientValue}>{invoice?.patient}</Text>
                                <Text style={styles.clientLabel}>Señor(es):</Text>
                                <Text style={styles.clientValue}>{invoice?.dentist}</Text>
                                <Text style={styles.clientInfo}>
                                    C.C. o NIT: {invoice?.clinicNit || invoice?.documentNumber}{' '}
                                </Text>
                                <Text style={styles.clientInfo}>Dirección: {invoice?.clinicAddress}</Text>
                                <Text style={styles.clientInfo}>Teléfono: {invoice?.clinicPhone}</Text>
                                <Text style={styles.clientInfo}>Tipo de Pago: {invoice?.order?.typePayment}</Text>
                                {invoice?.order?.typePayment === 'credito' && (
                                    <Text style={styles.clientInfo}>Plazo: {invoice?.order?.datePayment}</Text>
                                )}
                            </View>
                            <View style={styles.dateBox}>
                                <Text style={styles.dateLabel}>Fecha Factura:</Text>
                                <Text style={styles.dateValue}>
                                    {new Date().toLocaleDateString('es-CO', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </Text>
                            </View>
                        </View> */}

                        <View style={styles.separator} />

                        {/* Tabla de Artículos */}
                        <View style={styles.tableContainer}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderCell}>Cantidad</Text>
                                <Text style={styles.tableHeaderCell}>Descripción</Text>
                                <Text style={styles.tableHeaderCell}>Valor Unitario</Text>
                                <Text style={styles.tableHeaderCell}>Valor Total</Text>
                            </View>
                            {invoice?.order?.products?.map((item: any, index: number) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>{item.quantity}</Text>
                                    <Text style={styles.tableCell}>{item.name}</Text>
                                    <Text style={styles.tableCell}>{priceFormatter(item.price)}</Text>
                                    <Text style={styles.tableCell}>$ {priceFormatter(item.price * item.quantity)}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.observationsSection}>
                            <View style={styles.separator2} />
                            <Text style={styles.observationsTitle}>Observaciones:</Text>
                            <Text style={styles.observationsText}>{invoice?.observations}</Text>
                        </View>

                        <View style={styles.separator} />

                        {/* Totales y Firma */}
                        <View style={styles.footer}>
                            <View style={styles.totalSection}>
                                <Text style={styles.totalLabel}>Total:</Text>
                                <Text style={styles.totalValue}>$ {priceFormatter(invoice?.total)}</Text>
                            </View>
                            <View style={styles.signatureSection}>
                                <Text style={styles.signatureText}>Firma Electrónica:</Text>
                                {/* <Image src={electronicSignature} style={styles.signatureImage} /> */}
                            </View>
                            <Text style={styles.legalText}>
                                Esta factura electrónica constituye un título valor de acuerdo con el Art. 3 de la
                                Ley 1231 de 2008. La firma electrónica es equivalente a una firma manuscrita y
                                representa la aceptación de las obligaciones de pago descritas.
                            </Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default GenerateInvoice;