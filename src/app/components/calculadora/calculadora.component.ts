import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {
  primerValor: string = '';
  segundoValor: string = '';
  operation: string = ''; // 0: division, 1: multiplicacion, 2: suma, 3: resta; -1: clear; 10: igual
  result!: number | null;
  isPrimerValueOperatorInserted: boolean = false;
  isError: boolean = false;
  errorMessage!: string;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param valor 
   */
  getAndAddValue(valor: string) {
    //comprobamos si añadimos a primer valor o a segundo
    if(!this.isPrimerValueOperatorInserted) {
      this.primerValor += valor;
    } else {
      this.segundoValor += valor;
    }
  }

  /**
   * 
   */
  getOperator(operador: string) {
    this.operation = operador;
    console.log('Operador: ', this.operation);
    //ponemos bandera de que se ha terminado de introducir el primer valor
    this.isPrimerValueOperatorInserted = true;
  }

  getResult() {
    //identificamos operacion
    if(this.checkErrors()){
      switch(this.operation) {
      case '/':
        this.result = parseFloat(this.primerValor)/parseFloat(this.segundoValor);
        console.log('Resultado: ', this.result)
        break;
      case 'X':
        this.result = parseFloat(this.primerValor)*parseFloat(this.segundoValor);
        break;
      case '+':
        this.result = parseFloat(this.primerValor)+parseFloat(this.segundoValor);
        break;
      case '-':
        this.result = parseFloat(this.primerValor)-parseFloat(this.segundoValor);
        break;
      }
      //asignamos resultado a primer valor para poder concatenar operaciones y reseteamos res y segundoVal
      this.primerValor = '' + this.result;
      this.result = null;
      this.segundoValor = '';
      this.operation = '';
    }
  }

  clearAll() {
    this.primerValor = '';
    this.segundoValor = '';
    this.result = null;
    this.isPrimerValueOperatorInserted = false;
  }

  /**
   * 
   * @returns 
   */
  checkErrors() {
    console.log('Entra en check errors')
    //comprobamos que tenemos valores para obtener resultado
    if(this.primerValor === '' || this.segundoValor === '') {
      this.isError = true;
      this.errorMessage = 'No value';
      console.log('Error ', this.errorMessage)
      return false;
    }
    //comprobamos que 

    return true;
  }

}
