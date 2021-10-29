import { Component, OnInit, ViewChild } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, BaseChartDirective } from "ng2-charts";
import { Program } from "src/app/models/Program";
import { CsvBuilder } from "filefy";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  artistsCount: Number = 0;
  albumsCount: Number = 0;
  songsCount: Number = 0;
  playlistsCount: Number = 0;
  selectedStartDate: any;
  selectedEndDate: any;
  selectedSongId: any;
  filterSongs: any;
  totalPlay: any;
  totalTime: any;
  noDataFound: boolean = false;

  // @ViewChild(BaseChartDirective) "chart": BaseChartDirective;

  public lineChartData: ChartDataSets[] = [
    {
      data: [],
    },
  ];
  // public lineChartLabels: any[] = [30, 36, 40, 20, 21, 39];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "week",
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: "#9B51E0",
      backgroundColor: "#bf37ff14",
    },
  ];
  public lineChartLegend = false;
  public lineChartType = "line";
  public lineChartPlugins = [];
  public songDetails = [];
  public rowsForCsv = [];
  songs: any;
  constructor(private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    // this.getDetail();
    this.getSongs();
    const promises: any = [
      // this.firestoreService.getArtistsCount(),
      // this.firestoreService.getAlbumsCount(),
      // this.firestoreService.getSongsCount(),
      // this.firestoreService.getPlaylistsCount()
    ];

    Promise.all(promises).then((values: any) => {
      this.artistsCount = values[0].count;
      this.albumsCount = values[1].count;
      this.songsCount = values[2].count;
      this.playlistsCount = values[3].count;
      this.spinner.hide();
    });
    console.log("song details", this.songDetails);
    this.selectedStartDate = new Date().toISOString().split("T")[0];
    this.selectedEndDate = this.selectedStartDate;
  }

  downloadToCsv() {
    var csvBuilder = new CsvBuilder("info.csv").setColumns([
      " Song Name ",
      " Date ",
      " Plays ",
      " Time Played ",
    ]);
    this.rowsForCsv.map((value: any) => {
      console.log("csv", value);
      var dateObj = new Date(value.date.toDate());
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      let preDateFull = year + "-" + month + "-" + day;
      csvBuilder.addRow([
        value.name,
        preDateFull,
        value.numberOfPlayed,
        value.totalTime,
      ]);
    });
    csvBuilder.exportFile();
  }

  changeStartDate() {
    console.log(this.selectedStartDate);
    let d = this.selectedStartDate.toString().slice(-2);
    this.lineChartData[0].data = [];

    console.log({ d });
    setTimeout(() => {
      this.getDetail(this.selectedStartDate, this.selectedEndDate);
    }, 1000);
  }

  getSelectedSongDetails(song: Program) {
    // this.selectedSongId = song.songId;
    // console.log("selected song id", this.selectedSongId);
    // this.lineChartData[0].data = [];
    // setTimeout(() => {
    //   this.getDetail(this.selectedStartDate, this.selectedEndDate);
    // }, 1000);
  }

  changeEndDate() {
    console.log(this.selectedEndDate);
    this.lineChartData[0].data = [];

    setTimeout(() => {
      this.getDetail(this.selectedStartDate, this.selectedEndDate);
    }, 1000);
    // this.getDetail(this.selectedStartDate, this.selectedEndDate);
  }

  getSongs() {
    // this.firestoreService.getSongs().then((songs: any) => {
    //   console.log("songs", songs);
    //   this.songs = songs.songs;
    //   console.log(this.selectedSongId);
    // });
  }

  getDetail(startDate?: any, endDate?: any) {
    // this.selectedSongId = song.songId;
    if (!this.selectedSongId) return;
    // this.firestoreService
    //   .getSongDetails(startDate, endDate, this.selectedSongId)
    //   .then((songD: any) => {
    //     this.songDetails = songD.SongDetailSnapshotPlaylists;
    //     // console.log(this.songDetails);
    //     if (this.songDetails.length !== 0) {
    //       this.noDataFound = false;
    //       this.rowsForCsv = [];
    //       let filter = this.songDetails.filter(
    //         (song, index) => song.songId == this.songDetails[0].songId
    //       );
    //       // console.log(filter);
    //       var totalPlay = filter
    //         .map((e) => e.numberOfPlayed)
    //         .reduce((total, num) => total + num);
    //       var totalTime = filter
    //         .map((e) => e.totalTime)
    //         .reduce((total, num) => total + num);
    //       // this.filterSongs = filter[0];
    //       this.totalPlay = totalPlay;
    //       this.totalTime = totalTime;
    //       for (var i in filter) {
    //         this.rowsForCsv.push(filter[i]);
    //         // console.log({ filter })
    //         var dateObj = new Date(filter[i].date.toDate());
    //         var month = dateObj.getUTCMonth() + 1; //months from 1-12
    //         var day = dateObj.getUTCDate();
    //         var year = dateObj.getUTCFullYear();
    //         // var newdate = year + "-" + month + "-" + (day - 1);
    //         // let d = newdate.toString().slice(-2);
    //         // let preDate = parseInt(d) - 1;
    //         let preDateFull = year + "-" + month + "-" + day;
    //         // console.log({ preDateFull, day });

    //         // [x: new Date(car), y: 0];

    //         this.lineChartData[0].data.push({
    //           x: new Date(preDateFull),
    //           y: filter[i].numberOfPlayed,
    //         });
    //         // this.lineChartData[0].data.splice(0, 0, { x: new Date(preDateFull), y: 0 });
    //         // this.lineChartData[0].data.splice(0, 0, { y: 0 });
    //         // console.log(this.lineChartData);
    //         setTimeout(() => {
    //           if (this.chart && this.chart.chart && this.chart.chart.config) {
    //             // this.chart.chart.config.data = this.lineChartData;
    //             this.chart.chart.update();
    //           }
    //         });
    //       }

    //       // arr = arr.map(function (val) { return val + val; });
    //     } else {
    //       console.log("not data found");
    //       this.noDataFound = true;
    //     }
    //   })
    //   .catch((e) => console.log("e", e));
  }
}
