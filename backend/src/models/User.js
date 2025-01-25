const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workoutPlan: {
      type: DataTypes.JSON, // Store the workout plan as a JSON object
      allowNull: true,
    },
  }, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    underscored: true, // Use snake_case for automatically added fields
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Workout, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return User;
};