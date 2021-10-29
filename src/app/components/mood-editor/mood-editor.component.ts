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

import { Mood } from "../../models/Mood";

@Component({
  selector: "app-Mood-editor",
  templateUrl: "./Mood-editor.component.html",
  styleUrls: ["./Mood-editor.component.css"],
})
export class MoodEditorComponent implements OnInit, AfterViewInit {
  moodName = "";
  iconName = "";
  moodId = "";
  currentPicKey = "";

  isEditMode = false;

  constructor(
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<MoodEditorComponent>,
    private http: HttpService,
    private util: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;

    if (this.isEditMode) {
      this.moodName = data.genre.name;
      this.iconName = data.genre.iconName;
      this.currentPicKey = data.genre.bgImage;
      this.moodId = data.genre._id;
    }
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  addNewMood() {
    if (!this.moodName) {
      demo.showWarningNotification("Please provide a name for the Mood.");
      return;
    }

    const MoodPicture = (<any>(
      document.getElementById("MoodPicture")
    )).files[0];
    if (!MoodPicture) {
      demo.showWarningNotification("Please select an image file to upload.");
      return;
    }

    this.spinner.show();

    let formData = new FormData();
    formData.append("categoryPicture", MoodPicture);
    formData.append("name", this.moodName);
    formData.append("iconName", this.iconName);

    this.http
      .post("category/add", formData, { isMultiPartFormData: true })
      .then((success) => {
        console.log(success.body.data);
        this.spinner.hide();
        this.dialogRef.close({
          isSuccess: true,
          newMood: success.body.data,
        });
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });
  }
  updateMood() {
    const MoodPicture = (<any>(
      document.getElementById("MoodPicture")
    )).files[0];
    if (
      this.moodName == this.data.genre.name &&
      this.iconName == this.data.genre.iconName &&
      !MoodPicture
    ) {
      demo.showWarningNotification("No changes made");
      return;
    }
    this.spinner.show();

    let formData = new FormData();
    if (MoodPicture) formData.append("categoryPicture", MoodPicture);
    formData.append("name", this.moodName);
    formData.append("iconName", this.iconName);
    formData.append("categoryId", this.moodId);

    if (MoodPicture) formData.append("oldPicKey", this.currentPicKey);

    this.http
      .post("category/edit", formData, { isMultiPartFormData: true })
      .then((success) => {
        this.spinner.hide();
        this.dialogRef.close({
          isSuccess: true,
          updateMood: success.body.data,
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
