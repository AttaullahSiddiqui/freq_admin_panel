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
  moodId = "";
  isEditMode = false;

  showProgress = false;
  progress = 0;

  constructor(
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<MoodEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;

    if (this.isEditMode) {
      console.log("data", data);
      this.moodName = data.genre.name;
      this.moodId = data.genre.genreId;
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  addNewMood() {
    if (!this.moodName) {
      demo.showWarningNotification("Please provide a name for the Mood.");
      return;
    }

    const MoodPicture = (<HTMLInputElement>(
      document.getElementById("MoodPicture")
    )).files[0];
    if (!MoodPicture) {
      demo.showWarningNotification("Please select an image file to upload.");
      return;
    }

    this.spinner.show();
    this.showProgress = true;

    const uploadPath = `/${this.moodName}/MoodPicture`;

    // Upload Mood picture
    // this.firebaseStorage
    //   .uploadPicture(uploadPath, MoodPicture)
    //   .then(
    //     (uploadResult: any) => {
    //       const newMood = new Mood();
    //       newMood.name = this.moodName;
    //       newMood.picture = uploadResult.downloadURL;

    //       this.firestoreService.addNewMood(newMood).then(
    //         (result: any) => {
    //           this.spinner.hide();
    //           this.showProgress = false;

    //           newMood.moodId = result.newMoodId;

    //           this.dialogRef.close({
    //             isSuccess: true,
    //             newMood: newMood
    //           });
    //         },
    //         (error: any) => {
    //           this.spinner.hide();
    //           this.showProgress = false;

    //           demo.showErrorNotification("An error occured: " + error);
    //         }
    //       );
    //     },
    //     (error: any) => {
    //       this.spinner.hide();
    //       this.showProgress = false;

    //       demo.showErrorNotification("An error occured: " + error);
    //     }
    //   );
  }

  updateMoodName() {
    if (!this.moodName) {
      demo.showWarningNotification("Please provide a name for the Mood.");
      return;
    }

    // this.firestoreService.editMoodName(this.moodId, this.moodName).then(
    //   (result: any) => {
    //     this.dialogRef.close({
    //       isSuccess: true,
    //       MoodNameUpdated: true,
    //       newMoodName: this.moodName,
    //     });
    //   },
    //   (error: any) => {
    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  updateMoodPicture() {
    const MoodPicture = (<HTMLInputElement>(
      document.getElementById("MoodPicture")
    )).files[0];
    if (!MoodPicture) {
      demo.showWarningNotification("Please select an image file to upload.");
      return;
    }

    this.spinner.show();
    this.showProgress = true;

    const uploadPath = `/${this.moodName}/MoodPicture`;

    // Update Mood picture
    // this.firebaseStorage.uploadPicture(uploadPath, MoodPicture).then(
    //   (uploadResult: any) => {
    //     this.firestoreService
    //       .editMoodPicture(this.moodId, uploadResult.downloadURL)
    //       .then(
    //         (result: any) => {
    //           this.spinner.hide();
    //           this.showProgress = false;

    //           this.dialogRef.close({
    //             isSuccess: true,
    //             MoodPictureUpdated: true,
    //             newMoodPicture: uploadResult.downloadURL,
    //           });
    //         },
    //         (error: any) => {
    //           this.spinner.hide();
    //           this.showProgress = false;

    //           demo.showErrorNotification("An error occured: " + error);
    //         }
    //       );
    //   },
    //   (error: any) => {
    //     this.spinner.hide();
    //     this.showProgress = false;

    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  closeEditor() {
    this.dialogRef.close({
      isSuccess: false,
    });
  }
}
