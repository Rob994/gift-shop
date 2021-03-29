const db = require('./models');
const readXlsxFile = require('read-excel-file/node');

const userIds = {};
const giftIds = {};

readXlsxFile('./data.xlsx').then(async (rows) => {
    // Delete first two rows from excel sheet
    rows.shift();
    rows.shift();

    // Insert Users
    for (let row of rows) {
        if (!userIds[row[2]]) {
            const [number, name] = row[2].split(' ');

            const user = await db.user.create({ name, number });
            userIds[row[2]] = user.id;
        }
    };

    // Insert Gifts
    let giftCounter = 0;
    for (let row of rows) {
        const name = row[3];
        const fromId = userIds[row[4]];

        const gift = await db.gift.create({ name, fromId });
        giftIds[name + fromId + giftCounter] = gift.id;
        giftCounter++;
    };

    // Insert orders
    let orderCounter = 0;
    for (let row of rows) {
        const description = row[5];
        const userId = userIds[row[2]];
        const date = row[1];
        const giftId = giftIds[row[3] + userIds[row[4]] + orderCounter];

        await db.order.create({ description, date, userId, giftId });
        orderCounter++;
    };

    console.log('========= Migration Completed Successfully =========');
    process.exit(0);

})
