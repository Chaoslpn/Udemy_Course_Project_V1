import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    isLoggedIn = false;

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
        
    }
    
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isLoggedIn = !!user;
        });
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    
    onSaveData() {
        this.dataStorageService.saveRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}