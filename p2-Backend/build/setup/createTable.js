"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = __importStar(require("aws-sdk"));
var user_service_1 = __importDefault(require("../user/user.service"));
var restaurant_service_1 = __importDefault(require("../restaurant/restaurant.service"));
// Set the region
AWS.config.update({ region: 'us-west-2' });
// Create a DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var removeUsers = {
    TableName: 'users'
};
var removeRest = {
    TableName: 'restaurants'
};
var userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};
var restSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'restaurants',
    StreamSpecification: {
        StreamEnabled: false
    }
};
ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(function () {
        ddb.createTable(userSchema, function (err, data) {
            if (err) {
                // log the error
                console.log('Error', err);
            }
            else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(function () {
                    populateUserTable();
                }, 10000);
            }
        });
    }, 5000);
});
function populateUserTable() {
    user_service_1.default.addUser({ name: 'Bob', password: '1234', money: 10, role: 'Customer' }).then(function () { });
    user_service_1.default.addUser({ name: 'Richard', password: 'pass', money: 10, role: 'Customer' }).then(function () { });
    user_service_1.default.addUser({ name: 'Cynthia', password: 'pass', money: 10, role: 'Employee' }).then(function () { });
}
ddb.deleteTable(removeRest, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(function () {
        ddb.createTable(restSchema, function (err, data) {
            if (err) {
                // log the error
                console.log('Error', err);
            }
            else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(function () {
                    populateRestTable();
                }, 10000);
            }
        });
    }, 5000);
});
function populateRestTable() {
    restaurant_service_1.default.addRestaurant({
        name: 'McDonalds',
        chef: 'Ronald',
        rating: 4,
        hours: [],
        img: 'https://corporate.mcdonalds.com/is/image//content/dam/gwscorp/nfl/newsroom/media_assets/The%20Token.png?$MEDIA_LISTING_MODAL_IMAGE$',
        menu: [{ name: 'McDouble', price: 1 }],
        type: 'American'
    });
    restaurant_service_1.default.addRestaurant({ name: 'Wendys', chef: 'Wendy', rating: 3.5, hours: [], img: 'https://img.foodlogistics.com/files/base/acbm/fl/image/2015/08/wendys_co_logo.55d5ec69667bb.png?auto=format&fit=max&w=1200', menu: [{ name: 'Fries', price: 2 }], type: 'American' });
    restaurant_service_1.default.addRestaurant({ name: 'The Krusty Krab', chef: 'SpongeBob', rating: 5, img: 'https://thefreshtoast.com/wp-content/uploads/2017/01/krusty-krab-1-1068x580.jpg', hours: [], menu: [{ name: 'Krabby Patty', price: 5 }, { name: 'Krabby Patty with Cheese', price: 6 }], type: 'Seafood' });
    restaurant_service_1.default.addRestaurant({ name: 'Central Perk', chef: 'Gunther', rating: 10, img: 'https://i.etsystatic.com/13571447/r/il/b9f2e8/2071038622/il_570xN.2071038622_j4vn.jpg', hours: [], menu: [{ name: 'Richael\'s Coffee', price: 5 }], type: 'Coffee' });
}
