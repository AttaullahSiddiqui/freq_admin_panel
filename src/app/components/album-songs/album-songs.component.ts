import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

import { Album } from "../../models/Albums";

@Component({
  selector: "app-album-songs",
  templateUrl: "./album-songs.component.html",
  styleUrls: ["./album-songs.component.css"]
})
export class AlbumSongsComponent implements OnInit {
  album: Album;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.album = data.album;
  }

  ngOnInit() {}
}
