import {APP_ROUTES, getProductGroupRoute} from "./core/constants/app.routes";
import {faAddressCard, faBoxOpen, faQrcode, faStore, faFileContract, faBoxesPacking} from "@fortawesome/free-solid-svg-icons";
import {ProductGroup} from "./shared/model/license";

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
          path: APP_ROUTES.ORDERS,
          icon: faStore

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
