import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
  Inject,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import "../../../assets/js/demo.js";
declare var demo: any;

import { PlaylistGroup } from "../../models/PlaylistGroup";

@Component({
  selector: "app-playlist-group-editor",
  templateUrl: "./playlist-group-editor.component.html",
  styleUrls: ["./playlist-group-editor.component.css"],
})
export class PlaylistGroupEditorComponent implements OnInit {
  playlistGroupName = "";
  playlistGroupId = "";
  isEditMode = false;

  constructor(
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<PlaylistGroupEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;

    if (this.isEditMode) {
      this.playlistGroupName = data.playlistGroup.name;
      this.playlistGroupId = data.playlistGroup.playlistGroupId;
    }
  }

  ngOnInit() { }

  addNewPlaylistGroup() {
    if (!this.playlistGroupName) {
      demo.showWarningNotification(
        "Please provide a name for the playlist group."
      );
      return;
    }

    this.spinner.show();

    const newPlaylistGroup = new PlaylistGroup();
    newPlaylistGroup.name = this.playlistGroupName;

    // this.firestoreService.addNewPlaylistGroup(newPlaylistGroup).then(
    //   (result: any) => {
    //     this.spinner.hide();

    //     newPlaylistGroup.playlistGroupId = result.newPlaylistGroupId;

    //     this.dialogRef.close({
    //       isSuccess: true,
    //       newPlaylistGroup: newPlaylistGroup,
    //     });
    //   },
    //   (error: any) => {
    //     this.spinner.hide();

    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  updatePlaylistGroupName() {
    if (!this.playlistGroupName) {
      demo.showWarningNotification(
        "Please provide a name for the playlist group."
      );
      return;
    }

    // this.firestoreService
    //   .editPlaylistGroupName(this.playlistGroupId, this.playlistGroupName)
    //   .then(
    //     (result: any) => {
    //       this.dialogRef.close({
    //         isSuccess: true,
    //         playlistGroupNameUpdated: true,
    //         newPlaylistGroupName: this.playlistGroupName,
    //       });
    //     },
    //     (error: any) => {
    //       demo.showErrorNotification("An error occured: " + error);
    //     }
    //   );
  }

  closeEditor() {
    this.dialogRef.close({
      isSuccess: false,
    });
  }
}
