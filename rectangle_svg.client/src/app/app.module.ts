import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RectangleComponent } from './views/rectangle/rectangle.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    RectangleComponent,
    LandingPageComponent,
    ConfirmationPopupComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
