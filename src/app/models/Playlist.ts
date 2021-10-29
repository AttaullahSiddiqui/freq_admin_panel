import { Program } from "./Program";

export class Playlist {
  constructor() { }

  playlistId: string = "";
  name: string = "";
  picture: string = "";
  songs: Program[] = []
  playlistGroupPlaylistId: string = "";
  isPartOfPlaylistGroup: boolean = false
}
