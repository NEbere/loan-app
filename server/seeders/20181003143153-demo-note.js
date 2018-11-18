'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.bulkInsert('note', [{
    title: "note2",
    note: "test note 2 for loan 1",
    createdAt: "2018-10-03T15:52:12.193Z",
		updatedAt: "2018-10-03T15:52:12.198Z"
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.bulkDelete('loan', null, {});
  }
};
