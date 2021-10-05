export class Notification {
  constructor(songName: string, albumPicture: string, progress: number) {
    this.songName = songName;
    this.albumPicture = albumPicture;
    this.progress = progress;
  }
  
  songName: string;
  albumPicture: string;
  progress: number;
}
