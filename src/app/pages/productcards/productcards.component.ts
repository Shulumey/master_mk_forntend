import {Component} from '@angular/core';
import {HttpService} from "../../core/services/http.service";
import {LayoutService} from "../../core/services";
import {NgDestroyComponent} from "../../core/ng.destroy.component";

@Component({
  selector: 'app-productcards',
  templateUrl: './productcards.component.html',
  styleUrls: ['./productcards.component.scss']
})
export class ProductcardsComponent extends NgDestroyComponent {

  constructor(private httpService: HttpService, layoutService: LayoutService) {
    super(layoutService);
  }

}
