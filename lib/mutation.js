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
  },

  addPeopleToCourse: async (root, {courseID, personID}) => {
    let currentCourse
    try {
      const db = await connectDB()
      const student = await db.collection('students').findOne({ _id: ObjectId(personID) })
      if(!student) throw new Error("The person no exist")

      const entityUpdated = await db.collection('courses').findOneAndUpdate(
        { _id: ObjectId(courseID) },
        { $addToSet: { people: ObjectId(personID) } }
      )
      if(!entityUpdated.value) throw new Error("The course no exist")

      currentCourse = entityUpdated.value

    } catch (error) {
      console.log('err: ', error);
    }
    return currentCourse
  }
}
