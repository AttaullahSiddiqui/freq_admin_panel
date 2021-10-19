import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";
import { environment } from "../../../environments/environment";
import "../../../assets/js/demo.js";
import swal from "sweetalert";
declare var demo: any;

import { SongEditorComponent } from "../song-editor/song-editor.component";
import { SongPlayerComponent } from "../song-player/song-player.component";

import { Program } from "../../models/Program";
import { Genre } from "../../models/Genre";

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.css"],
})
export class SongsComponent implements OnInit {
  getFileUrl = environment.getFileUrl;
  songs: Program[] = [];
  originalSongs: Program[];
  programEditKey = null;

  public isSearching = false;

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpService,
    private util: UtilityService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getPrograms();
    // this.listenForSearchInput(500);
    // this.firebaseStorage.songUploaded.subscribe(result => {
    //   if (result.isSuccess) {
    //     this.firebaseStorage.removeNotification(result.newSong.name);
    //     this.songs.unshift(result.newSong);
    //     demo.showSuccessNotification("Song successfully added!");
    //   }
    // });
    // this.firebaseStorage.songUpdated.subscribe(result => {
    //   if (result.isSuccess) {
    //     if (result.songUpdated) {
    //       demo.showSuccessNotification("Song successfully updated!");
    //     }
    //   }
    // });
  }

  getPrograms(): void {
    this.http
      .get("programs/fetchAll")
      .then((success) => {
        console.log(success);
        this.spinner.hide();
        this.songs = success.body.data;
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });
  }
  addNewProgram(): void {
    const dialogRef = this.dialog.open(SongEditorComponent, {
      width: "500px",
      data: {
        isEditMode: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        this.songs.unshift(result.newProgram);
        demo.showSuccessNotification("Song successfully added!");
      }
    });
  }

  edit(programKey, program: Program) {
    this.programEditKey = programKey;
    const dialogRef = this.dialog.open(SongEditorComponent, {
      width: "500px",
      data: {
        isEditMode: true,
        program: program,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        this.songs[this.programEditKey] = result.updateProgram;
        demo.showSuccessNotification("Song updated successfully!");
      }
    });
  }

  delete(deleteKey, toDeleteSongId, picKey, songKey) {
    const options = {
      title: "Delete Song?",
      text: "Are you sure you want to delete this song?",
      icon: "error",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    };

    swal(options).then((willDelete) => {
      if (willDelete) {
        this.spinner.show();
        this.http
          .post("programs/delete", {
            programId: toDeleteSongId,
            picture: picKey,
            song: songKey,
          })
          .then((success) => {
            demo.showSuccessNotification("Song successfully deleted!");
            this.spinner.hide();
            this.songs.splice(deleteKey, 1);
          })
          .catch((err: Response) => {
            this.spinner.hide();
            demo.showErrorNotification(err["error"].message);
          });
      }
    });
  }

  listenForSearchInput(timeoutTime: number): any {
    // const searchInput = <HTMLInputElement>(
    //   document.getElementById("searchInput")
    // );
    // let timeout = null;
    // searchInput.onkeyup = (e) => {
    //   clearTimeout(timeout);
    //   timeout = setTimeout(() => {
    //     this.searchSongs(searchInput.value);
    //   }, timeoutTime);
    // };
  }

  searchSongs(searchValue: string) {
    this.isSearching = true;

    if (searchValue !== "" && searchValue.length >= 3) {
      this.spinner.show();

      this.songs = [];

      // this.firestoreService.getSongs().then((result: any) => {
      //   result.songs.forEach((song) => {
      //     if (
      //       song.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
      //       song.artistName.toLowerCase().indexOf(searchValue.toLowerCase()) >
      //         -1 ||
      //       song.albumName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      //     ) {
      //       this.songs.push(song);
      //     }
      //   });

      //   this.spinner.hide();
      // });
    } else if (searchValue === "") {
      this.clearSearchInput();
    }
  }

  clearSearchInput() {
    // this.songs = this.originalSongs;
    // this.isSearching = false;
    // const searchInput = <HTMLInputElement>(
    //   document.getElementById("searchInput")
    // );
    // searchInput.value = "";
  }

  play(programNode: Program) {
    const dialogRef = this.dialog.open(SongPlayerComponent, {
      data: {
        program: programNode,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
