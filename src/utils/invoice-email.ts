import * as MailComposer from "expo-mail-composer";
import { Invoice, Client, BusinessSettings } from "../types/business";
import { generateInvoiceHTML } from "./invoice-pdf";
import * as FileSystem from "expo-file-system";

export async function sendInvoiceEmail(
  invoice: Invoice,
  client: Client,
  settings: BusinessSettings
): Promise<void> {
  if (!client.email) {
    throw new Error("Client does not have an email address");
  }

  const isAvailable = await MailComposer.isAvailableAsync();
  if (!isAvailable) {
    throw new Error("Email is not available on this device");
  }

  const html = await generateInvoiceHTML(invoice, client, settings);

  // Save HTML to a file to attach
  const filename = `invoice-${invoice.invoiceNumber}.html`;
  const fileUri = `${FileSystem.documentDirectory}${filename}`;

  await FileSystem.writeAsStringAsync(fileUri, html, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  const subject = `Invoice ${invoice.invoiceNumber} from ${settings.businessName}`;
  const body = `Hi ${client.name},

Please find your invoice attached.

Invoice #: ${invoice.invoiceNumber}
Total Due: $${invoice.total.toFixed(2)}
${invoice.dueDate ? `Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}` : "Due: Upon receipt"}

${invoice.notes ? `\nNotes:\n${invoice.notes}\n` : ""}
Thank you for your business!

${settings.businessName}
${settings.email ? settings.email : ""}
${settings.phone ? settings.phone : ""}`;

  await MailComposer.composeAsync({
    recipients: [client.email],
    subject,
    body,
    isHtml: false,
    attachments: [fileUri],
  });
}
