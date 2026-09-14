import { useState, useEffect } from 'react';
import { Order, CustomClient, SupplierPayment, SupplierDir } from './types';

const KEYS = {
  ORDERS: 'ems_nhat_nguyen_db_v6_4',
  CLIENTS: 'ems_custom_clients_v6_3',
  PAYMENTS: 'ems_supplier_payments_v6_1',
  SUPPLIER_DIR: 'ems_supplier_dir_v6_1',
};

const DEFAULT_SUPPLIERS: SupplierDir[] = [
  { product: 'Thẻ từ / Thẻ nhựa PVC', supplier: 'Nhà In Ngọc Minh', phone: '0901234567', notes: 'Chuyên thẻ Mifare, thẻ VIP dập số nổi' },
  { product: 'Tờ rơi / Brochure Offset', supplier: 'Nhà In An Nhân', phone: '0908765432', notes: 'Chuyên ghép bài offset khổ lớn giá rẻ' },
  { product: 'Decal cuộn / Tem bảo hành', supplier: 'Tem Nhãn Hoàng Gia', phone: '0912348899', notes: 'Bế demi chuẩn, phủ UV chống trầy' },
  { product: 'Hộp cứng / Bao bì Carton', supplier: 'Bao Bì Khang Thịnh', phone: '0933445566', notes: 'Bồi sóng E, B và làm hộp nam châm' }
];

export function useAppStore() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<CustomClient[]>([]);
  const [payments, setPayments] = useState<Record<string, SupplierPayment[]>>({});
  const [suppliers, setSuppliers] = useState<SupplierDir[]>([]);

  useEffect(() => {
    // Load Orders
    let loadedOrders: Order[] = [];
    const possibleKeys = ['ems_nhat_nguyen_db_v6_4', 'ems_nhat_nguyen_db_v6_3'];
    for (const k of possibleKeys) {
      const data = localStorage.getItem(k);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            loadedOrders = parsed;
            break;
          }
        } catch (e) {}
      }
    }
    setOrders(loadedOrders);

    // Load Clients
    const savedClients = localStorage.getItem(KEYS.CLIENTS);
    if (savedClients) {
      try { setClients(JSON.parse(savedClients)); } catch (e) {}
    }

    // Load Payments
    const savedPayments = localStorage.getItem(KEYS.PAYMENTS);
    if (savedPayments) {
      try { setPayments(JSON.parse(savedPayments)); } catch (e) {}
    }

    // Load Suppliers
    const savedSuppliers = localStorage.getItem(KEYS.SUPPLIER_DIR);
    if (savedSuppliers) {
      try { setSuppliers(JSON.parse(savedSuppliers)); } catch (e) {}
    } else {
      setSuppliers(DEFAULT_SUPPLIERS);
    }
  }, []);

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(newOrders));
  };

  const saveClients = (newClients: CustomClient[]) => {
    setClients(newClients);
    localStorage.setItem(KEYS.CLIENTS, JSON.stringify(newClients));
  };

  const savePayments = (newPayments: Record<string, SupplierPayment[]>) => {
    setPayments(newPayments);
    localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(newPayments));
  };

  const saveSuppliers = (newSuppliers: SupplierDir[]) => {
    setSuppliers(newSuppliers);
    localStorage.setItem(KEYS.SUPPLIER_DIR, JSON.stringify(newSuppliers));
  };

  return {
    orders, saveOrders,
    clients, saveClients,
    payments, savePayments,
    suppliers, saveSuppliers
  };
}
