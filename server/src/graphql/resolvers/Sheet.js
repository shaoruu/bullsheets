import CellModel from '../../models/Cell'

const Sheet = {
  async cells({ id }) {
    return CellModel.find({ sheet: id })
  }
}

export default Sheet
