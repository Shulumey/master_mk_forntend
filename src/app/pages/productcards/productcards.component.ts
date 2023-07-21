import {Component} from '@angular/core';
import {HttpService} from "../../core/services/http.service";
import {LayoutService} from "../../core/services";
import {faArrowsRotate, faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';
import {NgDestroyComponent} from "../../core/ng.destroy.component";
import {createStore} from "devextreme-aspnet-data";

@Component({
  selector: 'app-productcards',
  templateUrl: './productcards.component.html',
  styleUrls: ['./productcards.component.scss']
})
export class ProductcardsComponent extends NgDestroyComponent {
  faArrowUpRightFromSquare = faArrowUpRightFromSquare
  faArrowsRotate = faArrowsRotate;
  downloadsMenuItems: { name: string, display: string }[]

  constructor(private httpService: HttpService, layoutService: LayoutService) {
    super(layoutService);

    this.downloadsMenuItems = [
      {name: "ownCards", display: "Собственные карточки"},
      {name: "publicCards", display: "Публичные карточки по коду товара"},
      {name: "refreshCards", display: "Обновить информацию по существующим карточкам"}
    ]

    createStore({

    })

  }


}
