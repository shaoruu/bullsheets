import SheetModel from '../../models/Sheet'

const Cell = {
  async sheet({ sheet }) {
    return SheetModel.findById(sheet)
  }
}

export default Cell
