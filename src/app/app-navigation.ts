
import {
  faAddressCard,
  faBoxOpen,
  faQrcode,
  faStore,
  faFileContract,
  faBoxesPacking,
  faTruckFast
} from "@fortawesome/free-solid-svg-icons";
import {ProductGroup} from "./shared/model/license";
import {APP_ROUTES, getProductGroupRoute} from "./core/constants";

export function getNavigation(productGroup: ProductGroup): any[] {

  let productGroupName = getProductGroupRoute(productGroup);

  return [
    {
      text: 'Карточки продукции',
      path: `${productGroupName}/${APP_ROUTES.PRODUCT_CARD}`,
      icon: faAddressCard
    },
    {
      text: 'Линии упаковывания',
      path: `${productGroupName}/${APP_ROUTES.PACK_LINES}`,
      icon: faBoxOpen
    },
    {
      text: 'Маркировка',
      icon: faQrcode,
      items: [
        {
          text: 'Управление заказами',
          path: `${productGroupName}/${APP_ROUTES.ORDERS}`,
          icon: faStore
        },
        {
          text: 'Полученные КМ',
          path: `${productGroupName}/${APP_ROUTES.RECEIVED}`,
          icon: faTruckFast
        },
      ]
    },
    {
      text: 'Отчеты',
      icon: faFileContract,
      items: [
        {
          text: 'Отчеты об аггрегации',
          icon: faBoxesPacking,
          path: APP_ROUTES.AGGREGATION_REPORTS
        }
      ]
    }
  ];
}
