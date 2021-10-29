import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import "../../../assets/js/demo.js";
import swal from "sweetalert";
declare var demo: any;

import { PlaylistEditorComponent } from "../playlist-editor/playlist-editor.component";
import { PlaylistSongsEditorComponent } from "../playlist-songs-editor/playlist-songs-editor.component";

import { Playlist } from "../../models/Playlist";
import { PlaylistGroup } from "../../models/PlaylistGroup";

@Component({
  selector: "app-playlists",
  templateUrl: "./playlists.component.html",
  styleUrls: ["./playlists.component.css"],
})
export class PlaylistsComponent implements OnInit {
  @Input() isPlaylistGroupEditing = false;
  @Input() playlistGroup: any;
  @Input() playlistGroupPlaylists: any[] = [];

  playlists: Playlist[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPlaylists();
  }

  getPlaylists(): void {
    this.spinner.show();

    // this.firestoreService.getPlaylists().then((result: any) => {
    //   this.playlists = result.playlists;
    //   console.log(this.playlists);

    //   if (this.isPlaylistGroupEditing) {
    //     this.playlists.forEach(playlist => {
    //       this.checkIfPlaylistGroupPlaylist(playlist);
    //     });
    //   }

    //   this.spinner.hide();
    // });
  }

  checkIfPlaylistGroupPlaylist(playlist: Playlist) {
    if (this.playlistGroupPlaylists) {
      const playlistGroupPlaylist = this.playlistGroupPlaylists.find(
        (x) => x.playlistId === playlist.playlistId
      );

      if (playlistGroupPlaylist) {
        playlist.isPartOfPlaylistGroup = true;
        playlist.playlistGroupPlaylistId =
          playlistGroupPlaylist.playlistGroupPlaylistId;
      }
    }
  }

  addNewPlaylist(): void {
    const dialogRef = this.dialog.open(PlaylistEditorComponent, {
      width: "500px",
      data: {
        isEditMode: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        // Add new playlist
        this.playlists.unshift(result.newPlaylist);
        demo.showSuccessNotification("Playlist successfully added!");
      }
    });
  }

  edit(playlist: Playlist) {
    const dialogRef = this.dialog.open(PlaylistEditorComponent, {
      width: "650px",
      data: {
        isEditMode: true,
        playlist: playlist,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        // Edit name
        if (result.playlistNameUpdated) {
          playlist.name = result.newPlaylistName;
          demo.showSuccessNotification("Playlist name successfully updated!");
        }

        // Edit picture
        else if (result.playlistPictureUpdated) {
          playlist.picture = result.newPlaylistPicture;
          demo.showSuccessNotification(
            "Playlist picture successfully updated!"
          );
        }
      }
    });
  }

  delete(playlist: Playlist) {
    const options = {
      title: "Delete Playlist?",
      text: "Are you sure you want to delete this playlist?",
      icon: "error",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    };

    swal(options).then((willDelete) => {
      if (willDelete) {
        this.spinner.show();

        // Delete playlist
        // this.firestoreService.deletePlaylist(playlist).then(
        //   (result: any) => {
        //     this.removePlaylistFromList(playlist);
        //     demo.showSuccessNotification("Playlist successfully deleted!");

        //     this.spinner.hide();
        //   },
        //   (error: any) => {
        //     this.spinner.hide();
        //     demo.showErrorNotification("An error occured: " + error);
        //   }
        // );
      }
    });
  }

  removePlaylistFromList(playlist: Playlist) {
    const index = this.playlists.indexOf(playlist);
    if (index > -1) {
      this.playlists.splice(index, 1);
    }
  }

  openPlaylistSongs(playlist: Playlist) {
    const dialogRef = this.dialog.open(PlaylistSongsEditorComponent, {
      width: "1000px",
      minHeight: "500px",
      data: { playlist: playlist },
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }

  addPlaylistToPlaylistGroup(playlist: Playlist) {
    console.log("playlist", playlist);
    // this.firestoreService
    //   .addPlaylistToPlaylistGroup(playlist, this.playlistGroup)
    //   .then(
    //     (result: any) => {
    //       playlist.playlistGroupPlaylistId = result.newPlaylistGroupPlaylistId;
    //       playlist.isPartOfPlaylistGroup = true;
    //     },
    //     (error: any) => {
    //       demo.showErrorNotification("An error occured: " + error);
    //     }
    //   );
  }

  removePlaylistFromPlaylistGroup(playlist: Playlist) {
    console.log(playlist);
    console.log(this.playlistGroup);

    // this.firestoreService
    //   .removePlaylistFromPlaylistGroup(playlist, this.playlistGroup)
    //   .then(
    //     (result: any) => {
    //       playlist.isPartOfPlaylistGroup = false;
    //     },
    //     (error: any) => {
    //       demo.showErrorNotification("An error occured: " + error);
    //     }
    //   );
  }
}
