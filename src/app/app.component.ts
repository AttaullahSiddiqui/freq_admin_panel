import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, Event } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { LoginModalComponent } from "./components/login-modal/login-modal.component";
import { HttpService, Response } from "./services/http.service";
import { UtilityService } from "./services/utility.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Dashboard";
  login: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private http: HttpService,
    private util: UtilityService
  ) {
    this.checkAuth();
    this.initialiseGenres();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        const elements = document.getElementsByClassName("active");

        Array.prototype.forEach.call(elements, function (element) {
          element.classList.remove("active");
        });
        switch (event.url) {
          case "/dashboard":
            const dashboardMenuItem: any =
              document.getElementById("dashboardMenuItem");
            dashboardMenuItem.classList.add("active");
            this.title = "Dashboard";
            break;

          case "/artists":
            const artistsMenuItem: any =
              document.getElementById("artistsMenuItem");
            artistsMenuItem.classList.add("active");
            this.title = "Artists";
            break;

          case "/albums":
            const albumsMenuItem: any =
              document.getElementById("albumsMenuItem");
            albumsMenuItem.classList.add("active");
            this.title = "Albums";
            break;

          case "/songs":
            const songsMenuItem: any = document.getElementById("songsMenuItem");
            songsMenuItem.classList.add("active");
            this.title = "Songs";
            break;

          case "/genres":
            const genresMenuItem: any =
              document.getElementById("genresMenuItem");
            genresMenuItem.classList.add("active");
            this.title = "Categories";
            break;

          case "/notes":
            const notesMenuItem: any = document.getElementById("notesMenuItem");
            notesMenuItem.classList.add("active");
            this.title = "Notes";
            break;

          case "/playlists":
            const playlistsMenuItem: any =
              document.getElementById("playlistsMenuItem");
            playlistsMenuItem.classList.add("active");
            this.title = "Playlists";
            break;

          case "/users":
            const userssMenuItem: any =
              document.getElementById("userssMenuItem");
            userssMenuItem.classList.add("active");
            this.title = "Users";
            break;

          case "/playlistGroups":
            const playlistGroupsMenuItem: any = document.getElementById(
              "playlistGroupsMenuItem"
            );
            playlistGroupsMenuItem.classList.add("active");
            this.title = "Playlist Groups";
            break;

          case "/privacy":
            const privacy: any = document.getElementById("privacy");
            privacy.classList.add("active");
            this.title = "Privacy Policy";
            break;
          case "/terms":
            const terms: any = document.getElementById("terms");
            terms.classList.add("active");
            this.title = "Change Terms and Conditions";
            break;
        }
      }
    });

    // this.router.events.subscribe((val: NavigationEnd) => {
    //   console.log(val.urlAfterRedirects);
    //   console.log("Wokringgg");
    //   const elements = document.getElementsByClassName("active");

    //   Array.prototype.forEach.call(elements, function (element) {
    //     element.classList.remove("active");
    //   });

    //   switch (val.urlAfterRedirects) {
    //     case "/dashboard":
    //       const dashboardMenuItem =
    //         document.getElementById("dashboardMenuItem");
    //       dashboardMenuItem.classList.add("active");
    //       this.title = "Dashboard";
    //       break;

    //     case "/artists":
    //       const artistsMenuItem = document.getElementById("artistsMenuItem");
    //       artistsMenuItem.classList.add("active");
    //       this.title = "Artists";
    //       break;

    //     case "/albums":
    //       const albumsMenuItem = document.getElementById("albumsMenuItem");
    //       albumsMenuItem.classList.add("active");
    //       this.title = "Albums";
    //       break;

    //     case "/songs":
    //       const songsMenuItem = document.getElementById("songsMenuItem");
    //       songsMenuItem.classList.add("active");
    //       this.title = "Songs";
    //       break;

    //     case "/genres":
    //       const genresMenuItem = document.getElementById("genresMenuItem");
    //       genresMenuItem.classList.add("active");
    //       this.title = "Categories";
    //       break;

    //     case "/notes":
    //       const notesMenuItem = document.getElementById("notesMenuItem");
    //       notesMenuItem.classList.add("active");
    //       this.title = "Notes";
    //       break;

    //     case "/playlists":
    //       const playlistsMenuItem =
    //         document.getElementById("playlistsMenuItem");
    //       playlistsMenuItem.classList.add("active");
    //       this.title = "Playlists";
    //       break;

    //     case "/users":
    //       const userssMenuItem = document.getElementById("userssMenuItem");
    //       userssMenuItem.classList.add("active");
    //       this.title = "Users";
    //       break;

    //     case "/playlistGroups":
    //       const playlistGroupsMenuItem = document.getElementById(
    //         "playlistGroupsMenuItem"
    //       );
    //       playlistGroupsMenuItem.classList.add("active");
    //       this.title = "Playlist Groups";
    //       break;

    //     case "/privacy":
    //       const privacy = document.getElementById("privacy");
    //       privacy.classList.add("active");
    //       this.title = "Privacy Policy";
    //       break;
    //     case "/terms":
    //       const terms = document.getElementById("terms");
    //       terms.classList.add("active");
    //       this.title = "Change Terms and Conditions";
    //       break;
    //   }
    // });
  }

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    this.http
      .get("user/me")
      .then((result: Response) => {
        let user = result.body.data;
        this.router.navigateByUrl("tabs");
        if (user.userType == "admin") {
          this.login = true;
          this.router.navigateByUrl("/genres");
        } else {
          this.router.navigateByUrl("/login");
          this.login = false;
        }
      })
      .catch((error: Response) => {
        this.router.navigate(["/login"]);
      });
    // this.authService.afAuth.authState.subscribe((user: firebase.User) => {
    //   console.log("login", this.login);
    //   if (!user) {
    //     this.router.navigateByUrl("/login");
    //     this.login = false;
    //   } else {
    //     this.login = true;
    //     this.router.navigateByUrl("/");
    //   }
    // });
  }

  initialiseGenres() {
    // this.firestoreService.getGenres().then((result: any) => {
    //   if (result.genres.length <= 0) {
    //     this.firestoreService.initialiseGenres();
    //   }
    // });
  }

  signOut() {
    this.util.removeCookie("authToken");
    this.util.removeToken();
    // this.router.navigateByUrl("/login");
    location.reload();
    // setTimeout(() => {
    //   firebase
    //     .auth()
    //     .signOut()
    //     .then(() => {
    //       this.router.navigate(["/login"]);
    //     });
    // }, 500);
  }
}
