CREATE USER petsonality_app WITH CREATEDB PASSWORD 'password';
npx dotenv sequelize db:create
npx sequelize model:generate --name User --attributes fullName:string,userName:string,bio:text,email:string,profilePicture:string,banner:string,websiteLink:string
npx sequelize model:generate --name Tag --attributes tag:string,userId:integer
npx sequelize model:generate --name PetLike --attributes petsId:integer,userId:integer
npx sequelize model:generate --name PetTag --attributes tagId:integer,petIdl:integer
npx sequelize model:generate --name PetType --attributes type:string
npx sequelize model:generate --name CommentLike --attributes commentId:integer,userId:integer
npx sequelize model:generate --name Pet --attributes name:string,description:text,image:string,petTypeId:integer,birthday:dateonly,userId:integer
npx sequelize model:generate --name Comment --attributes title:string,content:text,petId:integer,userId:integer
