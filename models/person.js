const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        if (v.includes('-')) {
          return /^\d{2,3}-\d+$/.test(v)
        } else return /^\d+$/.test(v)
      },
      message:
        'Number can only contain digits. If using a dash symbol, dash can only be preceded by 2 or 3 digits.',
    },
    minLength: 8,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
