import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RectangleComponent } from './views/rectangle/rectangle.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';


const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
    pathMatch: "full",
  },
  {
    path: "svg",
    component: RectangleComponent,
    data: { title: "Draw rectangle SVG", },
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
