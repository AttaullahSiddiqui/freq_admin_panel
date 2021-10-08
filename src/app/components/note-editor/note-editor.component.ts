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
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";

import "../../../assets/js/demo.js";
declare var demo: any;

@Component({
  selector: "app-Note-editor",
  templateUrl: "./note-editor.component.html",
  styleUrls: ["./note-editor.component.css"],
})
export class NoteEditorComponent implements OnInit, AfterViewInit {
  noteTitle = "";
  noteDescription = "";
  noteId = "";

  isEditNote = false;

  constructor(
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<NoteEditorComponent>,
    private http: HttpService,
    private util: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditNote = data.isEditMode;

    if (this.isEditNote) {
      this.noteTitle = data.note.title;
      this.noteDescription = data.note.description;
      this.noteId = data.note._id;
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  addNewNote() {
    if (!this.noteTitle || !this.noteDescription) {
      demo.showWarningNotification("One of the form fields is empty");
      return;
    }
    this.spinner.show();
    let payload = {
      title: this.noteTitle,
      description: this.noteDescription,
    };
    // let formData = new FormData();
    // formData.append("title", this.noteTitle);
    // formData.append("description", this.noteDescription);

    this.http
      .post("notes/add", payload)
      .then((success) => {
        this.spinner.hide();
        this.dialogRef.close({
          isSuccess: true,
          newNote: success.body.data,
        });
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });
  }
  updateNote() {
    if (
      this.noteTitle == this.data.note.title &&
      this.noteDescription == this.data.note.description
    ) {
      demo.showWarningNotification("No changes made");
      return;
    }
    this.spinner.show();
    let payload = {
      title: this.noteTitle,
      description: this.noteDescription,
      noteId: this.noteId,
    };
    this.http
      .post("notes/edit", payload)
      .then((success) => {
        this.spinner.hide();
        this.dialogRef.close({
          isSuccess: true,
          updatedNote: success.body.data,
        });
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });
  }
  closeEditor() {
    this.dialogRef.close({
      isSuccess: false,
    });
  }
}
