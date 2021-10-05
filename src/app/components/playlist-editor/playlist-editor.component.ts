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
import { Playlist } from "../../models/Playlist";
declare var demo: any;

@Component({
  selector: "app-playlist-editor",
  templateUrl: "./playlist-editor.component.html",
  styleUrls: ["./playlist-editor.component.css"],
})
export class PlaylistEditorComponent implements OnInit, AfterViewInit {
  playlistName = "";
  playlistId = "";
  isEditMode = false;

  showProgress = false;
  progress = 0;

  constructor(
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<PlaylistEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;

    if (this.isEditMode) {
      this.playlistName = data.playlist.name;
      this.playlistId = data.playlist.playlistId;
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  addNewPlaylist() {
    if (!this.playlistName) {
      demo.showWarningNotification("Please provide a name for the playlist.");
      return;
    }

    const playlistPicture = (<HTMLInputElement>(
      document.getElementById("playlistPicture")
    )).files[0];
    if (!playlistPicture) {
      demo.showWarningNotification("Please select an image file to upload.");
      return;
    }

    this.spinner.show();
    this.showProgress = true;

    const uploadPath = `/${this.playlistName}/playlistPicture`;

    // Upload playlist picture
    // this.firebaseStorage
    //   .uploadPicture(uploadPath, playlistPicture)
    //   .then(
    //     (uploadResult: any) => {
    //       const newPlaylist = new Playlist();
    //       newPlaylist.name = this.playlistName;
    //       newPlaylist.picture = uploadResult.downloadURL;

    //       this.firestoreService.addNewPlaylist(newPlaylist).then(
    //         (result: any) => {
    //           this.spinner.hide();
    //           this.showProgress = false;

    //           newPlaylist.playlistId = result.newPlaylistId;

    //           this.dialogRef.close({
    //             isSuccess: true,
    //             newPlaylist: newPlaylist
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

  updatePlaylistName() {
    if (!this.playlistName) {
      demo.showWarningNotification("Please provide a name for the playlist.");
      return;
    }

    // this.firestoreService
    //   .editPlaylistName(this.playlistId, this.playlistName)
    //   .then(
    //     (result: any) => {
    //       this.dialogRef.close({
    //         isSuccess: true,
    //         playlistNameUpdated: true,
    //         newPlaylistName: this.playlistName,
    //       });
    //     },
    //     (error: any) => {
    //       demo.showErrorNotification("An error occured: " + error);
    //     }
    //   );
  }

  updatePlaylistPicture() {
    const playlistPicture = (<HTMLInputElement>(
      document.getElementById("playlistPicture")
    )).files[0];
    if (!playlistPicture) {
      demo.showWarningNotification("Please select an image file to upload.");
      return;
    }

    this.spinner.show();
    this.showProgress = true;

    const uploadPath = `/${this.playlistName}/playlistPicture`;

    // Update playlist picture
    // this.firebaseStorage.uploadPicture(uploadPath, playlistPicture).then(
    //   (uploadResult: any) => {
    //     this.firestoreService
    //       .editPlaylistPicture(this.playlistId, uploadResult.downloadURL)
    //       .then(
    //         (result: any) => {
    //           this.spinner.hide();
    //           this.showProgress = false;

    //           this.dialogRef.close({
    //             isSuccess: true,
    //             playlistPictureUpdated: true,
    //             newPlaylistPicture: uploadResult.downloadURL,
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
