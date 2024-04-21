import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ConnexionService } from '../services/connexion.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader: boolean = true;
  user: any; 

  constructor(private router: Router,
              public connexionService: ConnexionService,
              private route: ActivatedRoute,
              private jwtHelper: JwtHelperService) { }

              ngOnInit(): void {
                this.router.events.subscribe(event => {
                    if (event instanceof NavigationEnd) {
                        this.showHeader = !event.url.includes('/connexion') && !event.url.includes('/homeDashboard')
                        && !event.url.includes('/addpost') && !event.url.includes('/contactliste') && !event.url.includes('/Usersliste') ;
                    }
                });


            
                this.route.params.subscribe(params => {
                    const token = params['token'];
                    if (token) {
                        this.user = this.jwtHelper.decodeToken(token);
                    }
                });
            
                // Retrieve login status from local storage
                const isLoggedIn = localStorage.getItem('isloggedIn');
                if (isLoggedIn === 'true') {
                    this.connexionService.isloggedIn = true;
                }
            }
            

              checkTokenExpiration(): void {
                if (this.connexionService.isloggedIn && this.connexionService.isTokenExpired()) {
                  this.connexionService.logout();
                }
              }
}
