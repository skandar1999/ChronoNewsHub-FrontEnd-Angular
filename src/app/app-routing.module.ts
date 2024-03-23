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



const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'categorie', component: CategorieComponent },
  { path: 'Blogs', component: BlogsComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'homeDashboard', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'addpost', component: AddpostComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
