// src/modules/invoices/dto/create-invoice.dto.ts
export class CreateInvoiceDto {
  type: 'purchase' | 'sale'; // نوع الفاتورة
  supplier?: string; // المورد (للفواتير المشتريات)
  customer?: string; // العميل (للفواتير المبيعات)
  items: { product_id: number; quantity: number; price: number }[]; // عناصر الفاتورة
}
