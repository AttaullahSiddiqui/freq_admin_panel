import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
  Inject,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
// import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar } from "@angular/material/snack-bar";

// import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";
import swal from "sweetalert";
declare var demo: any;

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.css"],
})
export class PrivacyPolicyComponent implements OnInit {
  htmlContent = "";

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "25em",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarPosition: "top",
    // toolbarHiddenButtons: [
    //   ['bold']
    // ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private util: UtilityService,
    public snackBar: MatSnackBar // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getPrivacy();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getPrivacy() {
    this.http
      .get("termsprivacy/fetchPrivacy")
      .then((success) => {
        this.spinner.hide();
        this.htmlContent = success.body.data.privacy;
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });
  }

  updatePrivacy() {
    if (!this.htmlContent) {
      demo.showWarningNotification("Please add data in editor");
      return;
    }
    this.spinner.show();
    let payload = {
      privacy: this.htmlContent,
    };
    this.http
      .post("termsprivacy/updatePrivacy", payload)
      .then((success) => {
        this.spinner.hide();
        // this.openSnackBar("Privacy data updated", "OK");
        demo.showSuccessNotification("Privacy data updated successfully");
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification("Error in updating Privacy data");
      });
  }
}
