import { Component } from '@angular/core';
import {faArrowsRotate, faFileExport} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-code-marks-received',
  templateUrl: './code-marks-received.component.html',
  styleUrls: ['./code-marks-received.component.scss']
})
export class CodeMarksReceivedComponent {

  protected readonly faFileExport = faFileExport;
  protected readonly faArrowsRotate = faArrowsRotate;
}
