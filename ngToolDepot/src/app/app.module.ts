import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { GeocodeService } from './services/geocode.service';
import { FooterComponent } from './components/footer/footer.component';
import { MDBBootstrapModule, ButtonsModule, InputsModule} from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { AddressService } from './services/address.service';
import { ReviewOfCustomerService } from './services/review-of-customer.service';
import { ReviewOfLenderService } from './services/review-of-lender.service';
import { ReviewOfRenterService } from './services/review-of-renter.service';
import { ReviewOfWorkerService } from './services/review-of-worker.service';
import { SkillRentalService } from './services/skill-rental.service';
import { SkillService } from './services/skill.service';
import { ToolPhotoService } from './services/tool-photo.service';
import { ToolRentalService } from './services/tool-rental.service';
import { ToolService } from './services/tool.service';
import { UserSkillService } from './services/user-skill.service';
import { UserService } from './services/user.service';
import { UserComponent } from './components/user/user.component';
import { ToolComponent } from './components/tool/tool.component';
import { ToolTransactionComponent } from './components/tool-transaction/tool-transaction.component';
import { AdminComponent } from './components/admin/admin.component';
import { SkillTransactionComponent } from './components/skill-transaction/skill-transaction.component';
import { SkillComponent } from './components/skill/skill.component';
import { DatePipe } from '@angular/common';
import { AddToolComponent } from './components/toolCRUD/add-tool/add-tool.component';
import { UpdateToolComponent } from './components/toolCRUD/update-tool/update-tool.component';
import { DeleteToolComponent } from './components/toolCRUD/delete-tool/delete-tool.component';
import { AddToolRentalComponent } from './components/toolRentalCRUD/add-tool-rental/add-tool-rental.component';
import { DeleteToolRentalComponent } from './components/toolRentalCRUD/delete-tool-rental/delete-tool-rental.component';
import { UpdateToolRentalComponent } from './components/toolRentalCRUD/update-tool-rental/update-tool-rental.component';
import { UpdateUserComponent } from './components/adminCRUDonUser/update-user/update-user.component';
import { DeleteUserComponent } from './components/adminCRUDonUser/delete-user/delete-user.component';
import { ToolAvailablePipe } from './pipes/tool-available.pipe';
import { AgmCoreModule } from '@agm/core';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AddToolPhotoComponent } from './components/toolphotoCRUD/add-tool-photo/add-tool-photo.component';
import { DeleteToolPhotoComponent } from './components/toolphotoCRUD/delete-tool-photo/delete-tool-photo.component';
import { UpdateToolPhotoComponent } from './components/toolphotoCRUD/update-tool-photo/update-tool-photo.component';
import { ToolphotoComponent } from './components/toolphoto/toolphoto.component';
import { RatingModule} from 'ng-starrating';
import { AddReviewLenderComponent } from './components/reviewOfLender/add-review-lender/add-review-lender.component';
import { EditReviewLenderComponent } from './components/reviewOfLender/edit-review-lender/edit-review-lender.component';
import { DeleteReviewLenderComponent } from './components/reviewOfLender/delete-review-lender/delete-review-lender.component';
import { DeleteReviewRenterComponent } from './components/reviewOfRenter/delete-review-renter/delete-review-renter.component';
import { EditReviewRenterComponent } from './components/reviewOfRenter/edit-review-renter/edit-review-renter.component';
import { AddReviewRenterComponent } from './components/reviewOfRenter/add-review-renter/add-review-renter.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AddressFormComponent,
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    FooterComponent,
    ToolComponent,
    UserComponent,
    ToolTransactionComponent,
    AdminComponent,
    SkillTransactionComponent,
    SkillComponent,
    AddToolComponent,
    UpdateToolComponent,
    DeleteToolComponent,
    AddToolRentalComponent,
    DeleteToolRentalComponent,
    UpdateToolRentalComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    ToolAvailablePipe,
    SearchResultsComponent,
    AddToolPhotoComponent,
    DeleteToolPhotoComponent,
    UpdateToolPhotoComponent,
    ToolphotoComponent,
    ConfirmationComponent,
    AddReviewLenderComponent,
    EditReviewLenderComponent,
    DeleteReviewLenderComponent,
    DeleteReviewRenterComponent,
    EditReviewRenterComponent,
    AddReviewRenterComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule,
    InputsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatGridListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQWXrkW5JByvZhl8kjGHaCwSUMongsLng'
    }),
    RatingModule,
    MatFormFieldModule,
    MatSelectModule,
    RatingModule
  ],
  providers: [
    AuthService,
    AddressService,
    DatePipe,
    ReviewOfCustomerService,
    ReviewOfLenderService,
    ReviewOfRenterService,
    ReviewOfWorkerService,
    SkillRentalService,
    SkillService,
    ToolPhotoService,
    ToolRentalService,
    ToolService,
    UserSkillService,
    UserService,
    DatePipe,
    GeocodeService,
    RegisterComponent,
    LoginComponent,
    ToolAvailablePipe,
    ToolTransactionComponent,
    RatingModule,
    AddToolComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
