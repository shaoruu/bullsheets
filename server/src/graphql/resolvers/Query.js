import SheetModel from '../../models/Sheet'

const Query = {
  sheet(_, { id }) {
    return SheetModel.findById(id)
  },
  sheets() {
    return SheetModel.find()
  }
}

export default Query
