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

import { Artist } from "../../models/Artist";

@Component({
  selector: "app-artist-editor",
  templateUrl: "./artist-editor.component.html",
  styleUrls: ["./artist-editor.component.css"],
})
export class ArtistEditorComponent implements OnInit, AfterViewInit {
  artistName = "";
  artistId = "";
  isEditMode = false;

  showProgress = false;
  progress = 0;

  constructor(
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ArtistEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;

    if (this.isEditMode) {
      this.artistName = data.artist.name;
      this.artistId = data.artist.artistId;
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  addNewArtist() {
    if (!this.artistName) {
      demo.showWarningNotification("Please provide a name for the artist.");
      return;
    }

    const artistPicture = (<HTMLInputElement>(
      document.getElementById("artistPicture")
    )).files[0];
    if (!artistPicture) {
      demo.showWarningNotification("Please select an image file to upload.");
      return;
    }

    this.spinner.show();
    this.showProgress = true;

    const uploadPath = `/${this.artistName}/artistPicture`;

    // Upload artist picture
    // this.firebaseStorage.uploadPicture(uploadPath, artistPicture).then(
    //   (uploadResult: any) => {
    //     const newArtist = new Artist();
    //     newArtist.name = this.artistName;
    //     newArtist.picture = uploadResult.downloadURL;

    //     this.firestoreService.addNewArtist(newArtist).then(
    //       (result: any) => {
    //         this.spinner.hide();
    //         this.showProgress = false;

    //         newArtist.artistId = result.newArtistId;

    //         this.dialogRef.close({
    //           isSuccess: true,
    //           newArtist: newArtist,
    //         });
    //       },
    //       (error: any) => {
    //         this.spinner.hide();
    //         this.showProgress = false;

    //         demo.showErrorNotification("An error occured: " + error);
    //       }
    //     );
    //   },
    //   (error: any) => {
    //     this.spinner.hide();
    //     this.showProgress = false;

    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  updateArtistName() {
    if (!this.artistName) {
      demo.showWarningNotification("Please provide a name for the artist.");
      return;
    }

    // this.firestoreService.editArtistName(this.artistId, this.artistName).then(
    //   (result: any) => {
    //     this.dialogRef.close({
    //       isSuccess: true,
    //       artistNameUpdated: true,
    //       newArtistName: this.artistName,
    //     });
    //   },
    //   (error: any) => {
    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  updateArtistPicture() {
    const artistPicture = (<HTMLInputElement>(
      document.getElementById("artistPicture")
    )).files[0];
    if (!artistPicture) {
      demo.showWarningNotification("Please select an image file to upload.");
      return;
    }

    this.spinner.show();
    this.showProgress = true;

    const uploadPath = `/${this.artistName}/artistPicture`;

    // Update artist picture
    // this.firebaseStorage.uploadPicture(uploadPath, artistPicture).then(
    //   (uploadResult: any) => {
    //     this.firestoreService
    //       .editArtistPicture(this.artistId, uploadResult.downloadURL)
    //       .then(
    //         (result: any) => {
    //           this.spinner.hide();
    //           this.showProgress = false;

    //           this.dialogRef.close({
    //             isSuccess: true,
    //             artistPictureUpdated: true,
    //             newArtistPicture: uploadResult.downloadURL,
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
