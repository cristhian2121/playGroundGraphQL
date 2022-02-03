'use strict'

const { ObjectId } = require('mongodb')
const connectDB = require("./db")

module.exports = {
  createCourse: async (root, { input }) => {
    // Default values
    const defaults = {
      teacher: "",
      topic: "",
    }
    
    let newCourse = {...defaults, ...input}

    try {
      const db = await connectDB()
      const courseEntity = await db.collection('courses').insertOne(newCourse)
      newCourse._id = courseEntity.insertedId
    } catch (error) {
      console.log('err: ', err);
    }

    return newCourse
  },

  createStudent: async (root, { input }) => {
    let newStudent = {...input}

    try {
      const db = await connectDB()
      const courseEntity = await db.collection('students').insertOne(newStudent)
      newStudent._id = courseEntity.insertedId
    } catch (error) {
      console.log('err: ', err);
    }

    return newStudent
  },

  updateStudent: async (root, { id, entity }) => {
    let studentedited

    try {
      const db = await connectDB()
      const student = await db.collection('students').findOne({ _id: ObjectId(id) })
      studentedited = { ...student, ...entity }
      const entityUpdated = await db.collection('students').updateOne(
        { _id: ObjectId(id) },
        { $set: studentedited }
      )
    } catch (error) {
      console.log('err: ', err);
    }

    return studentedited
  }
}
