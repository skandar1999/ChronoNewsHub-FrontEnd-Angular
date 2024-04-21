import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/Article.model';
import { Comment } from '../models/Comment.model';

@Component({
  selector: 'app-articles-details',
  templateUrl: './articles-details.component.html',
  styleUrls: ['./articles-details.component.css']
})
export class ArticlesDetailsComponent implements OnInit {
  article: Article | undefined;
  recommendedArticles: Article[] = [];
  comment: Comment | undefined;
  articleId!: number;

  articleComments: Comment[] = [];

  showCommentForm: boolean = false;
  commentSent: boolean = false;
  newComment: Comment = new Comment();
  videComment: boolean = false; 


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.getArticleDetails();
    this.getRecommendedArticles();
    this.route.params.subscribe(params => {
      this.articleId = +params['id']; 
      this.getArticleDetails();
      this.loadComments();
    });
  }

  getArticleDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getArticleById(id).subscribe(
        (data: Article) => {
          this.article = data;
          if (this.article && this.article.image) {
            this.article.image = 'https://127.0.0.1:8000/ArticleImages/' + this.article.image;
          }
        },
        (error) => {
          console.log('Error fetching article:', error);
        }
      );
    } else {
      console.log('No article ID found in route parameters.');
    }
  }

  getRecommendedArticles(): void {
    // Example of fetching recommended articles (adjust as per your API)
    this.articleService.getAllArticles().subscribe(
      (data: Article[]) => {
        this.recommendedArticles = data.map(article => {
          if (article.image) {
            article.image = 'https://127.0.0.1:8000/ArticleImages/' + article.image;
          }
          return article;
        });
      },
      (error) => {
        console.log('Error fetching recommended articles:', error);
      }
    );
  }

  


  loadComments(): void {
    this.articleService.getComments(this.articleId).subscribe(
      (data: { article: { id: number }; comments: any }) => {
        this.articleComments = data.comments;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }
  

  
  
  toggleCommentForm(): void {
    this.showCommentForm = !this.showCommentForm;
  }
  
  
  
  addComment(): void {
    if (!this.newComment.author || !this.newComment.content) {
      this.videComment = true;
      setTimeout(() => {
        this.videComment = false;
      }, 3000);
      return;
    }

    this.newComment.articleId = this.articleId;

    this.articleService.addComment(this.newComment).subscribe(
      (response) => {
        console.log('Response from backend:', response);
        this.loadComments(); // Refresh comments after adding
        this.newComment = new Comment(); // Clear newComment object
        this.commentSent = true; // Set flag to true
        setTimeout(() => {
          this.commentSent = false; // Reset flag after 3 seconds
        }, 3000);
      },
      (error) => {
        console.error('Error during adding comment:', error);
      }
    );
  }


}
