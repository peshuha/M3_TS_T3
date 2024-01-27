"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
var Modal = /** @class */ (function () {
    function Modal(template, id) {
        if (id === void 0) { id = null; }
        this.template = template;
        // Уточняем id
        this.id = id || Modal.generateId();
        // Находим предыдущий
        if (Modal._modals.length > 0) {
            // Удаляем его
            var m = Modal._modals.pop();
            m === null || m === void 0 ? void 0 : m.destroy();
        }
        // Собираем в коллекцию нас всех
        Modal._modals.push(this);
    }
    Modal.prototype.open = function () {
        var _a;
        if (!this.template)
            return;
        var w = document.createElement("div");
        w.innerHTML = this.template;
        w.setAttribute("id", this.id);
        w.classList.add("modal-window");
        document.body.append(w);
        // Навешиваем событие закрытия
        (_a = document.querySelector(Modal.getCloseSelector(this.id))) === null || _a === void 0 ? void 0 : _a.addEventListener("click", Modal.onClose);
    };
    Modal.getCloseSelector = function (id) {
        return "#" + id + " .close-modal";
    };
    Modal.onClose = function () {
        var _a, _b;
        // Получаем текущий id
        var m = (_a = Modal.modals) === null || _a === void 0 ? void 0 : _a.pop();
        if (!m) {
            return;
        }
        // Удаляем слушателя
        (_b = document.querySelector(Modal.getCloseSelector(m.id))) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", Modal.onClose);
        // Удаляем мдалку
        m.destroy();
    };
    Modal.prototype.destroy = function () {
        // Убираем отображение
        this.remove();
        // Удаляем себя
        Modal.removeById(this.id);
    };
    Modal.prototype.remove = function () {
        var _a;
        var el = document.getElementById(this.id);
        if (!el) {
            return;
        }
        (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el);
    };
    // static
    // Создает новый Id
    Modal.generateId = function () {
        Modal._n += 1;
        return Modal._uuid + ":" + String(Modal._n);
    };
    Object.defineProperty(Modal, "modals", {
        // Возвращает копию массива ссылок на модалки
        get: function () {
            var a = [];
            Modal._modals.forEach(function (item) { return a.push(item); });
            return a;
        },
        enumerable: false,
        configurable: true
    });
    Modal.getModalById = function (id) {
        for (var i = 0; i < Modal._modals.length; i++) {
            var m = Modal._modals[i];
            // Находим себя в массиве модалок
            if (m.id === id)
                return m;
        }
        return null;
    };
    Modal.removeById = function (id) {
        for (var i = 0; i < Modal._modals.length; i++) {
            var m = Modal._modals[i];
            // Находим себя в массиве модалок
            if (m.id != id)
                continue;
            // Как удалить сам объект?
            // ...
            // Удаляем из коллекции
            Modal._modals.splice(i);
            break;
        }
    };
    Modal.findLast = function () {
        if (!Modal._modals.length)
            return null;
        return Modal._modals[Modal._modals.length - 1];
    };
    // Список всех нас
    Modal._modals = [];
    // default uuid -> generate id
    Modal._uuid = "16f2e8d7-6d03-45c5-9aa2-9d20f1651de1";
    Modal._n = 0;
    return Modal;
}());
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map