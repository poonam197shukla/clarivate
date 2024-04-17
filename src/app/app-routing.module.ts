import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashoardComponent } from './dashoard/dashoard.component';
import { ElementListComponent } from './element-list/element-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path:'', component: DashoardComponent },
  { path:'list', component: ElementListComponent},
  { path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
