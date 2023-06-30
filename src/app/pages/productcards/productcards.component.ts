import { Component } from '@angular/core';
import {NgDestroyComponentDirective} from "../../core/ng.destroy.component.directive";
import {HttpService} from "../../core/services/http.service";

@Component({
  selector: 'app-productcards',
  templateUrl: './productcards.component.html',
  styleUrls: ['./productcards.component.scss']
})
export class ProductcardsComponent extends NgDestroyComponentDirective{

  constructor(private httpService: HttpService) {
    super();
  }

}
