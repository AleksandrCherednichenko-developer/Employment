document.addEventListener("DOMContentLoaded", () => {
   let html = document.querySelector('html'),
      body = document.querySelector('body'),
      background = document.querySelector('.background'),
      backgroundResponse = document.querySelector('.response__background'),
      backgroundResponseSelect = document.querySelector('.response__background-select'),
      scrollY;

   let response = document.querySelector('.response'),
      responseMenu = response.querySelector('.response__menu'),
      responseMenuItem = responseMenu.querySelectorAll('.item'),
      responsePanel = response.querySelector('.response__panel'),
      responsePanelSliderItem = responsePanel.querySelectorAll('.response__slider .item'),
      responsePanelContent = responsePanel.querySelector('.response__content'),
      responsePanelSend = response.querySelector('.response__panel-send');

   // модальное окно вакансий
   let vacancy = document.querySelector('.response__content .vacancy'),
      vacancyModal = document.querySelector('.response__modal-vacancy'),
      vacancyModalItemClass = ".vacancy__item";

   // модальное окно адресс
   let address = document.querySelector('.response__content .address'),
      addressModal = document.querySelector('.response__modal-address'),
      addressModalItemClass = ".address__item";

   // модальное окно тестовое задани
   let test = document.querySelector('.response__content .test'),
      testModal = document.querySelector('.response__modal-test'),
      testModalItemClass = ".test__item";

   // кнопки в модальном окне даты
   let dateBtn = document.querySelectorAll('.response__modal-date .date__button button'),
      dateSlide = document.querySelector('.response__modal-date .date__button .date__slide');
   // кнопки в модальном окне время
   let timeBtn = document.querySelectorAll('.response__modal-time .time__button button'),
      timeSlide = document.querySelector('.response__modal-time .time__button .time__slide');

   // модальное окно выборе продолжительности
   let durationInput = document.querySelector('.response__modal-time .time__input-exact .duration__input'),
      durationModal = document.querySelector('.response__modal-duration'),
      durationModalItemClass = ".duration__item";

   // переменные для календаря
   let dataPlaseholder = document.querySelector('.response__panel .date .plaseholder'),
      dataValue = document.querySelector('.response__panel .date .value'),
      periodBtn = document.querySelectorAll('.period__button button'),
      calenderInputValue = document.querySelector('.date__calendar'),
      modalDateBtn = document.querySelectorAll('.response__modal-date .modal__date-button button');

   // переменные для времени
   let timePlaseholder = document.querySelector('.response__panel .time .plaseholder'),
      timeValue = document.querySelector('.response__panel .time .value'),
      timeModalInner = document.querySelector('.response__modal-time .inner'),

      timeInputRangeFrom = document.querySelector('.response__modal-time .time__input-range .from'),
      timeInputRangeTo = document.querySelector('.response__modal-time .time__input-range .to'),
      timeInfoRangePlaseholder = document.querySelector('.response__modal-time .time__info .range .plaseholder'),
      timeInfoRangeValue = document.querySelector('.response__modal-time .time__info .range .value'),

      timeInputExact = document.querySelector('.response__modal-time .time__input-exact input'),
      timeInfoStartPlaseholder = document.querySelector('.response__modal-time .time__info .start .plaseholder'),
      timeInfoStartValue = document.querySelector('.response__modal-time .time__info .start .value'),
      timeInfoDurationPlaseholder = document.querySelector('.response__modal-time .time__info .duration .plaseholder'),
      timeInfoDurationValue = document.querySelector('.response__modal-time .time__info .duration .value'),

      modalTimeBtn = document.querySelectorAll('.response__modal-time .modal__time-button button');

   // переменные для поля сообщение
   let messageText = document.querySelector('.response__panel .message textarea');

   // ======================================================= //

   // основное меню для выбора варианта отклика
   function clickPopupResponseItem() {
      // нажатие на элементы меню
      responseMenuItem.forEach(item => {
         item.addEventListener('click', () => {
            responseMenu.classList.remove('active');
            responsePanel.classList.add('active');
            // выделение выбранново варианта предложения
            responsePanelSliderItem.forEach(elem => {
               if (item.getAttribute('data-value') == elem.getAttribute('data-value')) {
                  responsePanelSliderItem.forEach(elem => {
                     elem.classList.remove('active');
                  })
                  elem.classList.add('active');
                  responsePanelContent.classList.add(elem.getAttribute('data-value'));
                  responsePanel.className = `response__panel active ${elem.getAttribute('data-value')}`
               }
            })
         });
      });

      // нажатие на элементы слайдера
      responsePanelSliderItem.forEach(elem => {
         elem.addEventListener('click', () => {
            responsePanelSliderItem.forEach(elem => {
               elem.classList.remove('active');
               responsePanelContent.className = 'response__content';
            })
            elem.classList.add('active');
            responsePanelContent.classList.add(elem.getAttribute('data-value'));
            responsePanel.className = `response__panel active ${elem.getAttribute('data-value')}`
         })
      })
   };
   clickPopupResponseItem();

   // нажатие на элементы из всплывающих модальных окон
   function modalClickItem() {
      // выбор элементов из модального окна
      function clickModalItem(elemClick, modalMenu, modalMenuItemClass, background) {
         elemClick.addEventListener('click', () => {
            let title = elemClick.querySelector('.title');
            let plaseholder = elemClick.querySelector('.plaseholder');
            let itemsModalMenu = modalMenu.querySelectorAll(modalMenuItemClass);

            itemsModalMenu.forEach(item => {
               item.addEventListener('click', () => {
                  itemsModalMenu.forEach(item => {
                     item.classList.remove('active');
                  })
                  item.classList.add('active');
                  plaseholder.style.display = 'none';
                  let itemClone = item.cloneNode(true);
                  let elemClickItem = elemClick.querySelector(modalMenuItemClass);

                  if (elemClickItem !== null) {
                     elemClickItem.remove();
                  }
                  title.after(itemClone);
                  title.style.color = 'var(--gray-700)';

                  modalMenu.classList.remove('active');
                  background.classList.remove('active');
               })
            })
         })
      };
      clickModalItem(vacancy, vacancyModal, vacancyModalItemClass, backgroundResponse);
      clickModalItem(address, addressModal, addressModalItemClass, backgroundResponse);
      clickModalItem(test, testModal, testModalItemClass, backgroundResponse);
      clickModalItem(durationInput, durationModal, durationModalItemClass, backgroundResponseSelect);

   };
   modalClickItem();

   // плавный переход на кнопках для выбора периода или точного
   function slideBtn() {
      const switchBtn = (buttons, slide) => {
         buttons.forEach(elem => {
            elem.addEventListener('click', () => {
               buttons.forEach(elem => {
                  elem.classList.remove('active');
               })
               elem.classList.add('active')
               slide.style.left = `${elem.offsetLeft}px`;

               if (elem.closest('.date__range')) {
                  elem.closest('.inner').className = 'inner range'
                  createCalendar("range", [null]);
               } else if (elem.closest('.date__exact')) {
                  elem.closest('.inner').className = 'inner exact'
                  createCalendar("single", [null]);
               }

               if (elem.closest('.time__range')) {
                  elem.closest('.inner').className = 'inner range'
               } else if (elem.closest('.time__exact')) {
                  elem.closest('.inner').className = 'inner exact'
               }

            })
         })
      };
      switchBtn(dateBtn, dateSlide);
      switchBtn(timeBtn, timeSlide);
   };
   slideBtn();

   // создание календаря
   function createCalendar(modeValue, datePeriod) {
      flatpickr.localize(flatpickr.l10ns.ru);
      flatpickr(".date__calendar", {
         inline: true,
         mode: modeValue,
         minDate: "today",
         altInput: true,
         altFormat: "d.m.Y",
         dateFormat: "d.m.Y",
         monthSelectorType: "static",
         showMonths: 1,
         defaultDate: datePeriod,
         "locale": {
            "firstDayOfWeek": 1 // start week on Monday
         }
      });
   };
   createCalendar("range", [null]);

   // функционал календаря в выборе даты
   function dateCalendar() {
      // изменение значений в момент изменения периода
      calenderInputValue.addEventListener('change', () => {
         dataPlaseholder.style.display = 'none';
         dataValue.textContent = calenderInputValue.value;
      })

      // нажатие на кнопки периодов
      periodBtn.forEach(btn => {
         btn.addEventListener('click', () => {
            periodBtn.forEach(btn => {
               btn.classList.remove('active');
            })
            if (btn.closest('.next-week')) {
               createCalendar("range", [new Date(), new Date().fp_incr(7)]);
               document.querySelector('.flatpickr-innerContainer').style.pointerEvents = 'none'; // заблокировать нажатие на календарь если выбраны сл 7 дней
               dataPlaseholder.style.display = 'none';
               dataValue.textContent = calenderInputValue.value;
            } else if (btn.closest('.next-month')) {
               createCalendar("range", [new Date(), new Date().fp_incr(30)]);
               document.querySelector('.flatpickr-innerContainer').style.pointerEvents = 'none'; // заблокировать нажатие на календарь если выбран сл месяц
               dataPlaseholder.style.display = 'none';
               dataValue.textContent = calenderInputValue.value;
            } else if (btn.closest('.custom')) {
               createCalendar("range", [null]);
               document.querySelector('.flatpickr-innerContainer').style.pointerEvents = 'auto';
            }
            btn.classList.add('active');
         })
      })

      // нажатие на кнопки сохранить и отменить
      modalDateBtn.forEach(btn => {
         btn.addEventListener('click', () => {
            if (btn.classList.contains('cancel')) {
               dataValue.textContent = '';
               dataPlaseholder.style.display = 'block';
               btn.closest('.response__modal-date').classList.remove('active');
               backgroundResponse.classList.remove('active');

               periodBtn.forEach(btn => {
                  btn.classList.remove('active');
                  if (btn.classList.contains('custom')) {
                     btn.classList.add('active');
                  }
               })
               createCalendar("range", [null]);
               document.querySelector('.flatpickr-innerContainer').style.pointerEvents = 'auto';
            }
            if (btn.classList.contains('apply')) {
               btn.closest('.response__modal-date').classList.remove('active');
               backgroundResponse.classList.remove('active');
            }
         })
      })
   };
   dateCalendar();

   // функционал выбора времени
   function timeClick() {

      // запись значений временни
      function timePrint() {
         if (timeModalInner.classList.contains('range')) {
            // ввод периода времени С
            timeInputRangeFrom.addEventListener('change', () => {
               timeInfoRangePlaseholder.style.display = 'none';
               timeInfoRangeValue.textContent = `с ${timeInputRangeFrom.value}`;

               timePlaseholder.style.display = 'none';
               timeValue.textContent = `с ${timeInputRangeFrom.value}`;
            })
            // ввод периода времени ДО
            timeInputRangeTo.addEventListener('change', () => {
               timeInfoRangePlaseholder.style.display = 'none';
               timeInfoRangeValue.textContent = `с ${timeInputRangeFrom.value} - до ${timeInputRangeTo.value}`;

               timePlaseholder.style.display = 'none';
               timeValue.textContent = `с ${timeInputRangeFrom.value} - до ${timeInputRangeTo.value}`;
            })
         } else if (timeModalInner.classList.contains('exact')) {
            // ввод точного времени
            timeInputExact.addEventListener('change', () => {
               timeInfoStartPlaseholder.style.display = 'none';
               timeInfoStartValue.textContent = `Начало в: ${timeInputExact.value}`;

               timePlaseholder.style.display = 'none';
               timeValue.textContent = `Начало в: ${timeInputExact.value}`;
            })

            document.querySelectorAll('.response__modal-duration .duration__item').forEach(item => {
               item.addEventListener('click', () => {
                  timeInfoStartPlaseholder.style.display = 'none';
                  timeInfoStartValue.textContent = `Начало в: ${timeInputExact.value}`;

                  timeInfoDurationPlaseholder.style.display = 'none';
                  timeInfoDurationValue.textContent = `Продолжительность: ${item.textContent}`;

                  timePlaseholder.style.display = 'none';
                  timeValue.textContent = `Начало в: ${timeInputExact.value}. Продолжительность: ${item.textContent}`;
               })
            })
         }
      };
      timePrint()

      // запись значений времени после нажатия на кнопки
      timeBtn.forEach(btn => {
         btn.addEventListener('click', () => {
            timePrint()
         })
      })

      // нажатие на кнопки сохранить и отменить
      modalTimeBtn.forEach(btn => {
         btn.addEventListener('click', () => {
            if (btn.classList.contains('cancel')) {
               btn.closest('.response__modal-time').classList.remove('active');
               backgroundResponse.classList.remove('active');
               timePlaseholder.style.display = 'block';
               timeValue.textContent = '';
               setTimeout(() => {
                  timeInputRangeFrom.value = '08:00';
                  timeInputRangeTo.value = '00:00';
                  timeInfoRangePlaseholder.style.display = 'block';
                  timeInfoRangeValue.textContent = '';

                  timeInputExact.value = '08:00';
                  timeInfoStartPlaseholder.style.display = 'block';
                  timeInfoStartValue.textContent = '';

                  if (durationInput.querySelector('.duration__item') !== null) {
                     durationInput.querySelector('.duration__item').remove();
                  }
                  durationInput.querySelector('.plaseholder').style.display = 'block';
                  timeInfoDurationPlaseholder.style.display = 'block';
                  timeInfoDurationValue.textContent = '';
                  document.querySelectorAll('.response__modal-duration .duration__item').forEach(item => {
                     item.classList.remove('active');
                  })
               }, 200);
            }
            if (btn.classList.contains('apply')) {
               btn.closest('.response__modal-time').classList.remove('active');
               backgroundResponse.classList.remove('active');

               if (timeModalInner.classList.contains('range')) {
                  timeInfoRangePlaseholder.style.display = 'none';
                  timeInfoRangeValue.textContent = `с ${timeInputRangeFrom.value} - до ${timeInputRangeTo.value}`;

                  timePlaseholder.style.display = 'none';
                  timeValue.textContent = `с ${timeInputRangeFrom.value} - до ${timeInputRangeTo.value}`;
               } else if (timeModalInner.classList.contains('exact')) {
                  timeInfoStartPlaseholder.style.display = 'none';
                  timeInfoStartValue.textContent = `Начало в: ${timeInputExact.value}`;

                  let durationText = document.querySelector('.duration__input .duration__item')
                  if (durationText == null) {
                     timePlaseholder.style.display = 'none';
                     timeValue.textContent = `Начало в: ${timeInputExact.value}. Продолжительность не указанна.`;
                  } else {
                     timePlaseholder.style.display = 'none';
                     timeValue.textContent = `Начало в: ${timeInputExact.value}. Продолжительность: ${durationText.textContent}.`;
                  }
               }

            }
         })
      })

   };
   timeClick();

   // ========================================================

   // очистить полей с выбранными значениями при нажтии на назад
   function clearModalItem(elem, modalMenu, itemClass) {
      if (elem.querySelector(itemClass) !== null) {
         elem.querySelector('.plaseholder').style.display = 'block';
         elem.querySelector(itemClass).remove();
         modalMenu.querySelectorAll(itemClass).forEach(item => {
            item.classList.remove('active')
         })
      }

      // очистить значение календаря
      dataValue.textContent = '';
      dataPlaseholder.style.display = 'block';

      periodBtn.forEach(btn => {
         btn.classList.remove('active');
         if (btn.classList.contains('custom')) {
            btn.classList.add('active');
         }
      })
      createCalendar("range", [null]);
      document.querySelector('.flatpickr-innerContainer').style.pointerEvents = 'auto';

      // очистить значение времени
      timePlaseholder.style.display = 'block';
      timeValue.textContent = '';
      setTimeout(() => {
         timeInputRangeFrom.value = '08:00';
         timeInputRangeTo.value = '00:00';
         timeInfoRangePlaseholder.style.display = 'block';
         timeInfoRangeValue.textContent = '';

         timeInputExact.value = '08:00';
         timeInfoStartPlaseholder.style.display = 'block';
         timeInfoStartValue.textContent = '';

         if (durationInput.querySelector('.duration__item') !== null) {
            durationInput.querySelector('.duration__item').remove();
         }
         durationInput.querySelector('.plaseholder').style.display = 'block';
         timeInfoDurationPlaseholder.style.display = 'block';
         timeInfoDurationValue.textContent = '';
         document.querySelectorAll('.response__modal-duration .duration__item').forEach(item => {
            item.classList.remove('active');
         })
      }, 200);
   };
   // закрытие полей
   function closePanel() {
      background.classList.remove('active');
      setTimeout(() => {
         scrollY = (body.style.top).replace(/\D+/g, "");

         html.style.height = 'auto';
         body.style.height = 'auto';
         body.style.overflow = 'visible';
         body.style.position = 'static';
         body.style.top = `0px`;
         window.scrollTo(0, scrollY);
      }, 200);

      clearModalItem(vacancy, vacancyModal, vacancyModalItemClass);
      clearModalItem(address, addressModal, addressModalItemClass);
      clearModalItem(test, testModal, testModalItemClass);
   }

   // нажатие на документе
   document.addEventListener('click', (event) => {
      let target = event.target;

      // нажатие кнопки назад
      if (target.closest('.close__panel') && target.closest('.response__panel')) {
         responsePanel.className = 'response__panel';
         responsePanelContent.className = 'response__content';
         messageText.value = '';

         closePanel();
      }

      // // нажатие кнопки отправить отклик
      // if (target.closest('.send') && target.closest('.response__panel')) {
      //    if (responsePanel.classList.contains('office_interview') || responsePanel.classList.contains('exit_to_work')) {
      //       responsePanelSend.classList.add('active');
      //    } else if (responsePanel.classList.contains('test')) {
      //       responsePanelSend.classList.add('active');
      //       responsePanelSend.classList.add('test');
      //    }
      // }

      // нажатие кнопки назад на панеле отправленно
      if (target.closest('.close__panel') && target.closest('.response__panel-send')) {
         responsePanel.className = 'response__panel';
         responsePanelContent.className = 'response__content';
         responsePanelSend.className = 'response__panel-send';
         messageText.value = '';

         closePanel();
      }
   });
});