"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = void 0;
function importAll(r) {
    return r.keys().map(r);
}
/*- для того чтобы свойство context распозналось Typescript надо установить дополнительно типы (npm i  @types/webpack-env)
  - метод importAll динамически импортирует файлы картинок и сохраняет их в переменную images*/
exports.images = importAll(require.context('@assets/img/', false, /\.(png|jp?g|svg)$/));
//# sourceMappingURL=img.js.map