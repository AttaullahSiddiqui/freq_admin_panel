import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { Playlist } from "../../models/Playlist";
import { Program } from "../../models/Program";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-playlist-songs-editor",
  templateUrl: "./playlist-songs-editor.component.html",
  styleUrls: ["./playlist-songs-editor.component.css"],
})
export class PlaylistSongsEditorComponent implements OnInit {
  isPlaylistEditing = false;
  playlist: Playlist;
  playlistSongs: Program[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService
  ) {
    this.playlist = data.playlist;
  }

  ngOnInit() {
    this.isPlaylistEditing = true;
    this.getPlaylistSongs();
  }

  getPlaylistSongs() {
    this.spinner.show();

    // this.firestoreService
    //   .getPlaylistSongs(this.playlist)
    //   .then((result: any) => {
    //     this.playlistSongs = result.playlistSongs;
    //     this.spinner.hide();
    //   });
  }
}
