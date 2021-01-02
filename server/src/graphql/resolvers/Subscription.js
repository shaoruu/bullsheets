import SheetModel from '../../models/Sheet'

const Subscription = {
  cell: {
    async subscribe(_, { sheetId }, { pubsub }) {
      const sheet = await SheetModel.findById(sheetId)

      if (!sheet) {
        throw new Error('Sheet not found')
      }

      return pubsub.asyncIterator(`cell ${sheetId}`)
    }
  },
  sheet: {
    subscribe(_, __, { pubsub }) {
      return pubsub.asyncIterator('sheet')
    }
  }
}

export default Subscription
