import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/Article.model';
import { ConnexionService } from '../services/connexion.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  articles: Article[] = [];
  likedArticleId: number | null = null;
  dislikedArticleId: number | null = null;

  collection: any[] = Array.from({ length: 50 }).map((_, i) => `Item ${i + 1}`);
  pagedCollection: any[] = [];
  pageSize = 9;
  currentPage = 1;
  totalPages: number;

  constructor(
    private router: Router,

    private articleService: ArticleService,
    public connexionService: ConnexionService
  ) {
    this.totalPages = Math.ceil(this.collection.length / this.pageSize);
    this.updatePagedCollection();
  }

  ngOnInit(): void {
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (data: Article[]) => {
        this.articles = data.map(article => {
          if (article.image) {
            article.image = 'https://127.0.0.1:8000/ArticleImages/' + article.image;
          }
          return article;
        });
        this.updatePagedCollection();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePagedCollection(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCollection = this.articles.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedCollection();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedCollection();
    }
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


  OnArArticleSelected(article: any) {
    console.log('Selected Article:', article);
    if (article && article.id) {
      this.router.navigate(['/articles', article.id]);
    } else {
      console.log('Invalid article or missing article ID');
    }
  }
  

}
