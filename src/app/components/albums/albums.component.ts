import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import "../../../assets/js/demo.js";
import swal from "sweetalert";
declare var demo: any;

import { AlbumEditorComponent } from "../album-editor/album-editor.component";

import { Album } from "../../models/Albums";
import { Artist } from "../../models/Artist";
import { AlbumSongsComponent } from "../album-songs/album-songs.component";

@Component({
  selector: "app-albums",
  templateUrl: "./albums.component.html",
  styleUrls: ["./albums.component.css"],
})
export class AlbumsComponent implements OnInit {
  @Input() artist: Artist;

  albums: Album[] = [];
  originalAlbums: Album[];

  public isSearching = false;
  artistSpecific = false;

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAlbums();
    this.listenForSearchInput(500);
  }

  getAlbums(): void {
    this.spinner.show();

    if (this.artist) {
      this.getArtistAlbums();
    } else {
      this.getAllAlbums();
    }
  }

  getArtistAlbums() {
    this.artistSpecific = true;

    // this.firestoreService
    //   .getArtistAlbums(this.artist.artistId)
    //   .then((result: any) => {
    //     this.albums = result.albums;
    //     this.originalAlbums = this.albums;

    //     this.spinner.hide();
    //   });
  }

  getAllAlbums() {
    // this.firestoreService.getAlbums().then((result: any) => {
    //   this.albums = result.albums;
    //   this.originalAlbums = this.albums;
    //   this.spinner.hide();
    // });
  }

  addNewAlbum(): void {
    const dialogRef = this.dialog.open(AlbumEditorComponent, {
      width: "500px",
      data: {
        isEditMode: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        // Add new album
        this.albums.unshift(result.newAlbum);
        demo.showSuccessNotification("Album successfully added!");
      }
    });
  }

  edit(album: Album) {
    const dialogRef = this.dialog.open(AlbumEditorComponent, {
      width: "650px",
      data: {
        isEditMode: true,
        album: album,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        // Edit name
        if (result.albumNameUpdated) {
          album.name = result.newAlbumName;
          demo.showSuccessNotification("Album name successfully updated!");
        }

        // Edit picture
        else if (result.albumPictureUpdated) {
          album.picture = result.newAlbumPicture;
          demo.showSuccessNotification("Album picture successfully updated!");
        }
      }
    });
  }

  delete(album: Album) {
    const options = {
      title: "Delete Album?",
      text: "Are you sure you want to delete this album? All associated songs will also be deleted.",
      icon: "error",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    };

    swal(options).then((willDelete) => {
      if (willDelete) {
        this.spinner.show();

        // this.firestoreService.deleteAlbum(album).then(
        //   (result: any) => {
        //     this.removeAlbumFromList(album);
        //     demo.showSuccessNotification("Album successfully deleted!");

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

  removeAlbumFromList(album: Album) {
    const index = this.albums.indexOf(album);

    if (index > -1) {
      this.albums.splice(index, 1);
    }
  }

  listenForSearchInput(timeoutTime: number): any {
    console.log("gets here");

    const searchInput = <HTMLInputElement>(
      document.getElementById("searchInput")
    );
    let timeout = null;

    searchInput.onkeyup = (e) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        this.searchAlbums(searchInput.value);
      }, timeoutTime);
    };
  }

  searchAlbums(searchValue: string) {
    this.isSearching = true;

    if (searchValue !== "" && searchValue.length >= 3) {
      this.spinner.show();

      this.albums = [];

      if (this.artistSpecific) {
        this.searchArtistAlbums(searchValue);
      } else {
        this.searchAllAlbums(searchValue);
      }
    } else if (searchValue === "") {
      this.clearSearchInput();
    }
  }

  searchArtistAlbums(searchValue: string) {
    // this.firestoreService
    //   .getArtistAlbums(this.artist.artistId)
    //   .then((result: any) => {
    //     result.albums.forEach((album) => {
    //       if (
    //         album.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
    //         album.artistName.toLowerCase().indexOf(searchValue.toLowerCase()) >
    //           -1
    //       ) {
    //         this.albums.push(album);
    //       }
    //     });
    //     this.spinner.hide();
    //   });
  }

  searchAllAlbums(searchValue: string) {
    // this.firestoreService.getAlbums().then((result: any) => {
    //   result.albums.forEach((album) => {
    //     if (
    //       album.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
    //       album.artistName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    //     ) {
    //       this.albums.push(album);
    //     }
    //     this.spinner.hide();
    //   });
    // });
  }

  clearSearchInput() {
    this.albums = this.originalAlbums;
    this.isSearching = false;

    const searchInput = <HTMLInputElement>(
      document.getElementById("searchInput")
    );
    searchInput.value = "";
  }

  viewSongs(album: Album) {
    const dialogRef = this.dialog.open(AlbumSongsComponent, {
      data: {
        album: album,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
