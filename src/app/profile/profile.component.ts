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
  email: string = '';
  mobile: string  = '';
  username: string  = '';
  userImage: string | undefined;
  userData: User | undefined;
  roles: string[] | undefined;

  yesadmin: boolean = false;
  showForm: boolean = false;

  showFormPassword: boolean = false;
  password: string = '';
  NewPassword: string = '';
  confirmPassword: string = '';
  notValid: boolean = false;
  passwordMatch: boolean = true; 

  valideCurentPassword: boolean = false;

  hidePassword1 = true;
  hidePassword2 = true;
  hidePassword3 = true;
  errorMessagepw = '';
  errorMessage!: string;
  updateSuccess: boolean = false;

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
        this.username = this.userData.username;
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
  

  updateUserData() {
    const userToUpdate = new User();
    userToUpdate.username = this.username; 
    userToUpdate.mobile = this.mobile;
  
    this.connexionService.updateUser(this.email, userToUpdate).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
      },
      (error) => {
        console.error('Error updating user:', error);
        // Handle error
      }
    );

  }
 
  togglePassword1(): void {
    this.hidePassword1 = !this.hidePassword1;
  }

  togglePassword2(): void {
    this.hidePassword2 = !this.hidePassword2;
  }

  togglePassword3(): void {
    this.hidePassword3 = !this.hidePassword3;
  }
 
  checkPasswords() {
    this.connexionService.checkPassword(this.email, this.password).subscribe(
      (result) => {
        console.log('Result from checkPassword service:', result);
  
        this.valideCurentPassword = result; 
  
        if (!this.valideCurentPassword) {
          this.errorMessagepw = 'Le mot de passe actuel est incorrect.';
          setTimeout(() => {
            this.errorMessagepw = '';
          }, 4000); // error message
        } else {
          this.errorMessagepw = '';
        }
      },
      (error) => {
        console.error('Error while checking password:', error);
        this.errorMessagepw = error.error.message;
        setTimeout(() => {
          this.errorMessagepw = '';
        }, 4000); // error message
      }
    );
  }
  
  
  
  

  
  
  updateUserPassword() {
    if (this.NewPassword !== this.confirmPassword) {
      this.notValid = true;
      setTimeout(() => {
        this.notValid = false;
      }, 3000);
      return;
    }
  
    const userToUpdate = new User();
    userToUpdate.password = this.NewPassword;
  
    this.connexionService.updateUser(this.email, userToUpdate).subscribe(
      (response) => {
        console.log('User password updated successfully:', response);
        this.updateSuccess = true;
        setTimeout(() => {
          this.updateSuccess = false;
        }, 2500); 
      },
      (error) => {
        console.error('Error updating user password:', error);
        this.errorMessage = error.error.message; 
        setTimeout(() => {
          this.errorMessage = '';
        }, 4000); 
      }
    );
  }
  
  

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return; // No file selected, do nothing
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const userImage = reader.result as string;
      this.userImage = userImage;
      this.updatephoto(file, userImage);
    };
  
    reader.readAsDataURL(file);
  }
  
  // updatephoto method
  updatephoto(file: File, userImage: string) {
    const formData = new FormData();
    formData.append('file', file);
  
    this.connexionService.UpdateImage(this.email, formData).subscribe(
      (response) => {
        console.log('Image updated successfully:', response);
        // Update the component's userImage property with the new data
        this.userImage = userImage;
      },
      (error) => {
        console.error('Error updating image:', error);
        // Handle error
      }
    );
  }
  
  
  
}
