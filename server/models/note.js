module.exports = (sequelize, DataTypes) => {
    const note = sequelize.define('note', {
        title: {
            type: DataTypes.STRING
        },
        note: {
            type: DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.DATE
        }
    }, 
    {
        tableName: 'note'
    })

    note.associate = (models) => {
        note.belongsTo(
          models.loan,
          {
            through: {
              model: models.loan_note,
              unique: true
            },
            as: 'loan'
          }
        )
      }

    return note
}