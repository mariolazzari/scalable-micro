export class Order {
  constructor(
    public id: number,
    public customerName: string,
    public items: string[],
    public totalAmount: number
  ) {}
}

export class ApiResponse<T> {
  constructor(
    public status: string,
    public message: string,
    public data: T[]
  ) {}
}
