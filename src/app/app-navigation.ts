import {APP_ROUTES} from "./core/constants/app.routes";
import {Role} from "./shared/model/role";

export const navigation = [
  {
    text: 'Карточки продукции',
    path: APP_ROUTES.PRODUCT_CARD,
  },
  {
    text: 'Линии упаковывания',
    path: APP_ROUTES.PRODUCT_CARD,
  },
  {
    text: 'Маркировка',
    items: [
      {
        text: 'Управление заказами',
        path: '/profile'
      },
      {
        text: 'Отчеты об аггрегации',
        path: '/tasks'
      }
    ]
  }
];
