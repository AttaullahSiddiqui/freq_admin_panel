import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private imagesTypes = ['image/x-png', 'image/png', 'image/gif', 'image/jpeg'];
  private imageSize: number = 5;
  public defaultUserImg = "./assets/static/images/default-user.png";
  constructor() { }

  public setToken(data: string) {
    localStorage.setItem('Authorization', data);
  }

  public getToken(): any {
    return localStorage.getItem('Authorization');
  }

  public removeToken() {
    localStorage.removeItem('Authorization');
  };

  public findUpdatedProperty(updatedData: any, oldData: any) {
    let isUpdated = false;
    let finalUpdatedObj: any = {};
    Object.keys(updatedData).forEach(key => {
      if (oldData[key] != updatedData[key]) {
        isUpdated = true;
        finalUpdatedObj[key] = updatedData[key];
      }
    })
    return {
      isUpdated: isUpdated,
      data: finalUpdatedObj
    };
  };

  public countDaysBetweenTwoDates(startDate: any, endDate: any) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let timeDiff = end.getTime() - start.getTime();
    let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  };

  //TODO :: Need to remove if not use
  // public converDateToDashDate(date): string {
  //   if (!date) {
  //     return "";
  //   }
  //     var a = date.split(' ');
  //     a = a.join('-');
  //     return a;
  // };

  public groupBy(array: any, key: any) {
    return array.reduce((rv: any, x: any) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  public findIndex(array: any[], value: any, key?: any): number {
    if (!key) {
      return array.findIndex((item) => item == value);
    } else {
      return array.findIndex((item) => item[key] == value);
    }
  };

  public findItem(array: any[], value: any, key: any): any {
    return array.find((item) => item[key] == value)
  };

  public removeItem(array: any[], removeItem: any[], key?: any) {
    if (!key) {
      return array.filter((item) => removeItem.indexOf(item) < 0)
    } else {
      return array.filter((item) => removeItem.indexOf(item[key]) < 0)
    }
  };

  public getDistinctItems(array: any[], key?: any) {
    if (!key) {
      return Array.from(new Set(array));
    } else {
      return Array.from(new Set(array.map(x => x[key])));
    }
  };

  public getMathcedValues(array1: any[], array2: any[], key?: any) {
    if (!key) {
      return array1.filter(e => array2.indexOf(e) !== -1);
    } else {
      return array1.filter(e => array2.findIndex(x => x[key] == e[key]) !== -1);
    }
  };

  public validateUserId(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
    let regex_noSpace = /^\S+$/g;
    if (regex_noSpace.test(control.value)) {
      return null;
    }
    return { invalidUserId: true };
  };

  public setCookie(name: string, value: string, options: CookiesOption) {
    let finalCookie = `${name}=${value}`;
    if (options.expireDays) {
      let d = new Date();
      d.setTime(d.getTime() + options.expireDays * 24 * 60 * 60 * 1000);
      let expires = `; expires=${d.toUTCString()}`;
      finalCookie = finalCookie + expires;
    }
    let cpath = options.path ? `; path=${options.path}` : '; path=/';
    finalCookie = finalCookie + cpath + ";";
    document.cookie = finalCookie;
  };

  public getCookie(name: string): string {
    name = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let allCookies = decodedCookie.split(';');
    let i = 0;
    for (i; i < allCookies.length; i++) {
      let cookie = allCookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  };

  public removeCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  };

  public validateImageFile(fileType: any) {
    let exist = this.imagesTypes.indexOf(fileType);
    if (exist == -1)
      return false

    return true;
  }

  public validateFileSize(fileSize: number): boolean {
    let allowedSize = this.imageSize * 1048576;
    if (fileSize > allowedSize)
      return false;

    return true;
  }

  public convertToDbDate(date: string): string {
    let item = date.split('/');
    let dbDate = item[2] + '-' + item[1] + '-' + item[0];
    return dbDate;
  }

  public convertObjToDbDate(obj: DateObj): string {
    return obj.year + '-' + obj.month + '-' + obj.day;
  }

  public currentDateObj(): DateObj {
    let date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    }
  }

}



interface DateObj {
  year: number,
  month: number,
  day: number
}

interface CookiesOption {
  path?: string,
  expireDays?: number
}