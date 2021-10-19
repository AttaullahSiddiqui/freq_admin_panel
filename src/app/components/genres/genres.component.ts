import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material";
import { environment } from "../../../environments/environment";
import swal from "sweetalert";
import { GenreSongsEditorComponent } from "../genre-songs-editor/genre-songs-editor.component";

import { GenreHelper } from "../../models/GenreHelper";
import { Genre } from "../../models/Genre";
import { SongEditorComponent } from "../song-editor/song-editor.component";
import { Program } from "src/app/models/Program";
import { MoodEditorComponent } from "../mood-editor/mood-editor.component";
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";

declare var demo: any;

@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.css"],
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  genreEditKey = null;
  getFileUrl = environment.getFileUrl;

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpService,
    private util: UtilityService
  ) {}

  ngOnInit() {
    this.getGenres();
  }

  getGenres() {
    this.spinner.show();
    this.http
      .get("category/fetchAll")
      .then((success) => {
        console.log(success);
        this.spinner.hide();
        this.genres = success.body.data;
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });
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

  addNewCatyegory(): void {
    const dialogRef = this.dialog.open(MoodEditorComponent, {
      width: "500px",
      data: {
        isEditMode: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        this.genres.push(result.newMood);
        demo.showSuccessNotification("Category successfully added!");
      }
    });
  }

  edit(genreKey, genre: Genre) {
    this.genreEditKey = genreKey;
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
        this.genres[this.genreEditKey] = result.updateMood;
        demo.showSuccessNotification("Category successfully updated!");
      }
    });
  }

  delete(deleteKey, toDeleteCatId, currPicUrl) {
    const options = {
      title: "Delete Category",
      text: "Are you sure you want to delete this category?",
      icon: "error",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    };

    swal(options).then((willDelete) => {
      if (willDelete) {
        this.spinner.show();
        this.http
          .post("category/delete", {
            categoryId: toDeleteCatId,
            bgImage: currPicUrl,
          })
          .then((success) => {
            demo.showSuccessNotification("Category successfully deleted!");
            this.spinner.hide();
            this.genres.splice(deleteKey, 1);
          })
          .catch((err: Response) => {
            this.spinner.hide();
            demo.showErrorNotification(err["error"].message);
          });
      }
    });
  }
}
