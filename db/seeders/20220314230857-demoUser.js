"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "demo",
          userName: "demo",
          email: "demo@demo.demo",
          hashedPassword:
            "$2a$10$Rpj0KptKModLClfLpIKlNuMM.n2UDUlb7ttMvPMcRCfpg1t.NUIcC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Bob",
          userName: "xXcooldudeXx",
          bio: "This is my bio, I am a very cool person who is awesome and cool!",
          email: "email@email.com",
          profilePicture:
            "https://m.media-amazon.com/images/M/MV5BY2U1OTc1MGUtNDIwNi00MGJiLThmZTEtZWRmNWY0YTJmNjZjXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_QL75_UX500_CR0,47,500,281_.jpg",
          banner:
            "https://www.hummert.com/content/files/images/GrassSeed-banner.jpg",
          hashedPassword:
            "$2a$10$H/.31m5QaAYeZR3.bvmhqeyI1jVgqWf93dPK5/kLGTKGvICHFjaN.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Susan",
          userName: "ILOVECATS",
          bio: "I AM A CRAZY CAT LADY AND A HORSE GIRL",
          email: "meow@meow.com",
          profilePicture:
            "https://www.thewrap.com/wp-content/uploads/2018/06/Robert-De-Niro-Cat-Lady-SNL.jpg",
          banner:
            "https://i.pinimg.com/originals/50/c5/1e/50c51e02a205b44c3449fc128400ff20.jpg",

          hashedPassword:
            "$2a$10$H/.31m5QaAYeZR3.bvmhqeyI1jVgqWf93dPK5/kLGTKGvICHFjaN.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
