
module.exports = (sequelize, DataTypes) => {
    const loanNote = sequelize.define('loan_note', {
      loanId: {
        type: DataTypes.INTEGER,
        references: {
          model: "loan",
          key: "id"
        }
      },
      noteId: {
        type: DataTypes.INTEGER,
        references: {
          model: "note",
          key: "id"
        }
      }
    }, {
      tableName: 'loan_note',
      indexes: [{ unique: true, fields: ['loanId', 'noteId'] }]
    })
  
    return loanNote
  }
  