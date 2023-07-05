import {NgDestroyComponent} from "./ng.destroy.component";
import {Directive, EventEmitter} from "@angular/core";
import {LayoutService} from "./services";

@Directive()
export abstract class NgDialogComponent extends NgDestroyComponent {

  d: EventEmitter<boolean>

  protected constructor(layoutService: LayoutService) {
    super(layoutService);

  }

   abstract onConfirm():void;

   onClose(): void {}


}
