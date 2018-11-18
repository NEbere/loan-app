module.exports = (sequelize, DataTypes) => {
    const loan = sequelize.define('loan', {
        bankName: {
            type: DataTypes.STRING
        },
        loanNumber: {
            type: DataTypes.BIGINT(100)
        },
        amount: {
            type: DataTypes.FLOAT(100,2)
        },
        balance: {
            type: DataTypes.FLOAT(100,2)
        },
        partialPayments: {
            type: DataTypes.FLOAT(100,2)
        },
        openingDate: {
            type: DataTypes.DATE
        },
        dueDate: {
            type: DataTypes.DATE
        },
        project: {
            type: DataTypes.STRING
        },
        details: {
            type: DataTypes.STRING
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, 
    {
        tableName: 'loan'
    })

    loan.associate = (models) => {
        loan.belongsToMany(
          models.note,
          {
            through: {
              model: models.loan_note,
              unique: true
            },
            as: 'notes'
          }
        )
      }

    return loan
}