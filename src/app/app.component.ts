import { Component } from '@angular/core';
import { AccountService } from './_services';
import { User } from './_models';
import { FormControl } from '@angular/forms';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: User | null;

    myControl = new FormControl();
    options: string[] = ['Delhi', 'Mumbai', 'Banglore'];

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
}
