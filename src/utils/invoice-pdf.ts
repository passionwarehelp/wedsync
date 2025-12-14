import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Invoice, Client, BusinessSettings } from "../types/business";

export async function generateInvoiceHTML(
  invoice: Invoice,
  client: Client,
  settings: BusinessSettings
): Promise<string> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 40px;
          color: #1a1a1a;
          line-height: 1.6;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 30px;
          border-bottom: 3px solid #F5B800;
          margin-bottom: 40px;
        }
        .invoice-title {
          font-size: 36px;
          font-weight: bold;
          color: #F5B800;
          margin-bottom: 8px;
        }
        .invoice-number {
          font-size: 14px;
          color: #666;
        }
        .business-info {
          text-align: right;
        }
        .business-name {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #1a1a1a;
        }
        .business-details {
          font-size: 13px;
          color: #666;
          line-height: 1.8;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 12px;
          font-weight: bold;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }
        .client-info {
          font-size: 14px;
          color: #1a1a1a;
          line-height: 1.8;
        }
        .client-name {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 4px;
        }
        .invoice-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .meta-item {
          flex: 1;
        }
        .meta-label {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }
        .meta-value {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status-paid {
          background: #d1fae5;
          color: #065f46;
        }
        .status-sent {
          background: #dbeafe;
          color: #1e40af;
        }
        .status-overdue {
          background: #fee2e2;
          color: #991b1b;
        }
        .status-draft {
          background: #f3f4f6;
          color: #374151;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }
        thead {
          background: #f8f9fa;
        }
        th {
          padding: 14px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        th:last-child,
        td:last-child {
          text-align: right;
        }
        td {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        tr:last-child td {
          border-bottom: none;
        }
        .item-name {
          font-weight: 500;
          color: #1a1a1a;
        }
        .item-quantity,
        .item-price {
          color: #666;
        }
        .totals {
          margin-top: 30px;
          display: flex;
          justify-content: flex-end;
        }
        .totals-table {
          width: 300px;
        }
        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          font-size: 14px;
        }
        .totals-row.subtotal {
          color: #666;
        }
        .totals-row.tax {
          color: #666;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 12px;
        }
        .totals-row.total {
          font-size: 20px;
          font-weight: bold;
          color: #1a1a1a;
          padding-top: 12px;
        }
        .notes {
          margin-top: 40px;
          padding: 20px;
          background: #f8f9fa;
          border-left: 4px solid #F5B800;
          border-radius: 4px;
        }
        .notes-title {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .notes-content {
          font-size: 14px;
          color: #1a1a1a;
          line-height: 1.8;
        }
        .payment-methods {
          margin-top: 40px;
          padding: 24px;
          background: #fffbeb;
          border: 2px solid #F5B800;
          border-radius: 8px;
        }
        .payment-title {
          font-size: 16px;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 16px;
        }
        .payment-method {
          font-size: 14px;
          color: #1a1a1a;
          margin-bottom: 8px;
          line-height: 1.8;
        }
        .payment-label {
          font-weight: 600;
          color: #666;
          display: inline-block;
          width: 100px;
        }
        .footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 class="invoice-title">INVOICE</h1>
          <p class="invoice-number">#${invoice.invoiceNumber}</p>
        </div>
        <div class="business-info">
          <div class="business-name">${settings.businessName}</div>
          <div class="business-details">
            ${settings.email ? `<div>${settings.email}</div>` : ""}
            ${settings.phone ? `<div>${settings.phone}</div>` : ""}
            ${settings.address?.street ? `<div>${settings.address.street}</div>` : ""}
            ${
              settings.address?.city || settings.address?.state || settings.address?.zipCode
                ? `<div>${[settings.address?.city, settings.address?.state, settings.address?.zipCode]
                    .filter(Boolean)
                    .join(", ")}</div>`
                : ""
            }
          </div>
        </div>
      </div>

      <div class="invoice-meta">
        <div class="meta-item">
          <div class="meta-label">Issue Date</div>
          <div class="meta-value">${new Date(invoice.createdAt).toLocaleDateString()}</div>
        </div>
        ${
          invoice.dueDate
            ? `
        <div class="meta-item">
          <div class="meta-label">Due Date</div>
          <div class="meta-value">${new Date(invoice.dueDate).toLocaleDateString()}</div>
        </div>
        `
            : ""
        }
        <div class="meta-item">
          <div class="meta-label">Status</div>
          <div class="meta-value">
            <span class="status-badge status-${invoice.status}">${invoice.status.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Bill To</div>
        <div class="client-info">
          <div class="client-name">${client.name}</div>
          ${client.businessName ? `<div>${client.businessName}</div>` : ""}
          ${client.email ? `<div>${client.email}</div>` : ""}
          ${client.phone ? `<div>${client.phone}</div>` : ""}
          ${client.address?.street ? `<div>${client.address.street}</div>` : ""}
          ${
            client.address?.city || client.address?.state || client.address?.zipCode
              ? `<div>${[client.address?.city, client.address?.state, client.address?.zipCode]
                  .filter(Boolean)
                  .join(", ")}</div>`
              : ""
          }
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items
            .map(
              (item) => `
            <tr>
              <td class="item-name">${item.serviceName}</td>
              <td class="item-quantity">${item.quantity}</td>
              <td class="item-price">$${item.price.toFixed(2)}</td>
              <td class="item-total">$${item.total.toFixed(2)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="totals">
        <div class="totals-table">
          <div class="totals-row subtotal">
            <span>Subtotal</span>
            <span>$${invoice.subtotal.toFixed(2)}</span>
          </div>
          ${
            invoice.tax && invoice.tax > 0
              ? `
          <div class="totals-row tax">
            <span>Tax</span>
            <span>$${invoice.tax.toFixed(2)}</span>
          </div>
          `
              : ""
          }
          <div class="totals-row total">
            <span>Total Due</span>
            <span>$${invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      ${
        invoice.notes
          ? `
      <div class="notes">
        <div class="notes-title">Notes</div>
        <div class="notes-content">${invoice.notes}</div>
      </div>
      `
          : ""
      }

      ${
        settings.paymentMethods &&
        Object.values(settings.paymentMethods).some((v) => v)
          ? `
      <div class="payment-methods">
        <div class="payment-title">Payment Methods</div>
        ${
          settings.paymentMethods.venmo
            ? `<div class="payment-method"><span class="payment-label">Venmo:</span> ${settings.paymentMethods.venmo}</div>`
            : ""
        }
        ${
          settings.paymentMethods.cashapp
            ? `<div class="payment-method"><span class="payment-label">Cash App:</span> ${settings.paymentMethods.cashapp}</div>`
            : ""
        }
        ${
          settings.paymentMethods.zelle
            ? `<div class="payment-method"><span class="payment-label">Zelle:</span> ${settings.paymentMethods.zelle}</div>`
            : ""
        }
        ${
          settings.paymentMethods.paypal
            ? `<div class="payment-method"><span class="payment-label">PayPal:</span> ${settings.paymentMethods.paypal}</div>`
            : ""
        }
        ${
          settings.paymentMethods.other
            ? `<div class="payment-method">${settings.paymentMethods.other}</div>`
            : ""
        }
      </div>
      `
          : ""
      }

      <div class="footer">
        Thank you for your business!
      </div>
    </body>
    </html>
  `;

  return html;
}

export async function shareInvoice(
  invoice: Invoice,
  client: Client,
  settings: BusinessSettings
): Promise<void> {
  const html = await generateInvoiceHTML(invoice, client, settings);

  // Save HTML to a file
  const filename = `invoice-${invoice.invoiceNumber}.html`;
  const fileUri = `${FileSystem.documentDirectory}${filename}`;

  await FileSystem.writeAsStringAsync(fileUri, html, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  // Share the file
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri, {
      mimeType: "text/html",
      dialogTitle: `Invoice ${invoice.invoiceNumber}`,
      UTI: "public.html",
    });
  } else {
    throw new Error("Sharing is not available on this device");
  }
}
