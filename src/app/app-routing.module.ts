import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CategorieComponent } from './categorie/categorie.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AddpostComponent } from './dashboard/addpost/addpost.component';
import { ListeallContactsComponent } from './dashboard/listeall-contacts/listeall-contacts.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { UserGuard } from 'src/guards/user.guard';
import { WeatherComponent } from './weather/weather.component';
import { TestComponent } from './test/test.component';



const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'categorie', component: CategorieComponent ,canActivate: [UserGuard]},
  { path: 'Blogs', component: BlogsComponent  },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'homeDashboard', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'addpost', component: AddpostComponent },
  { path: 'contactliste', component: ListeallContactsComponent },
  { path: 'forbiden', component: ForbiddenPageComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'test', component: TestComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
