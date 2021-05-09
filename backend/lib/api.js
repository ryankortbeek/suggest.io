"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchedEvents = exports.getEvents = void 0;
var axios_1 = __importDefault(require("axios"));
// e.g.getEvents("53.53216861500475", "-113.57363822706881", "40000")
function getEvents(latitude, longitude, radius) {
    var res = axios_1.default.get("https://api.yelp.com/v3/events?latitude=" + latitude + "&longitude=" + longitude + "&radius=" + radius + "&limit=50", {
        headers: {
            "Authorization": "Bearer 1ivgB27DrOOF9NbyWW95E1w3eWxw1MD21uhjZaxI1jPXWaEn-m06uNVdvXVecLc9nt663pSNIdiHIyGYi-UMqBiIw0o_BPhTy50GUYhBMmWyfRNXnOYZurdy7LOWYHYx"
        }
    })
        .then(function (response) {
        var results = {
            id: new Date().getTime(),
            events: response.data.events.map(function (_a) {
                var id = _a.id, name = _a.name, image_url = _a.image_url, description = _a.description;
                return ({ id: id, name: name, image_url: image_url, description: description });
            })
        };
        return results;
    });
    return res;
}
exports.getEvents = getEvents;
function getMatchedEvents(userId) { }
exports.getMatchedEvents = getMatchedEvents;
