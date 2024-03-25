import { Component, OnInit } from '@angular/core';
import { StringSchemaDefinition } from 'mongoose';
import { Article } from 'src/app/models/Article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  articles: Article[] = [];
  newArticle: Article = new Article();
  selectedImage: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }




  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  addNewArticle(): void {
    // Check if any of the required fields are empty
    if (!this.newArticle.titre || !this.newArticle.contenu || !this.newArticle.categorie) {
      this.errorMessage = 'Please fill in all required fields.';
      setTimeout(() => {
        this.errorMessage = ''; // Clear error message after 2 seconds
      }, 2000);
      return; // Stop execution if fields are empty
    }
  
    const formData = new FormData();
    formData.append('titre', this.newArticle.titre);
    formData.append('contenu', this.newArticle.contenu);
    formData.append('categorie', this.newArticle.categorie);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }
  
    this.articleService.addNewArticle(formData).subscribe(
      (response: any) => {
        console.log('Article added successfully:', response);
        this.newArticle = new Article();
        this.selectedImage = null;
        this.successMessage = 'Article added successfully!';
        this.errorMessage = ''; 
  
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        
      },
      (error) => {
        console.error('Error adding article:', error);
        this.errorMessage = 'An error occurred while adding the article.';
        setTimeout(() => {
          this.errorMessage = ''; 
        }, 2000);
      }
    );
  }
  
}
