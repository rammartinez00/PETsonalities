"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Pets", [
      {
        name: "Whiskers",
        description: "Whiskers is a fluffy cat who loves to eat.",
        image:
          "https://toppng.com/uploads/preview/cat-cute-eyes-fluffy-kitten-wallpaper-115562294658ub20yzxk4.jpg",
        petTypeId: 1,
        birthday: "2020-07-06",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Balogna",
        description: "its name is balogna because it likes balogna.",
        image: "https://i1.sndcdn.com/avatars-000103501656-iji6a5-t500x500.jpg",
        petTypeId: 2,
        birthday: "2019-07-06",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Snakey",
        description: "My snakey is the cutest little snake.",
        image:
          "https://www.boredpanda.com/blog/wp-content/uploads/2017/11/5a018c7c63a02_YKA8Lnk__700.jpg",
        petTypeId: 6,
        birthday: "2021-10-08",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cutie",
        description: "I love my horse, I am a cat lady and a horse girl. ",
        image:
          "https://img2.10bestmedia.com/Images/Photos/386313/GettyImages-1036724480_54_990x660.jpg",
        petTypeId: 15,
        birthday: "2021-01-10",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Darwin",
        description: "Darwin is the silliest baby gorilla you will ever see!",
        image: "https://cdn.mos.cms.futurecdn.net/fFKbuFcwMyGgGXFjHGDqTh.jpg",
        petTypeId: 16,
        birthday: "2022-01-01",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dobby",
        description: "DOBBY IS A GIANT GUINEA PIG",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Capybara_%28Hydrochoerus_hydrochaeris%29.JPG/1200px-Capybara_%28Hydrochoerus_hydrochaeris%29.JPG",
        petTypeId: 10,
        birthday: "2020-05-11",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Pets", null, {});
  },
};
