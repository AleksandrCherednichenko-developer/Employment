import mobileModal from '../js/script__modal-mobile.js'

document.addEventListener("DOMContentLoaded", () => {
   let background = document.querySelector('.background'),
      backgroundResponse = document.querySelector('.response__background'),
      backgroundResponseSelect = document.querySelector('.response__background-select');

   // элементы для модального окна сортировки вакансий
   let sortingBtnClass = '.sorting .select__header',
      sortingBody = document.querySelector('.sorting .select__body'),
      sortingBodyInner = document.querySelector('.sorting .select__body .inner'),
      sortingBodyInnerClass = '.sorting .select__body .inner',
      sortingBodyClose = document.querySelector('.sorting__select .mobile-close');

   // элементы для модального окна приглашения вакансии для собеседования
   let responseBtnClass = '.summary__item .btn-invite',
      response = document.querySelector('.response__menu'),
      responseInner = document.querySelector('.response__menu .inner'),
      responseInnerClass = '.response__menu .inner',
      responseClose = document.querySelector('.response__menu .mobile-close');

   // элементы для модального окна вакансий в отклике на вакансию
   let vacancyClass = '.response__content .vacancy',
      vacancyModal = document.querySelector('.response__modal-vacancy'),
      vacancyModalInner = document.querySelector('.response__modal-vacancy .inner'),
      vacancyModalInnerClass = '.response__modal-vacancy .inner',
      vacancyModalClose = document.querySelector('.response__modal-vacancy .mobile-close');

   // элементы для модального окна адресса в отклике на вакансию
   let adressClass = '.response__content .address',
      adressModal = document.querySelector('.response__modal-address'),
      adressModalInner = document.querySelector('.response__modal-address .inner'),
      adressModalInnerClass = '.response__modal-address .inner',
      adressModalClose = document.querySelector('.response__modal-address .mobile-close');

   // элементы для модального окна тестового задания в отклике на вакансию
   let testClass = '.response__content .test',
      testModal = document.querySelector('.response__modal-test'),
      testModalInner = document.querySelector('.response__modal-test .inner'),
      testModalInnerClass = '.response__modal-test .inner',
      testModalClose = document.querySelector('.response__modal-test .mobile-close');

   // элементы для модального окна с выбором даты в отклике на вакансию
   let dateClass = '.response__content .date',
      dateModal = document.querySelector('.response__modal-date'),
      dateModalInner = document.querySelector('.response__modal-date .inner'),
      dateModalInnerClass = '.response__modal-date .inner',
      dateModalClose = document.querySelector('.response__modal-date .mobile-close');

   // элементы для модального окна с выбором времени в отклике на вакансию
   let timeClass = '.response__content .time',
      timeModal = document.querySelector('.response__modal-time'),
      timeModalInner = document.querySelector('.response__modal-time .inner'),
      timeModalInnerClass = '.response__modal-time .inner',
      timeModalClose = document.querySelector('.response__modal-time .mobile-close');

   // элементы для модального окна выбора периода в отклике на вакансию
   let durationClass = '.response__modal-time .duration__input',
      durationModal = document.querySelector('.response__modal-duration'),
      durationModalInner = document.querySelector('.response__modal-duration .inner'),
      durationModalInnerClass = '.response__modal-duration .inner',
      durationModalClose = document.querySelector('.response__modal-duration .mobile-close');

   let responsePanel = document.querySelector('.response__panel');


   mobileModal(background, sortingBtnClass, sortingBody, sortingBodyInner, sortingBodyInnerClass, sortingBodyClose, responsePanel);
   mobileModal(background, responseBtnClass, response, responseInner, responseInnerClass, responseClose, responsePanel);
   mobileModal(backgroundResponse, vacancyClass, vacancyModal, vacancyModalInner, vacancyModalInnerClass, vacancyModalClose, responsePanel);
   mobileModal(backgroundResponse, adressClass, adressModal, adressModalInner, adressModalInnerClass, adressModalClose, responsePanel);
   mobileModal(backgroundResponse, testClass, testModal, testModalInner, testModalInnerClass, testModalClose, responsePanel);
   mobileModal(backgroundResponse, dateClass, dateModal, dateModalInner, dateModalInnerClass, dateModalClose, responsePanel);
   mobileModal(backgroundResponse, timeClass, timeModal, timeModalInner, timeModalInnerClass, timeModalClose, responsePanel);
   mobileModal(backgroundResponse, durationClass, durationModal, durationModalInner, durationModalInnerClass, durationModalClose, responsePanel);
})