export interface License {
  inn: string,
  kpp: string,
  subject: string,
  startDate: Date,
  expiredDate: Date,
  availableGroups: ProductGroup[]
}

export interface ProductGroup {
  id: number,
  name: string,
  display: string
}
