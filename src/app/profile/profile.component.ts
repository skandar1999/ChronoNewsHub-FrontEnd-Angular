import { ConnexionService } from './../services/connexion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  email: string | undefined;
  mobile: string | undefined;
  username: string | undefined;
  userImage: string | undefined;
  userData: User | undefined;
  roles: string[] | undefined;
  yesadmin: boolean = false;
  showForm: boolean = false;
  showFormPassword: boolean = false;

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
        this.user = decodedToken;
        console.log('User data:', this.user);

        // Call the function to fetch user data
        this.findUserByEmail(this.user.email);
      }
    });
  }

  onLogout() {
    this.connexionService.logout();
  }


  
  findUserByEmail(email: string): void {
    this.connexionService.findUserByEmail(email).subscribe(
      user => {
        console.log('User Data:', user);
        this.userData = user;
        this.email = this.userData.email;
        this.mobile = this.userData.mobile;
        this.roles = this.userData.roles;
        this.userImage = 'https://127.0.0.1:8000/UserImages/' + this.userData.image;

        this.yesadmin = this.roles?.includes("ADMIN") || this.roles?.includes("SUPER_ADMIN");
      },
      error => {
        console.error(error);
      }
    );
  }


  toggleForm(formName: string): void {
    if (formName === 'userInfoForm') {
      this.showForm = !this.showForm;
    } else if (formName === 'passwordForm') {
      this.showFormPassword = !this.showFormPassword;
    }
  }
  
  
}
  
  
  

