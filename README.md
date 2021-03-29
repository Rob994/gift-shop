# Gifts Shop Migration App

This NodeJS application used to migrate gifts shop data from .xlsx file to PostgreSQL database.

## Initial configuration

Open the "./config/config.json" file and fill your database connection credentials in the appropiate fields.  
Example:

```json
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "giftShop",
    "host": "127.0.0.1",
    "dialect": "postgres" // <= Specifies the database type
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "giftShop",
    "host": "127.0.0.1",
    "dialect": "postgres" // <= Specifies the database type
  },
  "production": {
    "username": "postgres",
    "password": "postgres",
    "database": "giftShop",
    "host": "127.0.0.1",
    "dialect": "postgres" // <= Specifies the database type
  }
}
```

## 1. How to use

Open project in command line and install dependencies.

```bash
npm install
```

Then run the following command to create an empty database with needed tables and start migrating data into it.

```bash
npm run start
```

When migration will be completed, you will see the "Migration Completed Successfully" message in your command line.

## 2 How to set up the project

Open project in command line and run the following command to clear the existing project

```bash
npm run clear:project
```

Then run this command to create models and migrations

```bash
npm run init:project
```

When models and migrations will be ready, open the **"./models/user.js"** file, and replace **associate** method in line 12 with the following function

```javascript
static associate(models) {
    user.hasOne(models.order, {
        foreignKey: 'userId',
        as: 'order'
    });
    user.hasOne(models.gift, {
        foreignKey: 'fromId',
        as: 'gift'
    });
}
```

Then open the **"./models/gift.js"** file and replace the same function with the following

```javascript
static associate(models) {
    gift.hasOne(models.order, {
        foreignKey: 'giftId',
        as: 'order',
    })
}
```

Now, when everything ready to start the migration, run the following command to create database and start migration

```bash
npm run start
```