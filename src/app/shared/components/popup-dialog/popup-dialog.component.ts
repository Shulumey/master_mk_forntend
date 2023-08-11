import {
  AfterViewInit,
  Component, ComponentRef, Input,
  NgModule,
  OnInit, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DxFormModule} from "devextreme-angular/ui/form";
import {DxLoadIndicatorModule} from "devextreme-angular/ui/load-indicator";
import {NgDestroyComponent} from "../../../core/ng.destroy.component";
import {DxPopupModule, DxValidationGroupComponent, DxValidationGroupModule} from "devextreme-angular";
import {DialogService, LayoutService} from "../../../core/services";
import {DialogParams} from "../../model/dialog.params";
import {NgDialogComponent} from "../../../core/ng.dialog.component";
import {Properties} from "devextreme/ui/button";
import {filter} from "rxjs/operators";
import {maxHeaderSize} from "http";

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent extends NgDestroyComponent implements AfterViewInit {

  @ViewChild('dynamicContent', {read: ViewContainerRef}) containerRef: ViewContainerRef;

  componentRef: ComponentRef<NgDialogComponent>;
  popupVisibility: boolean;
  title: string;
  showTitle: boolean
  isModal: boolean;
  height: number | string;
  width: number | string;
  maxWidth: number | string;
  maxHeight: number | string;
  showCloseButton: boolean;
  dialogButtons: Properties[];

  @Input()
  public set popupId(id: string | undefined) {
    this._set("popupId", id);
  }

  public get popupId(): string | undefined {
    return this._get("popupId")
  }

  constructor(layoutService: LayoutService, private dialogService: DialogService) {
    super(layoutService);

    this.popupVisibility = false;
    this.appendToSubs(this.dialogService.showDialog$.pipe(
      filter(x => x.dialogId === this.popupId)
    ).subscribe(params => this.showDialog(params)));
  }

  showDialog(dialogParams: DialogParams<NgDialogComponent, any>) {
    this.configureDialog(dialogParams);
    this.containerRef.clear();

    this.componentRef = this.containerRef.createComponent(dialogParams.component);
    this.componentRef.instance.resolver = dialogParams.resolve;
    this.componentRef.instance.payload = dialogParams.payload;
    this.dialogButtons = this.componentRef.instance.dialogButtons;
    this.appendToSubs(this.componentRef.instance.onVisibilityChanged.subscribe(isVisible => this.popupVisibility = isVisible));
    this.popupVisibility = true;
  }

  configureDialog(params: DialogParams<NgDialogComponent, any>) {
    if (params.title) {
      this.title = params.title;
      this.showTitle = true;
    } else {
      this.showTitle = false;
    }

    this.showCloseButton = params.showCloseButton == undefined ? false : params.showCloseButton;
    this.isModal = params.isModal == undefined ? false : params.isModal;
    this.height = params.height || "auto";
    this.width = params.width || "auto";
    this.maxHeight = params.maxHeight || "auto";
    this.maxWidth = params.maxWidth || "auto";
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  ngAfterViewInit(): void {

  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxPopupModule,
    DxValidationGroupModule
  ],
  declarations: [PopupDialogComponent],
  exports: [PopupDialogComponent]
})
export class PopupDialogModule {
}
