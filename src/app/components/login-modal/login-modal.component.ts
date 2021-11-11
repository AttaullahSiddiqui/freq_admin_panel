import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";
declare var demo: any;

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.css"],
})
export class LoginModalComponent implements OnInit {
  loginData: any;
  isLoading = false;

  constructor(
    private router: Router,
    private http: HttpService,
    private util: UtilityService
  ) {
    this.loginData = { email: "", password: "" };
  }

  ngOnInit() {
    this.http
      .get("notes/fetchAll")
      .then((success) => {
        console.log("bcc");
        console.log(success);
      })
      .catch((err: Response) => {
        console.log(err["error"]);
      });
  }

  signIn(): void {
    this.isLoading = true;

    this.http
      .post("user/login", this.loginData)
      .then((success) => {
        this.isLoading = false;
        let result = success.body.data;
        this.loginData.email = "";
        this.loginData.password = "";
        this.util.setCookie("authToken", result.accessToken, {
          expireDays: 30,
        });
        // window.location.reload();
        demo.showSuccessNotification("Log in successful");
        location.reload();
        // this.router.navigate(["/genres"]);
      })
      .catch((err: Response) => {
        this.isLoading = false;
        console.log(err);
        if (err["error"]) demo.showErrorNotification(err["error"].message);
      });

    // this.authService
    //   .signIn(this.loginData.email, this.loginData.password)
    //   .then(x => {
    //     this.isLoading = false;
    //     window.location.reload();

    //     demo.showSuccessNotification("Log in successful");
    //   })
    //   .catch(error => {
    //     this.isLoading = false;
    //     console.error(error);
    //     demo.showErrorNotification("Log in failed:\n" + error);
    //   });
  }

  signUp(): void {
    this.isLoading = true;

    // this.authService
    //   .registerUser(this.loginData.email, this.loginData.password)
    //   .then((x) => {
    //     this.isLoading = false;
    //     demo.showSuccessNotification("Sign up successful");
    //   })
    //   .catch((error) => {
    //     this.isLoading = false;
    //     console.error(error);
    //     demo.showErrorNotification("Sign up failed:\n" + error);
    //   });
  }

  signInWithFacebook() {
    this.isLoading = true;

    // this.authService
    //   .signInWithFacebook()
    //   .then(() => {
    //     this.isLoading = false;
    //     demo.showSuccessNotification("Log in successful");
    //   })
    //   .catch((error) => {
    //     this.isLoading = false;
    //     console.error(error);
    //     demo.showErrorNotification("Log in failed:\n" + error);
    //   });
  }

  signInWithGoogle(): void {
    this.isLoading = true;

    // this.authService
    //   .signInWithGoogle()
    //   .then(() => {
    //     this.isLoading = false;
    //     demo.showSuccessNotification("Log in successful");
    //   })
    //   .catch((error) => {
    //     this.isLoading = false;
    //     console.error(error);
    //     demo.showErrorNotification("Log in failed:\n" + error);
    //   });
  }

  signInWithTwitter() {
    this.isLoading = true;

    // this.authService
    //   .signInWithTwitter()
    //   .then(() => {
    //     this.isLoading = false;
    //     demo.showSuccessNotification("Log in successful");
    //   })
    //   .catch((error) => {
    //     this.isLoading = false;
    //     console.error(error);
    //     demo.showErrorNotification("Log in failed:\n" + error);
    //   });
  }

  signInWithGithub(): void {
    this.isLoading = true;

    // this.authService
    //   .signInWithGithub()
    //   .then(() => {
    //     this.isLoading = false;
    //     demo.showSuccessNotification("Log in successful");
    //   })
    //   .catch((error) => {
    //     this.isLoading = false;
    //     console.error(error);
    //     demo.showErrorNotification("Log in failed:\n" + error);
    //   });
  }
}
