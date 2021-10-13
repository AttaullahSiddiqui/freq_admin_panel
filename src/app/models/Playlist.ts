import { Song } from "./Program";

export class Playlist {
  constructor() {}

  playlistId: string;
  name: string;
  picture: string;
  songs: Song[];
  playlistGroupPlaylistId: string;
  isPartOfPlaylistGroup: boolean;
}
