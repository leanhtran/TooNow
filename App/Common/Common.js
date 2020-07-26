export const formatMoney = money => {
  let value = ''
  if (isNaN(money) || money == null) {
    const x = 0
    value =  x.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '€1,') + ' €'
  } else {
    value =  money.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '€1,') + ' €'
  } 
  return value
}
