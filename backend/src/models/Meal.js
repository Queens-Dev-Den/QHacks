module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    carbohydrates: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mealplanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Mealplans',
        key: 'id',
      },
    },
  }, {
    timestamps: true,
    underscored: true,
  });

  Meal.associate = (models) => {
    Meal.belongsTo(models.Mealplan, {
      foreignKey: 'mealplanId',
      as: 'mealplan',
      onDelete: 'CASCADE',
    });
  };

  return Meal;
};