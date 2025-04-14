export interface IPaginatedQueryMeta {
  page: number
  pageSize: number
}

export interface IPaginatedDataMeta {
  page: number
  pageSize: number
  total: number
  nextPage: number | null
  prevPage: number | null
}

export interface IPaginatedData<T> {
  data: T[]
  meta: IPaginatedDataMeta
}
