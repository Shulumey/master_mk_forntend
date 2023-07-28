import {
  AfterViewInit,
  Component, ComponentRef,
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
  showCloseButton: boolean;
  dialogButtons: Properties[];

  constructor(layoutService: LayoutService, private dialogService: DialogService) {
    super(layoutService);

    this.popupVisibility = false;
    // this.showDialog = this.showDialog.bind(this);
    this.appendToSubs(this.dialogService.showDialog$.subscribe(params => this.showDialog(params)));
  }

  showDialog(dialogParams: DialogParams<NgDialogComponent, any>) {
    this.configureDialog(dialogParams);
    this.containerRef.clear();

    this.componentRef = this.containerRef.createComponent(dialogParams.component);
    this.componentRef.instance.resolver = dialogParams.resolve;
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
