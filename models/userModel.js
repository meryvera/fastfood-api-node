// const { MongoClient, ObjectId } = require('mongodb');
const bcryptjs = require('bcryptjs');
const UserSchema = require('../schemas/UserSchema');

class UserModel {
  constructor(db) {
    this.db = db;
    this.collection = this.db.collection('users');
    this.schema = new UserSchema();
  }

  async findUserByEmail(email) {
    return await this.collection.findOne({ email });
  }

  async createUser(userData) {
    const validationErrors = this.schema.validate(userData);
    if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(' '));
    }
    const newUser = {
        ...userData,
        password: bcryptjs.hashSync(userData.password, 10)  // Ensure password is hashed
    };
    const result = await this.collection.insertOne(newUser);
    return result.insertedId;
  }

}

module.exports = UserModel;