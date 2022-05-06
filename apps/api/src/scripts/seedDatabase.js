"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.generateComment = exports.generateExperiment = exports.generateExperimentResultHistory = void 0;
var mongodb_1 = require("mongodb");
var dotenv = require("dotenv");
dotenv.config({ path: '../../.env' });
var faker_1 = require("@faker-js/faker");
var axios_1 = require("axios");
var data_1 = require("../common/data");
var types_1 = require("@reputable/types");
var pickRandomFromArray = function (arr) {
    return arr[faker_1.faker.datatype.number({
        min: 0,
        max: Math.max(arr.length - 1, 0)
    })];
};
var getAuth0ManagementAccessToken = function () {
    var options = {
        method: 'POST',
        url: "".concat(process.env.AUTH0_ISSUER_URL, "oauth/token"),
        headers: { 'content-type': 'application/json' },
        data: {
            grant_type: 'client_credentials',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: "".concat(process.env.AUTH0_ISSUER_URL, "api/v2/")
        }
    };
    return axios_1["default"]
        .request(options)
        .then(function (response) {
        return response.data.access_token;
    })["catch"](function (error) {
        console.error(error.response.data);
        return [];
    });
};
var getUsers = function () {
    var options = {
        method: 'GET',
        url: "".concat(process.env.AUTH0_ISSUER_URL, "api/v2/users"),
        params: { search_engine: 'v3' }
    };
    return axios_1["default"]
        .request(options)
        .then(function (response) {
        return response.data;
    })["catch"](function (error) {
        console.error(error);
        return [];
    });
};
var generateResultHistory = function (startDate, endDate) {
    return {
        date: faker_1.faker.date.between(startDate, endDate),
        markerValue: faker_1.faker.datatype.number({ min: 50, max: 200 }),
        imageLink: faker_1.faker.image.imageUrl()
    };
};
var generateExperimentResultHistory = function (length, startDate, endDate) {
    return __spreadArray([], new Array(length), true).map(function () {
        return generateResultHistory(startDate, endDate);
    });
};
exports.generateExperimentResultHistory = generateExperimentResultHistory;
function getRandomSubarray(arr, size) {
    // eslint-disable-next-line prefer-const
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, accessToken, users, newExperiments, experiments, newComments, comments, replies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Starting script...');
                    console.log(types_1.ExperimentStatus);
                    console.log(Object.keys(types_1.ExperimentStatus));
                    console.log(Object.values(types_1.ExperimentStatus));
                    client = new mongodb_1.MongoClient(process.env.DB_URL);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    db = client.db();
                    console.log('Connected to database');
                    console.log('Dropping collections...');
                    return [4 /*yield*/, db.dropCollection('experiments')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.dropCollection('comments')];
                case 3:
                    _a.sent();
                    console.log('Starting experiment seeding');
                    return [4 /*yield*/, getAuth0ManagementAccessToken()];
                case 4:
                    accessToken = _a.sent();
                    console.log('Retrieved access token for auth0');
                    axios_1["default"].defaults.headers['Authorization'] = "Bearer  ".concat(accessToken);
                    console.log('Retrieving possible users we can sample from');
                    return [4 /*yield*/, getUsers()];
                case 5:
                    users = _a.sent();
                    console.log(users);
                    console.log('Retrieved', users.length, 'users');
                    return [4 /*yield*/, Promise.all(__spreadArray([], new Array(40), true).map(function () { return (0, exports.generateExperiment)(users); }))];
                case 6:
                    newExperiments = _a.sent();
                    return [4 /*yield*/, db.collection('experiments').insertMany(newExperiments)];
                case 7:
                    _a.sent();
                    console.log('Inserted documents to db');
                    console.log('Will insert comments... Retrieving sample experiments to attach comments');
                    return [4 /*yield*/, db
                            .collection('experiments')
                            .find({})
                            .toArray()];
                case 8:
                    experiments = _a.sent();
                    console.log('Retrieved experiments, generating comments...');
                    return [4 /*yield*/, Promise.all(__spreadArray([], new Array(120), true).map(function () { return (0, exports.generateComment)(experiments, users); }))];
                case 9:
                    newComments = _a.sent();
                    return [4 /*yield*/, db.collection('comments').insertMany(newComments)];
                case 10:
                    _a.sent();
                    console.log('Will add some replies now');
                    return [4 /*yield*/, db
                            .collection('comments')
                            .find({})
                            .toArray()];
                case 11:
                    comments = _a.sent();
                    return [4 /*yield*/, Promise.all(__spreadArray([], new Array(240), true).map(function () {
                            return (0, exports.generateComment)(experiments, users, comments);
                        }))];
                case 12:
                    replies = _a.sent();
                    return [4 /*yield*/, db.collection('comments').insertMany(replies)];
                case 13:
                    _a.sent();
                    console.log('Added replies!');
                    console.log('Script is done. Exiting...');
                    console.log('Adding communities');
                    return [4 /*yield*/, db.collection('communities').insertMany(data_1.communities)];
                case 14:
                    _a.sent();
                    process.exit(1);
                    return [2 /*return*/];
            }
        });
    });
}
var generateExperiment = function (users) { return __awaiter(void 0, void 0, void 0, function () {
    var startDate, endDate, randomExperiment;
    return __generator(this, function (_a) {
        startDate = faker_1.faker.date.recent(30);
        endDate = faker_1.faker.date.soon(30);
        randomExperiment = {
            title: faker_1.faker.lorem.sentence(6),
            status: Object.values(types_1.ExperimentStatus)[faker_1.faker.datatype.number({
                min: 0,
                max: Object.values(types_1.ExperimentStatus).length - 1
            })],
            experimentPeriod: faker_1.faker.datatype.number({ min: 10, max: 60 }),
            markers: getRandomSubarray(data_1.experimentResultMarkers, faker_1.faker.datatype.number({ min: 1, max: 3 })),
            communities: getRandomSubarray(data_1.communities.map(function (c) { return c.slug; }), faker_1.faker.datatype.number({ min: 1, max: 3 })),
            description: faker_1.faker.lorem.paragraphs(5, '<br/>'),
            createdBy: users[faker_1.faker.datatype.number({ min: 0, max: users.length - 1 })].email
        };
        return [2 /*return*/, randomExperiment];
    });
}); };
exports.generateExperiment = generateExperiment;
/**
 * Generates a random comment and relates them to random experiments and users.
 * @param experiments A list of available experiments that will be linked to generated comments
 * @param users A list of available users that will be linked to generated comments.
 */
var generateComment = function (experiments, users, replyToComments) {
    if (replyToComments === void 0) { replyToComments = []; }
    var randomReplyComment = pickRandomFromArray(replyToComments);
    var randomAuthor = pickRandomFromArray(users);
    var randomExperiment = pickRandomFromArray(experiments);
    return {
        text: faker_1.faker.lorem.paragraph(3),
        author: randomAuthor.email,
        replyTo: replyToComments.length > 0 ? randomReplyComment._id : undefined,
        experiment: replyToComments.length === 0
            ? randomExperiment._id
            : randomReplyComment.experiment,
        createdAt: faker_1.faker.date.recent(4)
    };
};
exports.generateComment = generateComment;
main();
