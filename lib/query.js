'use strict'

const { ObjectId } = require('mongodb')
const connectDB = require("./db")
const errorHandler = require('./errorHandler')

module.exports = {
  getCourses: async () => {
    let courses = []

    try {
      const db = await connectDB()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return courses
  },
  getCourse: async (root, { id }) => {
    let course

    try {
      const db = await connectDB()
      course = await db.collection('courses').findOne({ _id: ObjectId(id) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  getStudents: async () => {
    let students = []

    try {
      const db = await connectDB()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return students
  },
  getStudent: async (root, { id }) => {
    let db
    let student

    try {
      db = await connectDB()
      student = await db.collection('students').findOne({ _id: ObjectId(id) })
    } catch (error) {
      errorHandler(error)
    }

    return student
  }
}