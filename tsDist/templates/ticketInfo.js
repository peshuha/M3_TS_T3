"use strict";
//import {ITours} from "../models/tours";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTicketElementTemplate = void 0;
// +++ указать возвращающий тип
function initTicketElementTemplate(data, i) {
    var tmpl = "\n       <div  data-item-index=".concat(i, " class=\"ticket-block\">\n           <p>").concat(data, "</p>\n       </div>\n    ");
    return tmpl;
}
exports.initTicketElementTemplate = initTicketElementTemplate;
//# sourceMappingURL=ticketInfo.js.map