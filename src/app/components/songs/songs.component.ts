import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import "../../../assets/js/demo.js";
import swal from "sweetalert";
declare var demo: any;

import { SongEditorComponent } from "../song-editor/song-editor.component";
import { SongPlayerComponent } from "../song-player/song-player.component";

import { Song } from "../../models/Song";
import { Album } from "../../models/Albums";
import { Playlist } from "../../models/Playlist";
import { Genre } from "../../models/Genre";

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.css"],
})
export class SongsComponent implements OnInit {
  @Input() isPlaylistEditing = false;
  @Input() playlist: Playlist;
  @Input() playlistSongs: Song[];

  @Input() isGenreEditing = false;
  @Input() genre: Genre;
  @Input() genreSongs: Song[];

  @Input() album: Album;

  songs: Song[] = [];
  originalSongs: Song[];

  public isSearching = false;

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSongs();
    this.listenForSearchInput(500);

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

  getSongs(): void {
    this.spinner.show();

    if (this.album) {
      this.getAlbumSongs();
    } else {
      this.getAllSongs();
    }
  }

  getAlbumSongs() {
    // this.firestoreService
    //   .getAlbumSongs(this.album.albumId)
    //   .then((result: any) => {
    //     this.songs = result.songs;
    //     this.originalSongs = this.songs;
    //     this.spinner.hide();
    //   });
  }

  getAllSongs() {
    // this.firestoreService.getSongs().then((result: any) => {
    //   this.songs = result.songs;
    //   this.originalSongs = this.songs;
    //   this.songs.forEach((song) => {
    //     if (this.isPlaylistEditing) {
    //       this.checkIfPlaylistSong(song);
    //     } else if (this.isGenreEditing) {
    //       this.checkIfGenreSong(song);
    //     }
    //   });
    //   this.spinner.hide();
    // });
  }

  checkIfPlaylistSong(song: Song) {
    if (this.playlistSongs) {
      const playlistSong = this.playlistSongs.find(
        (x) => x.songId === song.songId
      );

      if (playlistSong) {
        song.isPartOfPlaylist = true;
        song.playlistSongId = playlistSong.playlistSongId;
      }
    }
  }

  checkIfGenreSong(song: Song) {
    if (this.genreSongs) {
      const genreSong = this.genreSongs.find((x) => x.songId === song.songId);

      if (genreSong) {
        song.isPartOfGenre = true;
        song.genreSongId = genreSong.genreSongId;
      }
    }
  }

  addNewSong(): void {
    const dialogRef = this.dialog.open(SongEditorComponent, {
      width: "500px",
      data: {
        isEditMode: false,
      },
    });
  }

  edit(song: Song) {
    const dialogRef = this.dialog.open(SongEditorComponent, {
      width: "650px",
      data: {
        isEditMode: true,
        song: song,
      },
    });
  }

  delete(song: Song) {
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

        // this.firestoreService.deleteSong(song).then(
        //   (result: any) => {
        //     this.removeSongFromList(song);
        //     demo.showSuccessNotification("Song successfully deleted!");

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

  removeSongFromList(song: Song) {
    const index = this.songs.indexOf(song);

    if (index > -1) {
      this.songs.splice(index, 1);
    }
  }

  listenForSearchInput(timeoutTime: number): any {
    const searchInput = <HTMLInputElement>(
      document.getElementById("searchInput")
    );
    let timeout = null;

    searchInput.onkeyup = (e) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        this.searchSongs(searchInput.value);
      }, timeoutTime);
    };
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
    this.songs = this.originalSongs;
    this.isSearching = false;

    const searchInput = <HTMLInputElement>(
      document.getElementById("searchInput")
    );
    searchInput.value = "";
  }

  addSongToPlaylist(song: Song) {
    // this.firestoreService.addSongToPlaylist(song, this.playlist).then(
    //   (result: any) => {
    //     song.playlistSongId = result.newPlaylistSongId;
    //     song.isPartOfPlaylist = true;
    //   },
    //   (error: any) => {
    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  removeSongFromPlaylist(song: Song) {
    // this.firestoreService.removeSongFromPlaylist(song, this.playlist).then(
    //   (result: any) => {
    //     song.isPartOfPlaylist = false;
    //   },
    //   (error: any) => {
    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  addSongToGenre(song: Song) {
    // this.firestoreService.addSongToGenre(song, this.genre).then(
    //   (result: any) => {
    //     song.genreSongId = result.newGenreSongId;
    //     song.isPartOfGenre = true;
    //   },
    //   (error: any) => {
    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  removeSongFromGenre(song: Song) {
    // this.firestoreService.removeSongFromGenre(song, this.genre).then(
    //   (result: any) => {
    //     song.isPartOfGenre = false;
    //   },
    //   (error: any) => {
    //     demo.showErrorNotification("An error occured: " + error);
    //   }
    // );
  }

  play(song: Song) {
    const dialogRef = this.dialog.open(SongPlayerComponent, {
      data: {
        song: song,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
