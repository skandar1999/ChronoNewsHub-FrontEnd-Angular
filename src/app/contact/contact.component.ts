import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  newContact: any = {
    emailUser: '',
    userPhone: '',
    description: ''
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  sendMessage(): void {
    if (!this.newContact.emailUser || !this.newContact.userPhone || !this.newContact.description) {
      this.errorMessage = 'Please fill in all required fields.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }

    this.contactService.contact(this.newContact).subscribe(
      (response: any) => {
        console.log('Contact sent successfully:', response);
        this.newContact = {
          emailUser: '',
          userPhone: '',
          description: ''
        };
        this.successMessage = 'Contact sent successfully!';
        this.errorMessage = '';

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

      },
      (error) => {
        console.error('Error sending contact:', error);
        this.errorMessage = 'An error occurred while sending the contact.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }
  
  
}
