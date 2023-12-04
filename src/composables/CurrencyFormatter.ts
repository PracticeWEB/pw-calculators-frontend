export default function currencyFormatter(value: number) {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0
  })
  return formatter.format(value)
}
