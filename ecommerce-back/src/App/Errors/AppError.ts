class AppError {
  public readonly dataObj: object
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = 400, dataObj = {}) {
    this.message = message
    this.statusCode = statusCode
    this.dataObj = dataObj
  }
}

export default AppError
