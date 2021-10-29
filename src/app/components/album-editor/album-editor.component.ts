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

import "../../../assets/js/demo.js";
declare var demo: any;

import { Album } from "../../models/Albums";
import { Artist } from "../../models/Artist";

@Component({
  selector: "app-album-editor",
  templateUrl: "./album-editor.component.html",
  styleUrls: ["./album-editor.component.css"],
})
export class AlbumEditorComponent implements OnInit, AfterViewInit {
  artists: Artist[] = [];
  selectedArtist: any;

  albumName = "";
  albumId = "";
  artistId = "";

  isEditMode = false;

  showProgress = false;
  progress = 0;

  constructor(
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<AlbumEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;

    if (this.isEditMode) {
      this.albumName = data.album.name;
      this.albumId = data.album.albumId;
      this.artistId = data.album.artistId;
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.getArtists();
  }

  getArtists(): void {
    this.spinner.show();

    // this.firestoreService.getArtists().then((result: any) => {
    //   this.artists = result.artists;

    //   this.selectedArtist = this.artists.find(
    //     (x) => x.artistId === this.artistId
    //   );

    //   this.spinner.hide();
    // });
  }

  addNewAlbum() {
    if (!this.albumName) {
      demo.showWarningNotification("Please provide a name for the album.");
      return;
    }

    const albumPicture = (<any>(
      document.getElementById("albumPicture")
    )).files[0];

    if (!albumPicture) {
      demo.showWarningNotification("Please select an image file to upload.");
      return;
    }

    if (this.selectedArtist == null || this.selectedArtist === undefined) {
      demo.showWarningNotification("Please select an artist.");
      return;
    }

    this.spinner.show();
    this.showProgress = true;

    const uploadPath = `/${this.selectedArtist.name}/${this.albumName}/albumPicture`;

    // Upload album picture
    // this.firebaseStorage.uploadPicture(uploadPath, albumPicture).then(
    //   (uploadResult: any) => {
    //     const newAlbum = new Album();
    //     newAlbum.name = this.albumName;
    //     newAlbum.picture = uploadResult.downloadURL;
    //     newAlbum.artistId = this.selectedArtist.artistId;
    //     newAlbum.artistName = this.selectedArtist.name;

    //     this.firestoreService.addNewAlbum(newAlbum).then(
    //       (result: any) => {
    //         this.spinner.hide();
    //         this.showProgress = false;

    //         newAlbum.albumId = result.newAlbumId;

    //         this.dialogRef.close({
    //           isSuccess: true,
    //           newAlbum: newAlbum,
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

  updateAlbumName() {
    if (!this.albumName) {
      demo.showWarningNotification("Please provide a name for the album.");
      return;
    }

    // this.firestoreService.editAlbumName(this.albumId, this.albumName).then(
    //   (result: any) => {
    //     this.dialogRef.close({
    //       isSuccess: true,
    //       albumNameUpdated: true,
    //       newAlbumName: this.albumName,
    //     });
    //   },
    //   (error: any) => {
    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  updateAlbumPicture() {
    const albumPicture = (<any>(
      document.getElementById("albumPicture")
    )).files[0];

    if (!albumPicture) {
      demo.showWarningNotification("Please select an image file to upload.");
      return;
    }

    this.spinner.show();
    this.showProgress = true;

    const uploadPath = `/${this.selectedArtist.name}/${this.albumName}/albumPicture`;

    // Update album picture
    // this.firebaseStorage.uploadPicture(uploadPath, albumPicture).then(
    //   (uploadResult: any) => {
    //     this.firestoreService
    //       .editAlbumPicture(this.albumId, uploadResult.downloadURL)
    //       .then(
    //         (result: any) => {
    //           this.spinner.hide();
    //           this.showProgress = false;

    //           this.dialogRef.close({
    //             isSuccess: true,
    //             albumPictureUpdated: true,
    //             newAlbumPicture: uploadResult.downloadURL,
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
