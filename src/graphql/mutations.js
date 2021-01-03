import { gql } from '@apollo/client'

export const CREATE_SHEET_MUTATION = gql`
  mutation createSheet($name: String!) {
    createSheet(data: { name: $name }) {
      name
    }
  }
`

export const UPDATE_SHEET_MUTATION = gql`
  mutation updateSheet($id: ID!, $name: String, $lastChangedBy: String) {
    updateSheet(data: { id: $id, name: $name, lastChangedBy: $lastChangedBy }) {
      name
    }
  }
`

export const DELETE_SHEET_MUTATION = gql`
  mutation deleteSheet($id: ID!) {
    deleteSheet(data: { id: $id }) {
      name
    }
  }
`

export const UPSERT_CELL_MUTATION = gql`
  mutation upsertCell(
    $id: ID
    $row: Int!
    $col: Int!
    $data: String!
    $sheet: ID!
  ) {
    upsertCell(
      data: { id: $id, row: $row, col: $col, data: $data, sheet: $sheet }
    ) {
      id
    }
  }
`
