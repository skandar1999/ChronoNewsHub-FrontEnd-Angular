import { Component, OnInit } from '@angular/core';
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


  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }




  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  addNewArticle(): void {
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
        // Reset form and reload articles
        this.newArticle = new Article();
        this.selectedImage = null;
      },
      (error) => {
        console.error('Error adding article:', error);
      }
    );
  }
}
