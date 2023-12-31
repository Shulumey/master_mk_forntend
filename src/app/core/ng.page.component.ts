import {Directive} from '@angular/core';
import {NgDestroyComponent} from "./ng.destroy.component";
import {LayoutService} from "./services";
import {Router} from "@angular/router";

@Directive()
export abstract class NgPageComponent extends NgDestroyComponent {

  public isValid: boolean = true;
  public canEdit: boolean = true;

  protected constructor(layoutService: LayoutService, protected router: Router) {
    super(layoutService)

    this.$watchAny(this.getValidationProps(), () => {
      this.isValid = this.onCanSave()
      this.canEdit = this.onCanEdit();
    });

  }

  onSave() {

  }

  getValidationProps(): string[] {
    return []
  }

  onCanSave(): boolean {
    return true;
  }

  onCanEdit(): boolean{
    return true;
  }

  async onClose(routeNavigation: string) {
    await this.router.navigate([routeNavigation])
  }
}
