import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';

const routes: Routes = [
  { path: '', redirectTo: '/calculadora', pathMatch: 'full' },
  { path: 'calculadora', component: CalculadoraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
