"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTicketData = exports.getTicketById = void 0;
/* - пример использования методов с generic type <T>
  -  запрос на получение информации о туре
 */
function getTicketById(id) {
    return fetch('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/ticket').then(function (response) { return response.json(); })
        .then(function (data) {
        return data;
    });
}
exports.getTicketById = getTicketById;
// запрос на на отправку данных - пока не используется
function postTicketData(postData) {
    return fetch('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/ticket').then(function (response) { return response.json(); })
        .then(function (data) {
        return data;
    });
}
exports.postTicketData = postTicketData;
//# sourceMappingURL=tickets.js.map