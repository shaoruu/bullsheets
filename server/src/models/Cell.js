import { model, Schema } from "mongoose";

const cellSchema = new Schema({
  row: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  col: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  data: {
    type: String,
    default: ''
  },
  sheet: {
    type: Schema.Types.ObjectId,
    ref: 'Sheet'
  }
});

export default model("Cell", cellSchema);