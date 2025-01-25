module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      monday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tuesday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      wednesday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      thursday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      friday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      saturday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sunday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      timestamps: true,
      underscored: true,
    });
  
    Schedule.associate = (models) => {
      Schedule.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
    };
  
    return Schedule;
  };