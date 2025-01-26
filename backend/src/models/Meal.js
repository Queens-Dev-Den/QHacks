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
      day: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      protein: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      carbs: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      fat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      calories: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mealplanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      timestamps: true,
      underscored: true,
    });
  
    Meal.associate = (models) => {
      Meal.belongsTo(models.Mealplan, {
        foreignKey: 'workoutId',
        onDelete: 'CASCADE',
      });
    };
  
    return Meal;
  };