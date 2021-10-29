import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map } from "rxjs/operators";
import { environment } from "../../environments/environment";

import { UtilityService } from "./utility.service";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(
    private http: HttpClient,
    public utility: UtilityService,
    private route: Router
  ) { }

  getHeaders(isMultiPartFormData?: boolean): HttpHeaders {
    const authorizationToken = this.utility.getCookie("authToken");
    let options: any = {
      // 'Content-Type': 'application/json',
    };
    if (authorizationToken) {
      options["authorization"] = "Bearer " + authorizationToken;
    }
    const headers = new HttpHeaders(options);
    return headers;
  }

  async get(url: string): Promise<Response> {
    try {
      let headers: HttpHeaders = this.getHeaders();
      let result = await this.http
        .get<any>(environment.baseUrl + url, {
          observe: "response",
          headers: headers,
        })
        .toPromise();
      return {
        body: result.body,
        status: result.status,
        statusText: result.statusText,
      };
    } catch (error: any) {
      return Promise.reject(this.handleError(error));
    }
  }

  async post(url: string, data: any, options?: options): Promise<Response> {
    try {
      let headers: HttpHeaders;
      if (options && options.isMultiPartFormData) {
        headers = this.getHeaders(true);
      } else {
        headers = this.getHeaders();
      }
      let result = await this.http
        .post<any>(environment.baseUrl + url, data, {
          observe: "response",
          headers: headers,
        })
        .toPromise();
      return {
        body: result.body,
        status: result.status,
        statusText: result.statusText,
      };
    } catch (error: any) {
      return Promise.reject(this.handleError(error));
    }
  }

  async put(url: string, data: any, options?: options): Promise<Response> {
    try {
      let headers: HttpHeaders;
      if (options && options.isMultiPartFormData) {
        headers = this.getHeaders(true);
      } else {
        headers = this.getHeaders();
      }
      let result = await this.http
        .put<any>(environment.baseUrl + url, data, {
          observe: "response",
          headers: headers,
        })
        .toPromise();
      return {
        body: result.body,
        status: result.status,
        statusText: result.statusText,
      };
    } catch (error: any) {
      return Promise.reject(this.handleError(error));
    }
  }

  async delete(url: string): Promise<Response> {
    try {
      let headers: HttpHeaders = this.getHeaders();
      let result = await this.http
        .delete<any>(environment.baseUrl + url, {
          observe: "response",
          headers: headers,
        })
        .toPromise();
      return {
        body: result.body,
        status: result.status,
        statusText: result.statusText,
      };
    } catch (error: any) {
      return Promise.reject(this.handleError(error));
    }
  }

  private handleError(error: HttpErrorResponse): Response {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
    }

    return {
      error: error.error,
      status: error.status,
      statusText: error.statusText,
    };
  }
}

export interface Response {
  error?: any;
  status: number;
  statusText: string;
  body?: any;
}

export interface options {
  isMultiPartFormData?: boolean;
}
