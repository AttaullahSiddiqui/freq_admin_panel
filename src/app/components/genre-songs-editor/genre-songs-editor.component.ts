import { Component, OnInit, Inject } from "@angular/core";

import { Genre } from "../../models/Genre";
import { Program } from "../../models/Program";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-genre-songs-editor",
  templateUrl: "./genre-songs-editor.component.html",
  styleUrls: ["./genre-songs-editor.component.css"],
})
export class GenreSongsEditorComponent implements OnInit {
  isGenreEditing = false;
  genre: Genre;
  genreSongs: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService
  ) {
    this.genre = data.genre;
  }

  ngOnInit() {
    this.isGenreEditing = true;
    this.getGenreSongs();
  }

  getGenreSongs() {
    this.spinner.show();

    // this.firestoreService.getGenreSongs(this.genre).then((result: any) => {
    //   this.genreSongs = result.genreSongs;
    //   this.spinner.hide();
    // });
  }
}
