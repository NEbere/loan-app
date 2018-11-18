'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.createTable('loan_note', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    loanId: {
      type: Sequelize.INTEGER,
      references: {
        key: 'id',
        model: 'loan',
        unique: 'loan_note'
      }
    },
    noteId: {
      type: Sequelize.INTEGER,
      references: {
        key: 'id',
        model: 'note',
        unique: 'loan_note'
      }
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
     })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.dropTable('loan_note');
  }
};
