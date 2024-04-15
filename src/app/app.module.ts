import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CategorieComponent } from './categorie/categorie.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FormsModule} from '@angular/forms';
import { HomeComponent } from './dashboard/home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ProfileComponent } from './profile/profile.component';
import { AddpostComponent } from './dashboard/addpost/addpost.component';
import { ListeallContactsComponent } from './dashboard/listeall-contacts/listeall-contacts.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { WeatherComponent } from './weather/weather.component';
import { TestComponent } from './test/test.component';
import { EconomicArticlesComponent } from './CategoryPages/economic-articles/economic-articles.component';
import { PoliticsArticlesComponent } from './CategoryPages/politics-articles/politics-articles.component';
import { TechnologyArticlesComponent } from './CategoryPages/technology-articles/technology-articles.component';
import { SportsArticlesComponent } from './CategoryPages/sports-articles/sports-articles.component';
import { ScientistsArticlesComponent } from './CategoryPages/scientists-articles/scientists-articles.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    CategorieComponent,
    BlogsComponent,
    ConnexionComponent,
    HomeComponent,
    ProfileComponent,
    AddpostComponent,
    ListeallContactsComponent,
    ForbiddenPageComponent,
    WeatherComponent,
    TestComponent,
    EconomicArticlesComponent,
    PoliticsArticlesComponent,
    TechnologyArticlesComponent,
    SportsArticlesComponent,
    ScientistsArticlesComponent,
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwt');
        },
        allowedDomains: ['http://localhost:4200/']
      }
    }),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
