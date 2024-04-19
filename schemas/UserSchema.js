class UserSchema {
  constructor() {
    this.schema = {
      email: {
          type: String,
          required: true,
          unique: true
      },
      password: {
          type: String,
          required: true
      },
      role: {
          type: String,
          enum: ['admin', 'waiter', 'chef'],
          required: true
      }
    };
  }

  validate(user) {
    const errors = [];
    const { email, password, role } = user;

    if (!email) {
        errors.push('Email is required.');
    }
    if (!password) {
        errors.push('Password is required.');
    }
    if (!this.schema.role.enum.includes(role)) {
        errors.push(`Role must be one of the following: ${this.schema.role.enum.join(', ')}.`);
    }

    return errors;
  }

}

module.exports = UserSchema;