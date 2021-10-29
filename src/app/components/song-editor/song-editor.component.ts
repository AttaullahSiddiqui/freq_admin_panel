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
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";

import "../../../assets/js/demo.js";
declare var demo: any;

@Component({
  selector: "app-song-editor",
  templateUrl: "./song-editor.component.html",
  styleUrls: ["./song-editor.component.css"],
})
export class SongEditorComponent implements AfterViewInit {
  categoriesArray = [];

  name = "";
  programId = "";
  currentSong = "";
  currentPicture = "";
  // categories = ["616a8870810a4844b82eae2c"];
  // categories = ["616a89ba810a4844b82eae42"];
  categories = ["616a8bae810a4844b82eae60"];

  isEditMode = false;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private util: UtilityService,
    public dialogRef: MatDialogRef<SongEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.spinner.show();
    this.isEditMode = data.isEditMode;

    if (this.isEditMode) {
      this.name = data.program.name;
      this.programId = data.program._id;
      this.categories = data.program.categories;
      this.currentSong = data.program.song;
      this.currentPicture = data.program.picture;
    }
  }

  ngAfterViewInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.http
      .get("category/forSelect")
      .then((success) => {
        console.log(success);
        this.spinner.hide();
        this.categoriesArray = success.body.data;
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });
  }

  addNewProgram() {
    const programSong = (<any>(
      document.getElementById("programSong")
    )).files[0];
    const programPicture = (<any>(
      document.getElementById("programPicture")
    )).files[0];
    if (
      !this.name ||
      // !this.categories.length
      !programSong ||
      !programPicture
    ) {
      demo.showWarningNotification("All fields required");
      return;
    }

    this.spinner.show();
    let formData = new FormData();
    formData.append("program", programPicture);
    formData.append("program", programSong);
    formData.append("name", this.name);
    for (var i = 0; i < this.categories.length; i++) {
      formData.append("categories[]", this.categories[i]);
    }

    this.http
      .post("programs/add", formData, { isMultiPartFormData: true })
      .then((success) => {
        this.spinner.hide();
        console.log("Added song ", success.body.data);
        this.dialogRef.close({
          isSuccess: true,
          newProgram: success.body.data,
        });
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });

    this.spinner.hide();
    this.dialogRef.close();
  }

  updateProgram() {
    const newSong = (<any>document.getElementById("programSong"))
      .files[0];
    const newProgramPicture = (<any>(
      document.getElementById("programPicture")
    )).files[0];
    if (
      this.name == this.data.program.name &&
      this.categories == this.data.program.categories &&
      !newSong &&
      !newProgramPicture
    ) {
      demo.showWarningNotification("No changes made");
      return;
    }
    this.spinner.show();

    let formData = new FormData();
    if (newProgramPicture) {
      formData.append("program", newProgramPicture);
      formData.append("currentSong", this.currentSong);
    }
    if (newSong) {
      formData.append("program", newSong);
      formData.append("currentPicture", this.currentPicture);
    }
    formData.append("name", this.name);
    for (var i = 0; i < this.categories.length; i++) {
      formData.append("categories[]", this.categories[i]);
    }
    formData.append("programId", this.programId);

    this.http
      .post("programs/edit", formData, { isMultiPartFormData: true })
      .then((success) => {
        this.spinner.hide();
        this.dialogRef.close({
          isSuccess: true,
          updateProgram: success.body.data,
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
