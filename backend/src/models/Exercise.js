module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    workoutId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true,
  });

  Exercise.associate = (models) => {
    Exercise.belongsTo(models.Workout, {
      foreignKey: 'workoutId',
      onDelete: 'CASCADE',
    });
  };

  return Exercise;
};