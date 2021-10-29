import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { environment } from "../../../environments/environment";

import { NoteEditorComponent } from "../note-editor/note-editor.component";
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";
import swal from "sweetalert";

declare var demo: any;

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"],
})
export class NotesComponent implements OnInit {
  notes: any = [];
  noteEditKey: any = null;
  noteDltKey: any = null;
  getFileUrl: any = environment.getFileUrl;

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpService,
    private util: UtilityService
  ) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.spinner.show();
    this.http
      .get("notes/fetchAll")
      .then((success) => {
        console.log(success);
        this.spinner.hide();
        this.notes = success.body.data;
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });
  }

  addNewNote() {
    const dialogRef = this.dialog.open(NoteEditorComponent, {
      width: "500px",
      data: {
        isEditMode: false,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isSuccess) {
        this.notes.unshift(result.newNote);
        demo.showSuccessNotification("Note successfully added!");
      }
    });
  }
  edit(noteKey: any, note: any) {
    this.noteEditKey = noteKey;
    const dialogRef2 = this.dialog.open(NoteEditorComponent, {
      width: "500px",
      data: {
        isEditMode: true,
        note: note,
      },
    });
    dialogRef2.afterClosed().subscribe((result: any) => {
      console.log({ result });
      if (result.isSuccess) {
        this.notes[this.noteEditKey] = result.updatedNote;
        demo.showSuccessNotification("Note successfully updated!");
      }
    });
  }

  delete(deleteKey: any, toDeleteNoteId: any) {
    this.noteDltKey = deleteKey;
    const options = {
      title: "Delete Note?",
      text: "Are you sure you want to delete this Note?",
      icon: "error",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    };
    swal(options).then((willDelete) => {
      if (willDelete) {
        this.spinner.show();
        this.http
          .post("notes/delete", { noteId: toDeleteNoteId })
          .then((success) => {
            demo.showSuccessNotification("Note successfully deleted!");
            this.spinner.hide();
            this.notes.splice(this.noteDltKey, 1);
          })
          .catch((err: Response) => {
            this.spinner.hide();
            demo.showErrorNotification(err["error"].message);
          });
      }
    });
  }
}
