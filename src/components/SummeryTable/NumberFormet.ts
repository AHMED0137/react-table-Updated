
//  convert number in USD formet
export const NumberFormet = (sum:number) =>{
  return sum.toLocaleString("en-US",{style:"currency",currency:"USD"});
//  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sum)
}