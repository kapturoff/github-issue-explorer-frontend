export interface ILog {
  _id: string,
  method: keyof typeof MethodsTags
  ip: string
  path: string
  status: number
  requestedAt: string
}

export enum MethodsTags {
  GET = 'green',
  POST = 'blue',
  PUT = 'purple',
  DELETE = 'red',
}
