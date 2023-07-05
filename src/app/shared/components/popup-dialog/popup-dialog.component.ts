import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, ComponentRef,
  NgModule,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DxFormModule} from "devextreme-angular/ui/form";
import {DxLoadIndicatorModule} from "devextreme-angular/ui/load-indicator";
import {NgDestroyComponent} from "../../../core/ng.destroy.component";
import {DxPopupModule} from "devextreme-angular";
import {DialogService, LayoutService} from "../../../core/services";
import {DialogParams} from "../../model/dialog.params";
import {NgDialogComponent} from "../../../core/ng.dialog.component";

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent extends NgDestroyComponent {

  @ViewChild('dynamicContent', {read: ViewContainerRef}) containerRef: ViewContainerRef;

  private componentRef: ComponentRef<NgDialogComponent>;
  popupVisibility: boolean;
  title?: string;
  showTitle: boolean
  isModal: boolean;
  height?: number;
  width?: number;
  showCloseButton?: boolean;

  constructor(layoutService: LayoutService, private dialogService: DialogService) {
    super(layoutService);

    this.popupVisibility = false;

    this.appendToSubs(this.dialogService.showDialog$.subscribe(params => {
      this.configureDialog(params);
      this.containerRef.clear();
      this.componentRef = this.containerRef.createComponent(params.component);
      this.componentRef.instance
    }));

    this.appendToSubs(this.dialogService.dialogVisibility$.subscribe(isVisible => this.popupVisibility = isVisible));

  }

  configureDialog(params:DialogParams<NgDialogComponent>){
    if(params.title){
      this.title = params.title;
      this.showTitle = true;
    } else {
      this.showTitle = false;
    }

  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxPopupModule
  ],
  declarations: [PopupDialogComponent],
  exports: [PopupDialogComponent]
})
export class PopupDialogModule {
}
