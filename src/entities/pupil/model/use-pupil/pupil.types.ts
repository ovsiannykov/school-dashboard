export interface IPupilResponse {
  Items: IPupil[]
  Quantity: number
}

export interface IPupil {
  Id: number
  FirstName: string
  SecondName: string
  LastName: string
}
