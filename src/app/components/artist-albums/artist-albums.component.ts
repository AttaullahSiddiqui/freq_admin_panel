import { Component, OnInit, Inject } from "@angular/core";

import { Artist } from "../../models/Artist";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-artist-albums",
  templateUrl: "./artist-albums.component.html",
  styleUrls: ["./artist-albums.component.css"]
})
export class ArtistAlbumsComponent implements OnInit {
  artist: Artist;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.artist = data.artist;
  }

  ngOnInit() {}
}
