import { Component, OnInit, Inject } from "@angular/core";
import { PlaylistGroup } from "../../models/PlaylistGroup";
import { Playlist } from "../../models/Playlist";
import { MAT_DIALOG_DATA } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-playlist-group-playlists-editor",
  templateUrl: "./playlist-group-playlists-editor.component.html",
  styleUrls: ["./playlist-group-playlists-editor.component.css"],
})
export class PlaylistGroupPlaylistsEditorComponent implements OnInit {
  isPlaylistGroupEditing = false;
  playlistGroup: PlaylistGroup;
  playlistGroupPlaylists: Playlist[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService
  ) {
    this.playlistGroup = data.playlistGroup;
  }

  ngOnInit() {
    this.isPlaylistGroupEditing = true;
    this.getPlaylistGroupPlaylists();
  }

  getPlaylistGroupPlaylists() {
    this.spinner.show();

    // this.firestoreService
    //   .getPlaylistGroupPlaylists(this.playlistGroup)
    //   .then((result: any) => {
    //     this.playlistGroupPlaylists = result.playlistGroupPlaylists;
    //     this.spinner.hide();
    //   });
  }
}
