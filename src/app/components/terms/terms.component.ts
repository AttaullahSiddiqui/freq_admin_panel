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
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar } from "@angular/material";

// import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-terms",
  templateUrl: "./terms.component.html",
  styleUrls: ["./terms.component.css"],
})
export class TermsComponent implements OnInit, AfterViewInit {
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
    public snackBar: MatSnackBar // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getTerms();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getTerms() {
    // this.firestoreService.getTerms().subscribe((x: any) => {
    //   console.log(x.htmlContent);
    //   this.htmlContent = x.htmlContent;
    // })
  }

  updateTerms() {
    console.log("getTerms updated");
    // this.firestoreService.updateTerms(this.htmlContent).subscribe(() => {
    //   console.log('getTerms updated...');
    //   this.openSnackBar("Terms Updated..", "OK");
    // });
  }
}
