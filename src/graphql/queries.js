import { gql } from '@apollo/client'

export const SHEET_QUERY = gql`
  query sheet($id: ID!) {
    sheet(id: $id) {
      name
      cells {
        id
        row
        col
        data
      }
      lastChangedBy
    }
  }
`

export const SHEETS_QUERY = gql`
  query sheets {
    sheets {
      id
      name
    }
  }
`
