import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgDialogComponent} from "../../core/ng.dialog.component";
import {LayoutService} from "../../core/services";
import {Certificate} from "../../shared/model/certificate";
import {HttpService} from "../../core/services/http.service";
import {API_URLS} from "../../core/constants/api.urls";
import {concatMap, tap} from "rxjs";
import {AppConfiguration} from "../../shared/model/app.configuration";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent extends NgDialogComponent implements OnInit {

  public apiConnectionOptions: any = {
    stylingMode: "contained",
    type: "default",
    icon: "return"
  }

  settings: AppConfiguration = {
    serviceOmsConnection: "",
    apiOmsConnection: "",
    address: "",
    fiasId: "",
    omsId: "",
    certificateThumbprint: ""
  };

  certificates: Certificate[] | null = []
  isCertificateSelectOpened: boolean


  public get selectedCertificate(): any[] {
    return this._get("selectedCertificate")
  }

  public set selectedCertificate(value) {
    this._set("selectedCertificate", value);
  }


  constructor(layoutService: LayoutService, private httpService: HttpService, private ref: ChangeDetectorRef) {
    super(layoutService);
    this.onDisplayCertExp = this.onDisplayCertExp.bind(this);
    this.onCertificateOptionChanged = this.onCertificateOptionChanged.bind(this);

    this.$watch("selectedCertificate", () => {
      if (this.settings) {
          this.settings.certificateThumbprint = this.selectedCertificate[0].thumbnail;
      }
    })
  }

  override onConfirm(): void {
    this.appendToSubs(this.httpService.post(API_URLS.CONFIGURATION, this.settings)
      .subscribe(() => this.onClose()));
  }

  onCertificateOptionChanged(e: any) {
    if (e.name === 'value') {
      this.isCertificateSelectOpened = false;
      //this.ref.detectChanges();
    }
  }

  onDisplayCertExp() {
    return this.selectedCertificate && this.selectedCertificate[0].subject;
  }

  ngOnInit(): void {
    this.appendToSubs(this.httpService.get<Certificate[]>(API_URLS.GET_CERTIFICATES)
      .pipe(
        tap(cert => this.certificates = cert),
        concatMap(_ => this.httpService.get<AppConfiguration>(API_URLS.CONFIGURATION)),
        tap(config => {
          if(config) {
            this.settings = config
          }
        })
      )
      .subscribe((_) => {
        this.selectedCertificate = [this.certificates?.find(x => x.thumbnail === this.settings?.certificateThumbprint)]
      }));
  }

}
