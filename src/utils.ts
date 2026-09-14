export function parseMoney(val: any): number {
  if (!val) return 0;
  if (typeof val === 'number') return val;
  const clean = val.toString().replace(/[^0-9]/g, '');
  return parseFloat(clean) || 0;
}

export function formatNumberString(n: any): string {
  if (n === null || n === undefined || isNaN(n) || n === '') return '';
  return new Intl.NumberFormat('vi-VN').format(Math.round(n));
}

export function formatMoney(n: any): string {
  return new Intl.NumberFormat('vi-VN').format(Math.round(n || 0)) + ' đ';
}

export function isOrderInTimeFilter(orderDateStr: string, filterType: string, selectedYear: number) {
  const oDate = new Date(orderDateStr);
  const now = new Date();

  if (filterType === 'all') return true;
  if (filterType === 'year') return oDate.getFullYear() === selectedYear;
  if (filterType === 'month') {
    return oDate.getFullYear() === now.getFullYear() && oDate.getMonth() === now.getMonth();
  }
  if (filterType === 'week') {
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay() || 7;
    startOfWeek.setDate(now.getDate() - day + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    return oDate >= startOfWeek;
  }
  return true;
}
