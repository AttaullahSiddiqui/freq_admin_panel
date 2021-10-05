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

import { Album } from "../../models/Albums";
import { Song } from "../../models/Song";
import { Artist } from "../../models/Artist";
import { Genre } from "../../models/Genre";

@Component({
  selector: "app-song-editor",
  templateUrl: "./song-editor.component.html",
  styleUrls: ["./song-editor.component.css"],
})
export class SongEditorComponent implements AfterViewInit {
  artists: Artist[] = [];
  selectedArtist: Artist = null;

  albums: Album[] = [];
  selectedAlbum: Album = null;

  songName = "";
  songId = "";
  artistId = "";
  albumId = "";

  isEditMode = false;

  constructor(
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<SongEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;

    if (this.isEditMode) {
      this.songName = data.song.name;
      this.songId = data.song.songId;
      this.artistId = data.song.artistId;
      this.albumId = data.song.albumId;
    }
  }

  ngAfterViewInit() {
    this.getArtists();
  }

  getArtists(): void {
    this.spinner.show();

    // this.firestoreService.getArtists().then((result: any) => {
    //   this.artists = result.artists;

    //   this.selectedArtist = this.artists.find(
    //     x => x.artistId === this.artistId
    //   );

    //   this.getArtistAlbums();

    //   this.spinner.hide();
    // });
  }

  getArtistAlbums() {
    if (!this.selectedArtist) {
      return;
    }

    this.albums = [];

    this.spinner.show();

    // this.firestoreService
    //   .getArtistAlbums(this.selectedArtist.artistId)
    //   .then((result: any) => {
    //     this.albums = result.albums;

    //     if (this.albums.length > 0) {
    //       this.selectedAlbum = this.albums.find(
    //         x => x.albumId === this.albumId
    //       );
    //     }

    //     this.spinner.hide();
    //   });
  }

  artistSelected(event) {
    this.getArtistAlbums();
  }

  addNewSong() {
    if (!this.songName) {
      demo.showWarningNotification("Please provide a name for the song.");
      return;
    }

    if (!this.selectedArtist) {
      demo.showWarningNotification("Please select an artist.");
      return;
    }

    if (!this.selectedAlbum) {
      demo.showWarningNotification("Please select an album.");
      return;
    }

    const song = (<HTMLInputElement>document.getElementById("song")).files[0];
    if (!song) {
      demo.showWarningNotification("Please select an audio file to upload.");
      return;
    }

    this.spinner.show();

    const uploadPath = `/${this.selectedArtist.name}/${this.selectedAlbum.name}/${this.songName}`;

    // Upload song track
    // this.firebaseStorage
    //   .uploadSong(uploadPath, this.songName, this.selectedAlbum.picture, song)
    //   .then((uploadResult: any) => {
    //     uploadResult.uploadTask.then((snapshot) => {
    //       if (snapshot.state !== "success") {
    //         demo.showErrorNotification("An error occured.");
    //         return;
    //       }

    //       snapshot.ref.getDownloadURL().then((downloadURL) => {
    //         const newSong = new Song();

    //         newSong.name = this.songName;
    //         newSong.artistId = this.selectedArtist.artistId;
    //         newSong.artistName = this.selectedArtist.name;
    //         newSong.albumId = this.selectedAlbum.albumId;
    //         newSong.albumName = this.selectedAlbum.name;
    //         newSong.albumPicture = this.selectedAlbum.picture;
    //         newSong.songUrl = downloadURL;

    //         this.firestoreService.addNewSong(newSong).then(
    //           (result: any) => {
    //             newSong.songId = result.newSongId;

    //             this.firebaseStorage.songUploaded.emit({
    //               isSuccess: true,
    //               newSong: newSong,
    //             });
    //           },
    //           (error: any) => {
    //             demo.showErrorNotification("An error occured: " + error);
    //           }
    //         );
    //       });
    //     });
    //   });

    this.spinner.hide();
    this.dialogRef.close();
  }

  updateSongName() {
    if (!this.songName) {
      demo.showWarningNotification("Please provide a name for the song.");
      return;
    }

    // this.firestoreService.editSongName(this.songId, this.songName).then(
    //   (result: any) => {
    //     this.dialogRef.close({
    //       isSuccess: true,
    //       songNameUpdated: true,
    //       newSongName: this.songName,
    //     });
    //   },
    //   (error: any) => {
    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  updateSongFile() {
    const song = (<HTMLInputElement>document.getElementById("song")).files[0];
    if (!song) {
      demo.showWarningNotification("Please select an audio file to upload.");
      return;
    }

    this.spinner.show();

    const uploadPath = `/${this.selectedArtist.name}/${this.selectedAlbum.name}/${this.songName}`;

    // Update song
    // this.firebaseStorage
    //   .uploadSong(uploadPath, this.songName, this.selectedAlbum.picture, song)
    //   .then((uploadResult: any) => {
    //     uploadResult.uploadTask.then((snapshot) => {
    //       if (snapshot.state !== "success") {
    //         demo.showErrorNotification("An error occured.");
    //         return;
    //       }

    //       snapshot.ref.getDownloadURL().then((downloadURL) => {
    //         const newSong = new Song();

    //         newSong.name = this.songName;
    //         newSong.artistId = this.selectedArtist.artistId;
    //         newSong.artistName = this.selectedArtist.name;
    //         newSong.albumId = this.selectedAlbum.albumId;
    //         newSong.albumName = this.selectedAlbum.name;
    //         newSong.albumPicture = this.selectedAlbum.picture;
    //         newSong.songUrl = downloadURL;

    //         this.firestoreService.addNewSong(newSong).then(
    //           (result: any) => {
    //             newSong.songId = result.newSongId;

    //             this.firebaseStorage.songUpdated.emit({
    //               isSuccess: true,
    //               songUpdated: true,
    //               newSong: uploadResult.downloadURL,
    //             });
    //           },
    //           (error: any) => {
    //             demo.showErrorNotification("An error occured: " + error);
    //           }
    //         );
    //       });
    //     });
    //   });
  }

  closeEditor() {
    this.dialogRef.close({
      isSuccess: false,
    });
  }
}
