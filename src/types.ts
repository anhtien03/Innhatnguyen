export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  saleUnitPrice: number;
  salePrice: number;
  costUnitPrice: number;
  costPrice: number;
  suppVatRate: number;
  itemVatIn: number;
  itemCostTotal: number;
  finish: string;
  supplier: string;
  paidToSupplier: number;
  debtToSupplier: number;
}

export interface Order {
  id: string;
  date: string;
  year: number;
  month: number;
  staff: string;
  clientName: string;
  clientPhone: string;
  clientTaxId: string;
  clientSocial: string;
  clientSource: string;
  clientTier: string;
  vatType: string;
  vatRate: number;
  vatOutAmount: number;
  vatInAmount: number;
  invoiceStatus: string;
  shipType: string;
  shipFee: number;
  adjustType: string;
  adjustAmount: number;
  adjustNote: string;
  subTotal: number;
  finalTotal: number;
  costTotal: number;
  profit: number;
  clientPaid: number;
  clientDebt: number;
  supplierPaid: number;
  supplierDebt: number;
  items: OrderItem[];
}

export interface CustomClient {
  phone: string;
  name: string;
  tier: string;
  source: string;
  taxId: string;
  social: string;
  notes: string;
}

export interface SupplierPayment {
  amount: number;
  date: string;
  note: string;
}

export interface SupplierDir {
  product: string;
  supplier: string;
  phone: string;
  notes: string;
}
