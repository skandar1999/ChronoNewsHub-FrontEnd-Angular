import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private connexionService: ConnexionService , ) { }

  ngOnInit(): void {
    this.getAllUsers();

  }



  getAllUsers(): void {
    this.connexionService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
