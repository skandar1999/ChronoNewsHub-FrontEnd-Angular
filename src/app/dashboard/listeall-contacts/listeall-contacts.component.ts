import { ContactComponent } from './../../contact/contact.component';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { ConnexionService } from 'src/app/services/connexion.service';


declare var $: any; 
@Component({
  selector: 'app-listeall-contacts',
  templateUrl: './listeall-contacts.component.html',
  styleUrls: ['./listeall-contacts.component.css']
})
export class ListeallContactsComponent implements OnInit {
  messages: any[] = [];
  isSuccess: boolean = false;
  constructor(private contactService: ContactService,
    public connexionService: ConnexionService,
  ) { }


  ngOnInit(): void {
    this.getMessages();
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }


  getMessages(): void {
    this.contactService.getAllMessages().subscribe(
      (response) => {
        this.messages = response;
        console.log('Messages:', this.messages);
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }


  updateStatus(contact: Contact): void {
    const confirmed = window.confirm('Are you sure you want to update this message as seen?');

    if (confirmed) {
      this.contactService.updateStatut(contact.id).subscribe(
        () => {
          contact.status = true;
          this.isSuccess = true;
          setTimeout(() => {
            this.isSuccess = false;
          }, 1900);
        },
        (error) => {
          console.error('Error updating message status:', error);
        }
      );
    }
  }


  DeleteMessagee(contact: Contact): void {
    const confirmed = window.confirm('Are you sure you want to delete this message?');

    if (confirmed) {
      this.contactService.DeleteMessage(contact.id).subscribe(
        () => {
          contact.status = true;
          this.getMessages();
          setTimeout(() => {
            this.isSuccess = false;
          }, 1900);
        },
        (error) => {
          console.error('Error deleting message status:', error);
        }
      );
    }
  }


  onLogout() {
    this.connexionService.logout();
  }

}

