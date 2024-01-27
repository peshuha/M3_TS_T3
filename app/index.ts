import {getTours} from "@rest/tours";
import './assets/styles/main.scss';
import {images} from "@services/img/img";
import {ITours} from "./models/tours";
import {getTourTemplate} from "./templates/tours";
import {openModal} from "@services/modal/modalService";
import {initFooterTitle, initHeaderTitle, initToursDivElements} from "@services/general/general";
import {EventTarget} from "undici-types/patch";

export let  toursDataArray: ITours[] = [];
const imagesStore = images; // ссылка на изображения нужна чтобы webpack формировал изображения в папке dist



initHeaderTitle('Туры', 'h1');
initFooterTitle('Туры по всему миру', 'h2');
// init data
const tourData: Promise<ITours[]> = getTours();

tourData.then((data: ITours[]): void => {
  console.log('call ')
  toursDataArray = data;
  initToursDivElements(data);
});

// init app -> app/services/general/general.ts

