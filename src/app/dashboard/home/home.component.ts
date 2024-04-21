import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article.model';
import { ArticleService } from 'src/app/services/article.service';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  ArticleImage!: string;
  artilceData: any;
  articleImage!: string;

  constructor(private articleService: ArticleService,public connexionService: ConnexionService,) { }

  ngOnInit(): void {
    this.getAllArticles(); 
  }

  getAllArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (data: Article[]) => {
        this.articles = data.map(article => {
          if (article.image) {
            article.image = 'https://127.0.0.1:8000/ArticleImages/' + article.image;
            console.log('Image URL:', article.image); 
          }
          return article;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }


  deleteArticle(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this article?');
  
    if (confirmed) {
      this.articleService.deleteArticle(id).subscribe(
        () => {
          console.log('Article deleted successfully');
          // Here you can update the articles array or refresh the list
          this.getAllArticles();
        },
        (error) => {
          console.error('Error deleting article:', error);
        }
      );
    }
  }
  
  onLogout() {
    this.connexionService.logout();
  }

}