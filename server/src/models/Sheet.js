import { model, Schema } from "mongoose";

const sheetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cells: [{
    type: Schema.Types.ObjectId,
    ref: 'Cell'
  }],
  lastChangedBy: {
    type: String,
    default: ''
  }
});

export default model("Sheet", sheetSchema);