import {NgDestroyComponent} from "./ng.destroy.component";
import {Directive, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";
import {LayoutService} from "./services";
import {Properties} from "devextreme/ui/button";

@Directive()
export abstract class NgDialogComponent extends NgDestroyComponent {

  public onVisibilityChanged: EventEmitter<boolean>;

  public dialogButtons: Properties[]
  public resolver: ((value: any | PromiseLike<any>) => void) ;

  protected constructor(layoutService: LayoutService) {
    super(layoutService);
    this.onVisibilityChanged = new EventEmitter<boolean>();

    this.dialogButtons = [
      {
        type: "default",
        text: "ОК",
        stylingMode: "contained",
        useSubmitBehavior: true,
        onClick: (e) => {
          let result = e.validationGroup.validate();
          if (result.isValid && this.onCanConfirm()) {
            this.onConfirm();
          }
        }
      },
      {
        type: "default",
        text: "Отмена",
        stylingMode: "outlined",
        onClick: (e) => {
          if (this.onCanClose()) {
            this.onClose();
          }
        }
      }
    ]
  }

  onConfirm(): void {
    if (this.resolver) {
      this.resolver(null);
    }
  }

  onCanConfirm(): boolean {
    return this.resolver !== undefined;
  }

  onClose(): void {
    if(this.onCanClose()){
      this.onVisibilityChanged.emit(false);
    }
  }

  onCanClose(): boolean {
    return true;
  }

}
