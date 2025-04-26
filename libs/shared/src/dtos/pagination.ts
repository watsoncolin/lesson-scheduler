export class PaginationDto {
  page?: number = 1
  limit?: number = 50
}

export class PaginatedResponseDto<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
