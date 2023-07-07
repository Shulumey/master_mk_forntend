import {NgDestroyComponent} from "./ng.destroy.component";
import {Directive, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";
import {LayoutService} from "./services";
import {Properties} from "devextreme/ui/button";

@Directive()
export abstract class NgDialogComponent extends NgDestroyComponent {

  public onChanged: EventEmitter<SimpleChanges>
  public onVisibilityChanged: EventEmitter<boolean>;

  public dialogButtons: Properties[]

  protected constructor(layoutService: LayoutService) {
    super(layoutService);
    this.onChanged = new EventEmitter<SimpleChanges>();
    this.onVisibilityChanged = new EventEmitter<boolean>();

    this.dialogButtons = [
      {
        type:"default",
        text : "ОК",
        stylingMode:"contained",
        useSubmitBehavior: true,
        onClick:(e)=>{
          let result = e.validationGroup.validate();
          if (result.isValid && this.onCanConfirm()) {
            this.onConfirm();
          }
        }
      },
      {
        type:"default",
        text : "Отмена",
        stylingMode:"outlined",
        onClick:(e)=>{
          if (this.onCanClose()) {
            this.onClose();
          }
        }
      }
    ]
  }

  abstract onConfirm(): void;

  onCanConfirm(): boolean {
    return true;
  }

  onClose(): void {
    this.onVisibilityChanged.emit(false);
  }

  onCanClose(): boolean {
    return true;
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
