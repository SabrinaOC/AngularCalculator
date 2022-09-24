import { isNull } from '@angular/compiler/src/output/output_ast';
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
      if(valor === '.') {
        //comprobamos que solo hay un .
        if(!this.checkSingleDecimalDot(this.primerValor)) {
        this.primerValor += valor;
        };
      } else {
        this.primerValor += valor;
      }
    } else {
      if(valor === '.') {
        //comprobamos que solo hay un .
        if(!this.checkSingleDecimalDot(this.segundoValor)) {
        this.segundoValor += valor;
        };
      } else {
        this.segundoValor += valor;
      }
    }
  }

  /**
   *
   */
  getOperator(operador: string) {
    //comprobamos que tenemos primer término
    if(this.primerValor === '') {
      this.showError('Need to introduce a number first');
    } else {
      this.operation = operador;
      //ponemos bandera de que se ha terminado de introducir el primer valor
      this.isPrimerValueOperatorInserted = true;
    }
    
  }

  /**
   *
   */
  getResult() {
    //identificamos operacion
    if(this.checkErrors()){
      switch(this.operation) {
      case '/':
        //comprobamos que no se intenta dividir entre 0
        if(!this.checkDivisionByZero()) {
          this.result = parseFloat(this.primerValor)/parseFloat(this.segundoValor);
        }
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

      if(!this.isError && this.checkResult()) {
        //asignamos resultado a primer valor para poder concatenar operaciones y reseteamos res y segundoVal
        this.primerValor = '';
        this.primerValor = '' + this.result;
        this.result = null;
        this.segundoValor = '';
        this.operation = '';
      }
    }
  }

  /**
   * 
   */
  clearAll() {
    this.primerValor = '';
    this.segundoValor = '';
    this.result = null;
    this.operation = '';
    this.isPrimerValueOperatorInserted = false;
  }

  /**
   * 
   */
  deleteLastNum() {
    //si no tenemos operador significa que estamos en el primer número
    if(this.operation === ''){
      this.primerValor = this.primerValor.slice(0, -1);
    } else {
      this.segundoValor = this.segundoValor.slice(0, -1);
    }
  }

  /**
   * 
   * @returns 
   */
  checkErrors() {
    //comprobamos que tenemos valores para obtener resultado
    if(this.primerValor === '' || this.segundoValor === '') {
      this.showError('Impossible to give a result. Introduce a value to proceed with the operation.');
      return false;
    }
    return true;
  }

  /**
   * 
   * @param num 
   * @returns 
   */
  checkSingleDecimalDot(num: string) {
    for(let char of num) {
      if(char === '.') {
        this.showError('Already decimal number');
        return true;
      }
    }
    return false;
  }

  /**
   * 
   */
  checkResult() {
    if (this.result === null || isNaN(this.result)) {
      this.showError(`Resultado ${this.result}`);
      return false;
    }
    return true;
  }

  /**
   * 
   */
  checkDivisionByZero() {
    if(this.segundoValor === '0') {
      this.showError('Trying to divide by 0');
      return true;
    }
    return false;
  }

  /**
   * 
   * @param msg 
   */
  showError(msg: string) {
    this.isError = true;
    this.errorMessage = msg;
  }

}
