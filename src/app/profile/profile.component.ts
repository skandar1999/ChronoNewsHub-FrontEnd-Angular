import { ConnexionService } from './../services/connexion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any; 

  constructor(
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService,
                  public connexionService: ConnexionService,

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const token = params['token'];
      const decodedToken: any = this.jwtHelper.decodeToken(token);
  
      if (decodedToken) {
        this.user = decodedToken; // Assign decoded data to the user object
        console.log('User data:', this.user); // Display user data in the console
      }
  
    });
  }

  onLogout() {
    this.connexionService.logout();
  }
  

}
