"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTours = void 0;
function getTours() {
    return fetch('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/').then(function (response) { return response.json(); });
}
exports.getTours = getTours;
//# sourceMappingURL=tours.js.map