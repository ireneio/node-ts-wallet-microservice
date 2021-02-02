export function isRowsExist(rows: Array<any> | undefined): boolean {
  if(rows) {
    if(rows.length > 0) {
      return true
    }
  }
  return false
}

export function genDateNow(): string {
  return new Date().toISOString()
}

export function arrToPgArr(arr: Array<any>): string {
  const arrToStr = JSON.stringify(arr)
  let arrToPgArr = arrToStr.replace('[', '{')
  arrToPgArr = arrToPgArr.replace(']', '}')
  arrToPgArr = arrToPgArr.replaceAll(':', ',')
  return arrToPgArr
}

export function arrItemToPgArrItem(item: any): string {
  const toStr = JSON.stringify(item)
  let arrItemToPgArrItem = toStr.replaceAll(':', ',')
  return arrItemToPgArrItem
}

export function pgArrToArr(pgArr: string): Array<any> {
  const match = pgArr.match(/[\w.-]+/g)
  if(match) {
    return match.map(Number)
  } else {
    return []
  }
}

export function pgArrToArr2(pgArr: Array<Array<string>>): Array<any> {
  return pgArr.map((item: Array<string>) => {
    const obj: { [index: string]: any } = {}
    if(item.length >= 2) {
      for(let i = 0; i < item.length; i+= 2) {
        obj[item[i]] = item[i + 1]
      }
    }
    return obj
  })
}
