export interface IPupilResponse {
  Items: IPupil[]
  Quantity: number
}

export interface IPupil {
  Id: number
  FirstName: string | null
  SecondName: string | null
  LastName: string | null
}

export interface IVisitsResponse {
  Items: IVisitsList[]
  Quantity: number
}

export interface IVisitsList {
  Id: number
  Title: string
  SchoolboyId: number
  ColumnId: string
}
