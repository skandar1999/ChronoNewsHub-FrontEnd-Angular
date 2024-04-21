import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ConnexionService } from '../services/connexion.service';
import { Article } from '../models/Article.model';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  articles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    public connexionService: ConnexionService
  ) { }

  ngOnInit(): void {
    this.getAllArticles();

  }


  
  getAllArticles(): void {
    this.articleService.getEconomicArticles().subscribe(
      (data: Article[]) => {
        this.articles = data.map(article => {
          if (article.image) {
            article.image = 'https://127.0.0.1:8000/ArticleImages/' + article.image;
          }
          return article;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
