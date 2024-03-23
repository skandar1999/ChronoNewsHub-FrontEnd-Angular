import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article.model';
import { ArticleService } from 'src/app/services/article.service';

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

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getAllArticles(); 
  }

  getAllArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (data: Article[]) => {
        this.articles = data.map(article => {
          if (article.image) {
            // Assuming the image path is relative to the server's base URL
            article.image = 'https://127.0.0.1:8000/ArticleImages/' + article.image;
            console.log('Image URL:', article.image); // Log the image URL
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