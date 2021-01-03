import { gql } from '@apollo/client'

export const SHEET_SUBSCRIPTION = gql`
  subscription {
    sheet {
      mutation
      data {
        id
        name
        lastChangedBy
      }
    }
  }
`

export const CELL_SUBSCRIPTION = gql`
  subscription cell($sheetId: ID) {
    cell(sheetId: $sheetId) {
      id
      row
      col
      data
    }
  }
`
