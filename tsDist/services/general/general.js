"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerConfirmButton = exports.initPostData = exports.initTicketInfo = exports.initTourElemListener = exports.initToursDivElements = exports.initFooterTitle = exports.initHeaderTitle = void 0;
var modalService_1 = require("@services/modal/modalService");
var tours_1 = require("../../templates/tours");
var ticketInfo_1 = require("../../templates/ticketInfo");
var tickets_1 = require("@rest/tickets");
var tickets_2 = require("../../pages/tickets/tickets");
/* Общие методы используются для вставки текста в header   footer*/
/*  -
    - Указать в методах возвращающие типы, типы для параметров, в теле функции также указать типы
*/
function initHeaderTitle(ticketName, selector) {
    var headerElement = document.querySelector('header');
    var targetItem = headerElement === null || headerElement === void 0 ? void 0 : headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}
exports.initHeaderTitle = initHeaderTitle;
function initFooterTitle(ticketName, selector) {
    var headerElement = document.querySelector('footer');
    var targetItem = headerElement === null || headerElement === void 0 ? void 0 : headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}
exports.initFooterTitle = initFooterTitle;
/*  +++++++
    - перенести все методы ниже в раздел services (сюда импортировать и вызывать)
    - создать метод initApp который будет здесь вызываться, в теле метода добавить эти имортированные методы
    - Указать в методах возвращающие типы, типы для параметров, в теле функции также указать типы чтобы не было ошибок
*/
function initToursDivElements(data) {
    if (Array.isArray(data)) {
        var rootElement = document.querySelector('.main-app');
        var tourWrap = document.createElement('div');
        tourWrap.classList.add('tour-wrap');
        // init click for modal
        initTourElemListener(tourWrap);
        var rootElementData_1 = '';
        data.forEach(function (el, i) {
            rootElementData_1 += (0, tours_1.getTourTemplate)(el, i);
        });
        tourWrap.innerHTML = rootElementData_1;
        rootElement === null || rootElement === void 0 ? void 0 : rootElement.appendChild(tourWrap);
    }
}
exports.initToursDivElements = initToursDivElements;
function initTourElemListener(tourWrap) {
    tourWrap.addEventListener('click', function (ev) {
        var targetItem = ev.target;
        var parentItem = targetItem.parentNode;
        var realTarget;
        if (targetItem.hasAttribute('data-tour-item-index')) {
            realTarget = targetItem;
        }
        else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
            realTarget = parentItem;
        }
        if (realTarget) {
            var dataIndex = realTarget.getAttribute('data-tour-item-index');
            (0, modalService_1.openModal)('order', Number(dataIndex));
        }
    });
}
exports.initTourElemListener = initTourElemListener;
function initTicketInfo(ticket) {
    var targetElement = document.querySelector('.ticket-info');
    if (!targetElement)
        return;
    var ticketDescription = ticket === null || ticket === void 0 ? void 0 : ticket.description;
    var ticketOperator = ticket === null || ticket === void 0 ? void 0 : ticket.tourOperator;
    var vipClientType = null;
    if ("vipStatus" in ticket) {
        vipClientType = ticket.vipStatus;
    }
    var ticketElemsArr = [ticketDescription, ticketOperator, vipClientType];
    var ticketElemTemplate = "";
    ticketElemsArr.forEach(function (el, i) {
        ticketElemTemplate += (0, ticketInfo_1.initTicketElementTemplate)(el, i);
    });
    targetElement.innerHTML = ticketElemTemplate;
}
exports.initTicketInfo = initTicketInfo;
function initUserData() {
    var userInfo = document.querySelectorAll('.user-info > p');
    var userInfoObj = {};
    userInfo.forEach(function (el) {
        var inputDataName = el.getAttribute('data-name');
        if (inputDataName) {
            var inputElems = el.querySelector('input');
            userInfoObj[inputDataName] = inputElems === null || inputElems === void 0 ? void 0 : inputElems.value;
        }
    });
    console.log('userInfoObj', userInfoObj);
    return userInfoObj;
}
function initPostData(data) {
    initUserData();
    (0, tickets_1.postTicketData)(data).then(function (data) {
        if (data.success) {
        }
    });
}
exports.initPostData = initPostData;
function registerConfirmButton() {
    var targetEl = document.getElementById('accept-order-button');
    if (targetEl) {
        targetEl.addEventListener('click', function () {
            initPostData(tickets_2.ticketPostInstance);
        });
    }
}
exports.registerConfirmButton = registerConfirmButton;
//# sourceMappingURL=general.js.map