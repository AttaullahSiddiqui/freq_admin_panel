import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material";

import { GenreSongsEditorComponent } from "../genre-songs-editor/genre-songs-editor.component";

import { GenreHelper } from "../../models/GenreHelper";
import { Genre } from "../../models/Genre";
import { SongEditorComponent } from "../song-editor/song-editor.component";
import { Song } from "src/app/models/Song";
import { MoodEditorComponent } from "../mood-editor/mood-editor.component";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.css"],
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    this.spinner.show();

    // this.firestoreService.getGenres().then((result: any) => {
    //   this.genres = result.genres;
    //   this.spinner.hide();
    // });
  }

  openGenreSongs(genre: Genre) {
    const dialogRef = this.dialog.open(GenreSongsEditorComponent, {
      width: "1000px",
      minHeight: "500px",
      data: { genre: genre },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log({ result });

      this.getGenres();
    });
  }

  addNewMood(): void {
    const dialogRef = this.dialog.open(MoodEditorComponent, {
      width: "500px",
      data: {
        isEditMode: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        // Add new artist
        this.genres.unshift(result.newMood);
        // demo.showSuccessNotification("Artist successfully added!");
      }
    });
  }

  edit(genre: Genre) {
    const dialogRef = this.dialog.open(MoodEditorComponent, {
      width: "650px",
      data: {
        isEditMode: true,
        genre: genre,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log({ result });
      if (result.isSuccess) {
        // Edit name
        if (result.MoodNameUpdated) {
          genre.name = result.newMoodName;
          // genre.showSuccessNotification("Artist name successfully updated!");
        }

        // Edit picture
        else if (result.MoodPictureUpdated) {
          genre.picture = result.newMoodPicture;
          // demo.showSuccessNotification("Artist picture successfully updated!");
        }
      }
    });
  }

  // delete(song: Song) {
  //   const options = {
  //     title: "Delete Song?",
  //     text: "Are you sure you want to delete this song?",
  //     icon: "error",
  //     buttons: ["Cancel", "Ok"],
  //     dangerMode: true
  //   };

  //   swal(options).then(willDelete => {
  //     if (willDelete) {
  //       this.spinner.show();

  //       this.firestoreService.deleteSong(song).then(
  //         (result: any) => {
  //           this.removeSongFromList(song);
  //           demo.showSuccessNotification("Song successfully deleted!");

  //           this.spinner.hide();
  //         },
  //         (error: any) => {
  //           this.spinner.hide();
  //           demo.showErrorNotification("An error occured: " + error);
  //         }
  //       );
  //     }
  //   });
  // }
}
