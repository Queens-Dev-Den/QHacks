module.exports = (sequelize, DataTypes) => {
    const Mealplan = sequelize.define('Mealplan', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    }, {
      timestamps: true, // Automatically manage createdAt and updatedAt fields
      underscored: true, // Use snake_case for automatically added fields
    });
  
    Mealplan.associate = (models) => {
      Mealplan.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
      Mealplan.hasMany(models.Meal, {
        foreignKey: 'mealplanId',
        as: 'meals',
        onDelete: 'CASCADE',
      });
    };
  
    return Mealplan;
  };