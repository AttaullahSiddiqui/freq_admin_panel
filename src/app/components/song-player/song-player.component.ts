import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

import { Program } from "../../models/Program";

@Component({
  selector: "app-song-player",
  templateUrl: "./song-player.component.html",
  styleUrls: ["./song-player.component.css"],
})
export class SongPlayerComponent implements OnInit {
  song: Program;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.song = data.song;
  }

  ngOnInit() {}
}
