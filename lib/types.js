'use strict'

const { ObjectId } = require('mongodb')
const connectDB = require("./db")

module.exports = {
   Course: {
      people: async ({ people }) => {
         let peopleData = []
         try {

            const db = await connectDB()

            const ids = people ? people.map(id => id): []
            if(ids.length) {
               peopleData = await db.collection('students')
                  .find({ _id: { $in: ids } }).toArray()
            }
         } catch(err) {
            errorHandler(error)
         }

         return peopleData
      }
   },
   Person: {
      __resolveType: (person, context, info) => { // special type to interfaces
         if(person.phone){
            return "Monitor"
         }
         return "Student"
      }
   },
   GenericEntity: {
      __resolveType: (entity, context, info) => {
         if(entity.phone) return "Monitor"
         if(entity.avatar) return "Student"
         return "Course"
      }
   }
}