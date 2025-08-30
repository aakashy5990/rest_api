const mongoose = require('mongoose');

const DatasetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', index: true },
    data: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dataset', DatasetSchema);


