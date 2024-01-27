
export interface IModal {
    // id
    id: string
    // Отображает его на экране
    open(): void;
    // Убирает отображение
    remove(): void;
    // Удаляет объект
    destroy(): void;
}

export class Modal implements IModal{

    public readonly id: string
    private template: string

    // Список всех нас
    private static _modals: IModal[] = [];

    // default uuid -> generate id
    private static readonly _uuid: string = "16f2e8d7-6d03-45c5-9aa2-9d20f1651de1"
    private static _n: number = 0;

    constructor(template: string, id: string | null = null) {

        this.template = template

        // Уточняем id
        this.id = id || Modal.generateId();

        // Находим предыдущий
        if(Modal._modals.length > 0) {

            // Удаляем его
            const m:IModal | undefined = Modal._modals.pop();
            m?.destroy();
        }

        // Собираем в коллекцию нас всех
        Modal._modals.push(this);
    }

    public open(): void {

        if(!this.template)
            return

        let w = document.createElement("div")
        w.innerHTML = this.template
        w.setAttribute("id", this.id)
        w.classList.add("modal-window")
        document.body.append(w)

        // Навешиваем событие закрытия
        document.querySelector(Modal.getCloseSelector(this.id))?.addEventListener("click", Modal.onClose)
    }

    private static getCloseSelector(id: string): string{
        return "#" + id + " .close-modal"
    }

    private static onClose():void {

        // Получаем текущий id
        const m:IModal = Modal.modals?.pop();
        if(!m){
            return;
        }

        // Удаляем слушателя
        document.querySelector(Modal.getCloseSelector(m.id))?.removeEventListener("click", Modal.onClose);

        // Удаляем мдалку
        m.destroy();
    }
    public destroy(): void {

        // Убираем отображение
        this.remove()

        // Удаляем себя
        Modal.removeById(this.id)
    }

    public remove(): void {
        let el = document.getElementById(this.id)
        if(!el){
            return
        }
        el.parentNode?.removeChild(el);
    }

    // static

    // Создает новый Id
    private static generateId(): string {
        Modal._n += 1;
        return Modal._uuid + ":" + String(Modal._n)
    }

    // Возвращает копию массива ссылок на модалки
    public static get modals(): IModal[] {
        let a: IModal[] = [];
        Modal._modals.forEach((item) => a.push(item));
        return a;
    }

    public static getModalById(id: string): IModal{
        for (let i: number = 0; i < Modal._modals.length; i++) {
            const m = Modal._modals[i];

            // Находим себя в массиве модалок
            if(m.id === id)
                return m;
        }

        return null;
    }
    public static removeById(id: string): void {

        for (let i: number = 0; i < Modal._modals.length; i++) {

            const m = Modal._modals[i];

            // Находим себя в массиве модалок
            if(m.id != id)
                continue;

            // Как удалить сам объект?
            // ...

            // Удаляем из коллекции
            Modal._modals.splice(i);
            break;
        }
    }
    public static findLast(): IModal | null {

        if(!Modal._modals.length)
            return null;

        return Modal._modals[Modal._modals.length - 1]
    }
}