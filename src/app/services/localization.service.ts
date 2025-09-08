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
      'NEW_TRANSFER': 'Nova Transferência',
      
      // New Card Component
      'REGISTER_NEW_CARD': 'Cadastrar Novo Cartão',
      'CARD_BRAND': 'Bandeira do Cartão',
      'CARD_NUMBER': 'Número do Cartão',
      'CARD_NUMBER_PLACEHOLDER': '0000 0000 0000 0000',
      'CARD_HOLDER_NAME': 'Nome no Cartão',
      'CARD_HOLDER_PLACEHOLDER': 'Como aparece no cartão',
      'EXPIRATION_DATE': 'Validade',
      'EXPIRATION_PLACEHOLDER': 'MM/AA',
      'CVV': 'CVV',
      'CVV_PLACEHOLDER': '000',
      'SAVE_CARD': 'Salvar Cartão',
      
      // App Component (seletor global de idioma)
      'PORTUGUESE': 'Português',
      'ENGLISH': 'Inglês',
      
      // Mensagens de validação
      'REQUIRED_FIELD': 'Este campo é obrigatório',
      'INVALID_CARD_NUMBER': 'Número de cartão inválido',
      'INVALID_EXPIRATION': 'Data de validade inválida',
      'INVALID_CVV': 'CVV inválido',
      
      // Mensagens de sucesso/erro
      'CARD_ADDED_SUCCESS': 'Cartão adicionado com sucesso',
      'TRANSFER_SUCCESS': 'Transferência realizada com sucesso',
      'ERROR_OCURRED': 'Ocorreu um erro',
      
      // Termos gerais
      'LOADING': 'Carregando',
      'SAVING': 'Salvando',
      'PROCESSING': 'Processando'
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
      'NEW_TRANSFER': 'New Transfer',
      
      // New Card Component
      'REGISTER_NEW_CARD': 'Register New Card',
      'CARD_BRAND': 'Card Brand',
      'CARD_NUMBER': 'Card Number',
      'CARD_NUMBER_PLACEHOLDER': '0000 0000 0000 0000',
      'CARD_HOLDER_NAME': 'Card Holder Name',
      'CARD_HOLDER_PLACEHOLDER': 'As it appears on the card',
      'EXPIRATION_DATE': 'Expiration Date',
      'EXPIRATION_PLACEHOLDER': 'MM/YY',
      'CVV': 'CVV',
      'CVV_PLACEHOLDER': '000',
      'SAVE_CARD': 'Save Card',
      
      // App Component (seletor global de idioma)
      'PORTUGUESE': 'Portuguese',
      'ENGLISH': 'English',
      
      // Mensagens de validação
      'REQUIRED_FIELD': 'This field is required',
      'INVALID_CARD_NUMBER': 'Invalid card number',
      'INVALID_EXPIRATION': 'Invalid expiration date',
      'INVALID_CVV': 'Invalid CVV',
      
      // Mensagens de sucesso/erro
      'CARD_ADDED_SUCCESS': 'Card added successfully',
      'TRANSFER_SUCCESS': 'Transfer completed successfully',
      'ERROR_OCURRED': 'An error occurred',
      
      // Termos gerais
      'LOADING': 'Loading',
      'SAVING': 'Saving',
      'PROCESSING': 'Processing'
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

  // Método para obter todas as traduções de uma chave específica em todos os idiomas
  getAllTranslationsForKey(key: string): { [key: string]: string } {
    const result: { [key: string]: string } = {};
    for (const lang of Object.keys(this.translations)) {
      result[lang] = this.translations[lang][key] || key;
    }
    return result;
  }

  // Método para obter a lista de idiomas disponíveis
  getAvailableLanguages(): string[] {
    return Object.keys(this.translations);
  }

  // Método para obter o nome do idioma no próprio idioma
  getLanguageName(languageCode: string): string {
    switch (languageCode) {
      case 'pt-BR': return this.translations[languageCode]?.['PORTUGUESE'] || 'Português';
      case 'en-US': return this.translations[languageCode]?.['ENGLISH'] || 'English';
      default: return languageCode;
    }
  }
}