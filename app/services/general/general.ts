import {openModal} from "@services/modal/modalService"
import {ITours} from "../../models/tours/index";
import {getTourTemplate} from "../../templates/tours";
import {EventTarget} from "undici-types/patch";
import {IVipTicket, TicketType} from "../../models/ticket/ticket";
import {initTicketElementTemplate} from "../../templates/ticketInfo";
import {postTicketData} from "@rest/tickets";
import {ticketPostInstance} from "../../pages/tickets/tickets"

/* Общие методы используются для вставки текста в header   footer*/

/*  -
    - Указать в методах возвращающие типы, типы для параметров, в теле функции также указать типы
*/
export function initHeaderTitle(ticketName: string, selector: string) {
    const headerElement: HTMLElement | null= document.querySelector('header');
    const targetItem: HTMLElement | null | undefined= headerElement?.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}

export function initFooterTitle(ticketName: string, selector: string) {
    const headerElement: HTMLElement | null = document.querySelector('footer');
    const targetItem: HTMLElement | null | undefined = headerElement?.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = ticketName;
    }
}


/*  +++++++
    - перенести все методы ниже в раздел services (сюда импортировать и вызывать)
    - создать метод initApp который будет здесь вызываться, в теле метода добавить эти имортированные методы
    - Указать в методах возвращающие типы, типы для параметров, в теле функции также указать типы чтобы не было ошибок
*/
export function initToursDivElements(data: ITours[]): void {

    if (Array.isArray(data)) {
        const rootElement: HTMLElement | null = document.querySelector('.main-app');
        const tourWrap: HTMLElement = document.createElement('div');

        tourWrap.classList.add('tour-wrap');

        // init click for modal
        initTourElemListener(tourWrap);

        let rootElementData = '';
        data.forEach((el, i) => {
            rootElementData += getTourTemplate(el, i);
        });

        tourWrap.innerHTML = rootElementData;
        rootElement?.appendChild(tourWrap) ;
    }
}


export function initTourElemListener(tourWrap): void {
    tourWrap.addEventListener('click', (ev) => {
        const targetItem = ev.target ;
        const parentItem = targetItem.parentNode;
        let realTarget;

        if (targetItem.hasAttribute('data-tour-item-index')) {
            realTarget = targetItem;
        } else if (parentItem && parentItem.hasAttribute('data-tour-item-index')) {
            realTarget = parentItem;
        }

        if (realTarget) {
            const dataIndex = realTarget.getAttribute('data-tour-item-index');
            openModal('order', Number(dataIndex));
        }
    });
}



export function initTicketInfo(ticket: TicketType | IVipTicket) {
    const targetElement: HTMLElement | null = document.querySelector('.ticket-info');
    if(!targetElement)
        return;

    const ticketDescription = ticket?.description;
    const ticketOperator = ticket?.tourOperator;
    let vipClientType: string | null = null;
    if ("vipStatus" in ticket) {
        vipClientType = ticket.vipStatus;
    }


    const ticketElemsArr: [string, string, string | null] = [ticketDescription, ticketOperator, vipClientType];
    let ticketElemTemplate: string = "";

    ticketElemsArr.forEach((el, i) => {
        ticketElemTemplate+= initTicketElementTemplate(el, i);
    });

    targetElement.innerHTML = ticketElemTemplate;

}

function initUserData() {
    const userInfo = document.querySelectorAll('.user-info > p');
    let userInfoObj: {[id: string] : string; } = {};
    userInfo.forEach((el) => {
        const inputDataName: string | null = el.getAttribute('data-name');
        if (inputDataName) {
            const inputElems: HTMLInputElement | null | undefined  = el.querySelector('input');
            userInfoObj[<string>inputDataName] = inputElems?.value;
        }
    });

    console.log('userInfoObj',userInfoObj)
    return userInfoObj;
}

export function initPostData(data: any) {
    initUserData();
    postTicketData(data).then((data) => {
        if (data.success) {

        }
    })
}

