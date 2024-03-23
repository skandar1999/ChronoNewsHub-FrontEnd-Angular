import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
  
})
export class ConnexionComponent implements OnInit {
  newUser: User = new User();
  errorMessage: string = '';
  successMessage: string = '';
  user: any = {};; 
  vide: boolean = false;
  videRegister: boolean = false;
  err: boolean = false;
  loading: boolean = false;

  hidePassword: boolean = true;

  constructor(private connexionService: ConnexionService , 
              private router: Router ,
              private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton?.addEventListener('click', () => {
      container?.classList.add("right-panel-active");
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove("right-panel-active");
    });

    
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  registerUser() {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.mobile || !this.newUser.password ) {
        this.videRegister = true;
        setTimeout(() => {
            this.videRegister = false;
        }, 3000);
        return;
    }
    this.connexionService.registerUser(this.newUser).subscribe(
        (response) => {
            console.log('Response from backend:', response);
            if (response.status) {
                this.successMessage = response.message;
                // Set loading state to true only when the user is successfully created
                this.loading = true;
                // Navigate to the index page after a successful registration
                setTimeout(() => {
                    // Reset loading state and success message after navigation
                    this.loading = false;
                    this.successMessage = '';
                    // Toggle to sign-in view
                    this.toggleView();
                }, 3000);
            } else {
                this.errorMessage = response.message;
                // Reset error message after 3 seconds
                setTimeout(() => {
                    this.errorMessage = '';
                }, 3000);
            }
        },
        (error) => {
            console.error('Error during registration:', error);
            this.errorMessage = 'An error occurred during registration';
            // Reset error message after 3 seconds
            setTimeout(() => {
                this.errorMessage = '';
            }, 3000);
        }
    );
}

toggleView() {
    const container = document.getElementById('container');
    container?.classList.remove('right-panel-active');
}

onLoggedin(): void {
  if (!this.user.email || !this.user.password) {
      this.vide = true;
      setTimeout(() => {
          this.vide = false;
      }, 1000);
      return;
  }

  this.loading = true; // Set loading to true before making the login request

  this.connexionService.login(this.user)
      .subscribe(
          (data) => {
              console.log('Login successful:', data);
              this.connexionService.saveToken(data.token); // Save token to local storage
              this.router.navigate(['/index']); // Navigate to profile page
          },
          (error) => {
              console.error('Login error:', error);
              this.loading = false; // Set loading to false in case of login error
              this.err = true;
              setTimeout(() => {
                  this.err = false;
              }, 1000);
              if (error.message === 'Invalid credentials.') {
                  this.errorMessage = 'You have entered an invalid email or password.';
              } else {
                  this.errorMessage = 'An error occurred. Please try again later.';
              }
          }
      );
}




}
  

