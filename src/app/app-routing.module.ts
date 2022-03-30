import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './components/currency/currency.component';
import { CvComponent } from './components/cv/cv.component';

const routes: Routes = [
  { path: 'cart', component: CurrencyComponent},
  {path: 'cv', component: CvComponent},
  { path: "", redirectTo: "/cart", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
