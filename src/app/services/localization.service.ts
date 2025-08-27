import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private currentLanguage = new BehaviorSubject<string>('pt-BR');
  currentLanguage$ = this.currentLanguage.asObservable();

  private translations: { [key: string]: { [key: string]: string } } = {
    'pt-BR': {
      // Component Money
      'PAY_WITH': 'PAGAR COM',
      'SHOW_BALANCE': 'Mostrar saldo',
      'HIDE_BALANCE': 'Ocultar saldo',
      'BALANCE': 'Saldo',
      'NEW_CARD': 'Novo Cartão',
      'VALUE': 'VALOR',
      'TRANSFER_MONEY': 'Transferir Dinheiro',
      'SELECT_CARD': 'Selecione um cartão para continuar',
      'SELECT_VALUE': 'Selecione um valor para transferência',
      'INSUFFICIENT_BALANCE': 'Saldo insuficiente para esta transferência',
      'ENDING_IN': 'Terminando em',
      
      // Card Management
      'MY_CARDS': 'Meus Cartões',
      'SELECT_CARD_TEXT': 'Selecione um cartão',
      'CARD_BALANCE': 'Saldo',
      'ADD_NEW_CARD': 'Adicionar novo cartão',
      'BACK': 'Voltar',
      'SELECT': 'Selecionar',
      
      // Component Modal
      'MY_CARDS_TITLE': 'Meus Cartões',
      
      // Component Modal Confirm
      'CONFIRM': 'Confirmar',
      'SENDING': 'Enviando',
      'TO': 'Para',
      'CANCEL': 'Cancelar',
      'CONFIRM_BUTTON': 'Confirmar',
      
      // Component Modal Success
      'SUCCESS': 'Sucesso',
      'SENT': 'Enviado',
      'DATE': 'Data',
      'COMPLETE': 'Concluir',
      'NEW_TRANSFER': 'Nova Transferência'
    },
    'en-US': {
      // Component Money
      'PAY_WITH': 'PAY WITH',
      'SHOW_BALANCE': 'Show balance',
      'HIDE_BALANCE': 'Hide balance',
      'BALANCE': 'Balance',
      'NEW_CARD': 'New Card',
      'VALUE': 'VALUE',
      'TRANSFER_MONEY': 'Transfer Money',
      'SELECT_CARD': 'Select a card to continue',
      'SELECT_VALUE': 'Select a value for transfer',
      'INSUFFICIENT_BALANCE': 'Insufficient balance for this transfer',
      'ENDING_IN': 'Ending in',
      
      // Card Management
      'MY_CARDS': 'My Cards',
      'SELECT_CARD_TEXT': 'Select a card',
      'CARD_BALANCE': 'Balance',
      'ADD_NEW_CARD': 'Add new card',
      'BACK': 'Back',
      'SELECT': 'Select',
      
      // Component Modal
      'MY_CARDS_TITLE': 'My Cards',
      
      // Component Modal Confirm
      'CONFIRM': 'Confirm',
      'SENDING': 'Sending',
      'TO': 'To',
      'CANCEL': 'Cancel',
      'CONFIRM_BUTTON': 'Confirm',
      
      // Component Modal Success
      'SUCCESS': 'Success',
      'SENT': 'Sent',
      'DATE': 'Date',
      'COMPLETE': 'Complete',
      'NEW_TRANSFER': 'New Transfer'
    }
  };

  constructor() {
    this.initializeLanguage();
  }

  setLanguage(lang: string) {
    this.currentLanguage.next(lang);
    localStorage.setItem('preferredLanguage', lang);
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.value;
  }

  initializeLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      this.currentLanguage.next(savedLanguage);
    }
  }

  translate(key: string): string {
    return this.translations[this.currentLanguage.value]?.[key] || key;
  }

  translateWithLanguage(key: string, language: string): string {
    return this.translations[language]?.[key] || key;
  }
}