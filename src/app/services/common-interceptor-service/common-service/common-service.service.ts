import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    public searchData = new BehaviorSubject<any>({});
    showWishList: boolean = false;
    showEnrollList: boolean = false;
    signupPage: boolean = false;
    profileQuestionData;
    questionId;
    constructor() { }
    public allowingToPressOnlyNumbers(event: any) {
        const pattern = /[0-9\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    public allowingToPressOnlyAlphabates(event: any) {
        const pattern = /[a-z\A-Z\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    public allowingToPressOnlyNumbersWithDot(event: any) {
        const pattern = /[0-9\.\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    updateFileData(data: any): void {
        this.searchData.next(data);
    }

    ngOnDestroy(): void { }
}
