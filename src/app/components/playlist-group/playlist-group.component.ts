import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material";
import "../../../assets/js/demo.js";
import swal from "sweetalert";
declare var demo: any;

import { PlaylistGroupEditorComponent } from "../playlist-group-editor/playlist-group-editor.component";
import { PlaylistGroupPlaylistsEditorComponent } from "../playlist-group-playlists-editor/playlist-group-playlists-editor.component";

import { PlaylistGroup } from "../../models/PlaylistGroup";

@Component({
  selector: "app-playlist-group",
  templateUrl: "./playlist-group.component.html",
  styleUrls: ["./playlist-group.component.css"],
})
export class PlaylistGroupsComponent implements OnInit {
  playlistGroups: PlaylistGroup[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPlaylistGroups();
  }

  getPlaylistGroups(): void {
    this.spinner.show();

    // this.firestoreService.getPlaylistGroups().then((result: any) => {
    //   this.playlistGroups = result.playlistGroups;
    //   this.spinner.hide();
    // });
  }

  addNewPlaylistGroup(): void {
    const dialogRef = this.dialog.open(PlaylistGroupEditorComponent, {
      width: "500px",
      data: {
        isEditMode: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        // Add new playlist group
        this.playlistGroups.unshift(result.newPlaylistGroup);
        demo.showSuccessNotification("Playlist Group successfully added!");
      }
    });
  }

  edit(playlistGroup: PlaylistGroup) {
    const dialogRef = this.dialog.open(PlaylistGroupEditorComponent, {
      width: "650px",
      data: {
        isEditMode: true,
        playlistGroup: playlistGroup,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        // Edit name
        if (result.playlistGroupNameUpdated) {
          playlistGroup.name = result.newPlaylistGroupName;
          demo.showSuccessNotification(
            "Playlist Group name successfully updated!"
          );
        }
      }
    });
  }

  delete(playlistGroup: PlaylistGroup) {
    const options = {
      title: "Delete Playlist Group?",
      text: "Are you sure you want to delete this playlist group?",
      icon: "error",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    };

    swal(options).then((willDelete) => {
      if (willDelete) {
        this.spinner.show();

        // Delete playlist
        // this.firestoreService.deletePlaylistGroup(playlistGroup).then(
        //   (result: any) => {
        //     this.removePlaylistGroupFromList(playlistGroup);
        //     demo.showSuccessNotification(
        //       "Playlist Group successfully deleted!"
        //     );

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

  removePlaylistGroupFromList(playlistGroup: PlaylistGroup) {
    const index = this.playlistGroups.indexOf(playlistGroup);
    if (index > -1) {
      this.playlistGroups.splice(index, 1);
    }
  }

  openPlaylists(playlistGroup: PlaylistGroup) {
    const dialogRef = this.dialog.open(PlaylistGroupPlaylistsEditorComponent, {
      width: "1000px",
      minHeight: "500px",
      data: { playlistGroup: playlistGroup },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
