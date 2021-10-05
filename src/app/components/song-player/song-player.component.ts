import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

import { Song } from "../../models/Song";

@Component({
  selector: "app-song-player",
  templateUrl: "./song-player.component.html",
  styleUrls: ["./song-player.component.css"]
})
export class SongPlayerComponent implements OnInit {
  song: Song;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.song = data.song;
  }

  ngOnInit() {}
}
