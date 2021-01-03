import CellModel from '../../models/Cell'
import SheetModel from '../../models/Sheet'

const Mutation = {
  async createSheet(_, { data }, { pubsub }) {
    const sheet = new SheetModel(data)

    await sheet.save()

    pubsub.publish('sheet', {
      sheet: {
        mutation: 'CREATED',
        data: sheet
      }
    })

    return sheet
  },
  async updateSheet(_, { data }, { pubsub }) {
    const newSheet = await SheetModel.findByIdAndUpdate(data.id, data, {
      new: true,
      upsert: false
    })

    pubsub.publish('sheet', {
      sheet: {
        mutation: 'UPDATED',
        data: newSheet
      }
    })

    return newSheet
  },
  deleteSheet(_, { data: { id } }) {
    return SheetModel.findByIdAndDelete(id)
  },
  async upsertCell(_, { data }, { pubsub }) {
    const { sheet } = data

    let cell
    let mutationType

    if (!data.id) {
      cell = await CellModel.findOne(
        {
          row: data.row,
          col: data.col
        },
        {
          useFindAndModify: false
        }
      )

      if (cell) {
        cell.data = data.data
      } else {
        cell = new CellModel(data)
      }
    }

    if (!cell) {
      mutationType = 'CREATED'
      cell = await CellModel.findByIdAndUpdate(data.id, data, {
        new: true
      })
    }

    pubsub.publish(`cell ${sheet}`, {
      cell: {
        mutation: mutationType || 'UPDATED',
        data: cell
      }
    })

    return cell.save()
  }
}

export default Mutation
