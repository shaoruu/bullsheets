import CellModel from '../../models/Cell'
import SheetModel from '../../models/Sheet'

const Mutation = {
  createSheet(_, { data }) {
    const sheet = new SheetModel(data)
    return sheet.save()
  },
  updateSheet(_, { data }) {
    return SheetModel.findByIdAndUpdate(data.id, data, {
      new: true,
      upsert: false
    })
  },
  deleteSheet(_, { data: { id } }, { pubsub }) {
    return SheetModel.findByIdAndDelete(id)
  },
  async upsertCell(_, { data }) {
    const { sheet } = data

    if (!data.id) {
      const cell = await CellModel.findOne(
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
        return cell.save()
      }

      const newCell = new CellModel(data)
      return newCell.save()
    }

    return CellModel.findByIdAndUpdate(data.id, data, {
      new: true
    })
  }
}

export default Mutation
