module.exports = (sequelize, DataTypes) => {
    const Workout = sequelize.define('Workout', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      timestamps: true, // Automatically manage createdAt and updatedAt fields
      underscored: true, // Use snake_case for automatically added fields
    });
  
    Workout.associate = (models) => {
      Workout.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
      Workout.hasMany(models.Exercise, {
        foreignKey: 'workoutId',
        as: 'exercises',
        onDelete: 'CASCADE',
      });
    };
  
    return Workout;
  };