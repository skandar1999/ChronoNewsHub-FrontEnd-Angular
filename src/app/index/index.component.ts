import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/Article.model';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  articles: Article[] = [];
  ArticleImage!: string;
  artilceData: any;
  articleImage!: string;
  likedArticleId: number | null = null;
  dislikedArticleId: number | null = null;

  constructor(private articleService: ArticleService,
    public connexionService: ConnexionService,

  ) { }

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

likeArticle(articleId: number): void {
  this.articleService.likeArticle(articleId).subscribe(
      (response: any) => {
          this.likedArticleId = articleId;
          this.dislikedArticleId = null;
          const likedArticle = this.articles.find(article => article.id === articleId);
          if (likedArticle) {
              likedArticle.nb_likes = response.nbLikes;
          }
      },
      (error) => {
          console.error('Error liking article:', error);
      }
  );
}

dislikeArticle(articleId: number): void {
  this.articleService.DislikeArticle(articleId).subscribe(
      (response: any) => {
          this.dislikedArticleId = articleId;
          this.likedArticleId = null;
          const dislikedArticle = this.articles.find(article => article.id === articleId);
          if (dislikedArticle) {
              dislikedArticle.nb_dislikes = response.nbDislikes;
          }
      },
      (error) => {
          console.error('Error disliking article:', error);
      }
  );
}

}
