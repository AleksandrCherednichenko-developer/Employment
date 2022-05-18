document.addEventListener("DOMContentLoaded", () => {

   const html = document.querySelector('html'),
      body = document.querySelector('body');
   const popup = document.querySelector('#popupMain'), // получение фона для попап
      popupResponse = document.querySelector('.popup__response'),// получение popup Response
      popupResponseItem = document.querySelectorAll('.popup__response-item'), // получение всех элементов из popup Response
      popupResponseInfo = document.querySelector('.popup__response-info'), // получение popup Response Info
      popupNewTest = document.querySelector('.popup__new-test'), //получение popup New-Test
      popupResponseSent = document.querySelector('.popup__response-sent'); // получеие popup Response-Sent

   // получение верхнего селекта из popup Response Info
   const titleSelectHeader = popupResponseInfo.querySelector('.title__select .select__header'),
      titleSelectCurrent = popupResponseInfo.querySelector('.title__select .select__current'),
      titleSelectBody = popupResponseInfo.querySelector('.title__select .select__body'),
      titleSelectBodyItems = popupResponseInfo.querySelectorAll('.title__select .select__body .select__item');

   // получение селекта вакансии из popup Response Info
   const vacanciresSelectHeader = popupResponseInfo.querySelector('.vacancies__select .select__header'),
      vacanciresSelectCurrent = popupResponseInfo.querySelector('.vacancies__select .select__current'),
      vacanciresSelectBody = popupResponseInfo.querySelector('.vacancies__select .select__body'),
      vacanciresSelectBodyItems = popupResponseInfo.querySelectorAll('.vacancies__select .select__body .select__item');

   // получение селекта адресс из popup Response Info
   const addressSelectHeader = popupResponseInfo.querySelector('.address__select .select__header'),
      addressSelectCurrent = popupResponseInfo.querySelector('.address__select .select__current'),
      addressSelectBody = popupResponseInfo.querySelector('.address__select .select__body'),
      addressSelectBodyItems = popupResponseInfo.querySelectorAll('.address__select .select__body .select__item');

   // получение чекбокса, инпутов и селекта время из popup Response Info
   const timeSelectHeader = popupResponseInfo.querySelector('.time__select .select__header'),
      timeSelectCurrent = popupResponseInfo.querySelector('.time__select .select__current'),
      timeSelectBody = popupResponseInfo.querySelector('.time__select .select__body'),
      timeSelectBodyItems = popupResponseInfo.querySelectorAll('.time__select .select__body .select__item'),
      timeInput = popupResponseInfo.querySelectorAll('.time__input input'),
      timeCheckbox = popupResponseInfo.querySelector('.time__checkbox input');

   // получение селекта тестовое задание из popup Response Info
   const testSelectHeader = popupResponseInfo.querySelector('.test__select .select__header'),
      testSelectCurrent = popupResponseInfo.querySelector('.test__select .select__current'),
      testSelectBody = popupResponseInfo.querySelector('.test__select .select__body');
   let testSelectBodyItems;

   // получение кнопок для переклюения даты и времени
   const dateBtn = document.querySelectorAll('.popup__response-info .date__button button');
   const dateSlide = document.querySelector('.popup__response-info .date__button .date__slide');
   const timeBtn = document.querySelectorAll('.popup__response-info .time__button button');
   const timeSlide = document.querySelector('.popup__response-info .time__button .time__slide');

   body.addEventListener('click', (event) => {
      let target = event.target

      // закрытие popup Response при нажитии на фон или крестик
      if (popupResponse.classList.contains('active')) {
         if (target == popup || target.classList.contains('popup__response-close')) {
            html.classList.remove('lock');
            popup.classList.remove('active');
            popupResponse.classList.remove('active');
         }
      }
      // закрытие popup Response-info при нажатии на крестик или "отмена", отменить действие при нажатии на фон
      if (popupResponseInfo.classList.contains('active')) {
         if (target == popup) {
            html.classList.add('lock');
            popup.classList.add('active');
         } else if (target.classList.contains('popup__response-info-close') || target.classList.contains('cancel')) {
            if (!$('.filter ').hasClass('fixed')) {
               html.classList.remove('lock');
            }
            popup.classList.remove('active');
            popupResponse.classList.remove('active');
            popupResponseInfo.className = 'popup__response-info';
         }
      }
      // закрытие popup New-Test при нажатии на фон или крестик и возврат popup Response-info
      if (popupNewTest.classList.contains('active')) {
         if (target == popup) {
            html.classList.add('lock');
            popup.classList.add('active');
            popupNewTest.classList.remove('active');
            popupResponseInfo.classList.add('active');
            popupResponseInfo.classList.add('test');
         } else if (target.classList.contains('popup__new-test-close')) {
            popupNewTest.classList.remove('active');
            popupResponseInfo.classList.add('active');
            popupResponseInfo.classList.add('test');
         }
      }
      // закрытие popup Response-Sent при нажатии на фон или крестик
      if (popupResponseSent.classList.contains('active')) {
         if (target == popup || target.classList.contains('popup__response-sent-close')) {
            html.classList.remove('lock');
            popup.classList.remove('active');
            popupResponseSent.classList.remove('active');
            popupResponseSent.classList.remove('test');
         }
      }


      // вызов popup Response при нажатии на кнопку откликнуться на вакансии
      if (target.classList.contains('item__btn-respond') && target.closest('.items') && target.closest('.summary__content-left')) {
         html.classList.add('lock');
         popup.classList.add('active');
         popupResponse.classList.add('active');
         event.preventDefault();
      }
      // вызов popup New-Test
      if (target.classList.contains('test__new') && target.closest('.test__select')) {
         popupNewTest.classList.add('active');
         popupResponseInfo.classList.remove('active');
      }
      // вызов popup Response - Sent
      if (target.classList.contains('submit') && target.closest('.popup__response-info-btn')) {
         if (popupResponseInfo.classList.contains('test')) {
            popupResponseInfo.className = 'popup__response-info';
            popupResponseSent.classList.add('active');
            popupResponseSent.classList.add('test');
         } else {
            popupResponseInfo.className = 'popup__response-info';
            popupResponseSent.classList.add('active');
         }
      }

      // закрыть селекта если нажатие прозошло за его пределами
      if (target !== titleSelectBody && !target.closest('.title__select')) {
         titleSelectBody.classList.remove('active');
      }
      if (target !== vacanciresSelectBody && !target.closest('.vacancies__select')) {
         vacanciresSelectBody.classList.remove('active');
      }
      if (target !== addressSelectBody && !target.closest('.address__select')) {
         addressSelectBody.classList.remove('active');
      }
      if (target !== testSelectBody && !target.closest('.test__select')) {
         testSelectBody.classList.remove('active');
      }
      if (target !== timeSelectBody && !target.closest('.time__select')) {
         timeSelectBody.classList.remove('active');
      }

      // селект с тестовыми заданиями
      if (target.closest('.test__select')) {
         testSelectBodyItems = popupResponseInfo.querySelectorAll('.test__select .select__body .select__item');
         clickSelectItem(testSelectBodyItems, testSelectCurrent, testSelectBody);
      }

      // нажатие на чекбокс время
      if (target == timeCheckbox) {
         if (timeCheckbox.checked) {
            timeInput.forEach(input => {
               input.disabled = true;
            })
         } else {
            timeInput.forEach(input => {
               input.disabled = false;
            })
         }
      }

      // нажатие на кнопку сохранить новое тестовое
      if (target.classList.contains('new__test-submit-btn')) {
         popupNewTest.classList.remove('active');
         popupResponseInfo.classList.add('active')
      }

   })

   // нажатие на элементы в попап Respose
   const clickPopupResponseItem = () => {
      popupResponseItem.forEach(item => {
         item.addEventListener('click', () => {
            let copyItem = item.cloneNode(true);
            copyItem.className = 'select__item';
            titleSelectCurrent.querySelectorAll('div').forEach(elem => {
               elem.remove();
            })
            popupResponse.classList.remove('active');
            html.classList.add('lock');
            titleSelectCurrent.append(copyItem);

            if (copyItem.getAttribute('data-value') == 'office_interview') {
               popupResponseInfo.classList.add('active');
               popupResponseInfo.classList.add('office_interview');
            } else if (copyItem.getAttribute('data-value') == 'test') {
               popupResponseInfo.classList.add('active');
               popupResponseInfo.classList.add('test');
            } else if (copyItem.getAttribute('data-value') == 'exit_to_work') {
               popupResponseInfo.classList.add('active');
               popupResponseInfo.classList.add('exit_to_work');
            }
         })
      });
   };
   clickPopupResponseItem();


   // нажатие на селект в попап Respose-Info
   const clickSelect = (header, body) => {
      header.addEventListener('click', () => {
         body.classList.toggle('active');
      });
   };
   clickSelect(titleSelectHeader, titleSelectBody);
   clickSelect(vacanciresSelectHeader, vacanciresSelectBody);
   clickSelect(addressSelectHeader, addressSelectBody);
   clickSelect(testSelectHeader, testSelectBody);
   clickSelect(timeSelectHeader, timeSelectBody);

   // нажатие на элементы селекта в попап Respose-Info
   const clickSelectItem = (items, current, body) => {
      items.forEach(item => {
         item.addEventListener('click', (event) => {
            let target = event.target
            let copyItem = item.cloneNode(true);
            copyItem.className = 'select__item';
            current.querySelectorAll('div').forEach(elem => {
               elem.remove();
            })
            current.append(copyItem);
            body.classList.remove('active');

            if (target.closest('.title__select')) {
               if (copyItem.getAttribute('data-value') == 'office_interview') {
                  popupResponseInfo.className = 'popup__response-info active office_interview';
               } else if (copyItem.getAttribute('data-value') == 'test') {
                  popupResponseInfo.className = 'popup__response-info active test';
               } else if (copyItem.getAttribute('data-value') == 'exit_to_work') {
                  popupResponseInfo.className = 'popup__response-info active exit_to_work';
               }
            }
         })
      });
   };
   clickSelectItem(titleSelectBodyItems, titleSelectCurrent, titleSelectBody);
   clickSelectItem(vacanciresSelectBodyItems, vacanciresSelectCurrent, vacanciresSelectBody);
   clickSelectItem(addressSelectBodyItems, addressSelectCurrent, addressSelectBody);
   clickSelectItem(timeSelectBodyItems, timeSelectCurrent, timeSelectBody);

   // преход между кнопками
   const switchBtn = (buttons, slide) => {
      let leftPos;
      buttons.forEach(elem => {
         elem.addEventListener('click', () => {
            buttons.forEach(elem => {
               elem.classList.remove('active');
            })
            elem.classList.add('active')

            slide.style.left = `${elem.offsetLeft}px`

            if (elem.classList.contains('exact')) {
               elem.parentNode.parentNode.querySelector('.description').classList.add('hide');
               if (elem.closest('.time')) {
                  elem.parentNode.parentNode.querySelector('.checkbox').classList.add('hide');
                  elem.parentNode.parentNode.querySelector('.checkbox input').checked = false;
                  elem.parentNode.parentNode.querySelector('.checkbox input').disabled = true;
                  elem.parentNode.parentNode.querySelector('.time__input').classList.add('exact');
                  if (timeCheckbox.checked) {
                     timeInput.forEach(input => {
                        input.disabled = true;
                     })
                  } else {
                     timeInput.forEach(input => {
                        input.disabled = false;
                     })
                  }
               }
            } else {
               elem.parentNode.parentNode.querySelector('.description').classList.remove('hide');
               if (elem.closest('.time')) {
                  elem.parentNode.parentNode.querySelector('.checkbox').classList.remove('hide');
                  elem.parentNode.parentNode.querySelector('.checkbox input').disabled = false;
                  elem.parentNode.parentNode.querySelector('.time__input').classList.remove('exact');
               }
            }
         })
      })
   }
   switchBtn(dateBtn, dateSlide);
   switchBtn(timeBtn, timeSlide);


   // нажатие на кнопку диапозон дат
   $('.date__range').daterangepicker({
      "autoUpdateInput": true,
      "ranges": {
         'Ближайшие семь дней': [moment(), moment().add(6, 'days')],
         'Следующий месяц': [moment(), moment().add(29, 'days')]
      },
      "locale": {
         "format": 'DD MMMM',
         "separator": " - ",
         "applyLabel": "Применить",
         "cancelLabel": "Сбросить",
         "fromLabel": "From",
         "toLabel": "To",
         "customRangeLabel": "Выбрать период",
         "weekLabel": "W",
         "daysOfWeek": [
            "Вс",
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб"
         ],
         "monthNames": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
         ],
         "firstDay": 1
      },
      "alwaysShowCalendars": true,
      "startDate": moment(),
      "endDate": moment(),
      "minDate": moment(),
      "maxDate": moment().add(90, 'days'),
      "opens": "center"
   }, function (start, end, label) {
      $('.date__input').text(start.format('D MMMM') + ' - ' + end.format('D MMMM'));
      $('.date__input-hidden').val(start.format('DD.MM.YYYY') + '-' + end.format('DD.MM.YYYY'));
   });
   $('.date__range').on('cancel.daterangepicker', function (ev, picker) {
      $('.date__input').text('Выбранная дата');
   });

   // нажатие на кнопку точная дата
   $('.date__exact').daterangepicker({
      "singleDatePicker": true,
      "autoUpdateInput": true,
      "autoApply": false,
      "locale": {
         "format": 'DD MMMM',
         "separator": " - ",
         "applyLabel": "Применить",
         "cancelLabel": "Отмена",
         "fromLabel": "From",
         "toLabel": "To",
         "customRangeLabel": "Выбрать период",
         "weekLabel": "W",
         "daysOfWeek": [
            "Вс",
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб"
         ],
         "monthNames": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
         ],
         "firstDay": 1
      },
      "showCustomRangeLabel": false,
      "alwaysShowCalendars": true,
      "startDate": moment(),
      "endDate": moment(),
      "minDate": moment(),
      "maxDate": moment().add(90, 'days'),
      "opens": "center"
   }, function (start, end, label) {
      $('.date__input').text(start.format('D MMMM'));
      $('.date__input-hidden').val(start.format('DD.MM.YYYY'));
   });

   // поле для загрузки в popup New-Test
   const loadFiles = () => {
      const fileInput = document.querySelector('#file-input');
      let arrFile = [];
      let arrResult = [];
      let arrAllFiles = [];

      function addFiles(files) {
         for (let i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files[i], 'UTF-8');
            reader.onload = function (event) {
               var result = event.target.result;
               if (arrFile.indexOf(result) == -1) {
                  let fileFormat = files[i].name;
                  // console.log(files[i]);
                  let regularTest = (/([[a-zA-ZА-Яа-я.,-—_'"@\s]+.docx$)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.doc$)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.eps)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.jpg$)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.pdf$)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.png$)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.rar$)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.svg$)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.txt$)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.xlsx$)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.xls$)|([[a-zA-ZА-Яа-я.,-—_'"@\s]+.zip$)/ig);
                  if (regularTest.test(fileFormat) && arrFile.length == 0) {
                     arrFile.push(files[i].name);
                     arrResult.push(result);
                     arrAllFiles.push(files[i]);
                  } else if (arrFile.indexOf(files[i].name) == -1) {
                     arrFile.push(files[i].name);
                     arrResult.push(result);
                     arrAllFiles.push(files[i]);
                  }
               }
            };
         }

         createPreview();
      }

      function createPreview() {
         setTimeout(() => {
            $('#files').html('')
            arrResult.forEach(function (e, i) {
               let regularTest = (/(doc$)|(docx$)|(eps)|(jpg$)|(pdf$)|(png$)|(rar$)|(svg$)|(txt$)|(xls$)|(xlsx$)|(zip$)|(DOC$)|(DOCX$)|(EPS)|(JPG$)|(PDF$)|(PNG$)|(RAR$)|(SVG$)|(TXT$)|(XLS$)|(XLSX$)|(ZIP$)/ig)
               let nameFile = arrFile[i].match(regularTest);

               function createPreview(format) {
                  if (nameFile == `${format}`) {
                     $('#files').append(
                        `<div class='preview__item' data-value='${[i]}'>
                           <img src="images/files-image/${format}.svg" alt="${format}">
                           <p class='preview__item-name'>${arrFile[i]}</p>
                           <p class='preview__item-del'></p>
                        </div>`);
                  }
               };
               createPreview('doc'); createPreview('DOC');
               createPreview('docx'); createPreview('DOCX');
               createPreview('eps'); createPreview('EPS');
               createPreview('jpg'); createPreview('JPG');
               createPreview('pdf'); createPreview('PDF');
               createPreview('png'); createPreview('PNG');
               createPreview('rar'); createPreview('RAR');
               createPreview('svg'); createPreview('SVG');
               createPreview('txt'); createPreview('TXT');
               createPreview('xls'); createPreview('XLS');
               createPreview('xlsx'); createPreview('XLSX');
               createPreview('zip'); createPreview('ZIP');
            })
         }, 1000)
      }

      fileInput.onchange = function (e) {
         files = this.files;
         addFiles(files);
      }

      function dragAccept(e) {
         stop(e);
         addFiles(e.dataTransfer.files);
         document.querySelector('.new__test-load').classList.remove('dragover');
      }

      function init() {
         var dd = document.getElementById("dragdrop");
         dd.ondragover = stop;
         dd.ondragleave = stop;
         if ('FileReader' in window) {
            document.ondrop = dragAccept;
         }

         $('.new__test-submit-btn').click(function (e) {
            stop(e);
            var fd = new FormData();
            let name = $('.popup__new-test').find('.new__test-name').val(),
               descr = $('.popup__new-test').find('.new__test-description').val(),
               link = $('.popup__new-test').find('.new__test-link').val(),
               resultText = $('.popup__new-test').find('.new__test-result').val(),
               formatText = $('.popup__new-test').find('.new__test-format').val(),
               vacID = $('.vacancies__select').find('.select__item').attr('data-value'),
               userID = userId,
               error = 0

            for (let i = 0; i < arrAllFiles.length; i++) {
               var file = arrAllFiles[i];
               var filename = file.name;
               fd.append("file[]", file, filename);
            }
            fd.append('vacID', vacID);

            if (name.length < 3) {
               $('.popup__new-test').find('.new__test-name').attr('style', 'border: 1px solid var(--red-300);')
               error += 1;
            } else {
               $('.popup__new-test').find('.new__test-name').attr('style', '')
               error = 0;
            }

            if (descr.length < 3) {
               $('.popup__new-test').find('.new__test-description').attr('style', 'border: 1px solid var(--red-300);')
               error += 1;
            } else {
               $('.popup__new-test').find('.new__test-description').attr('style', '')
               error = 0;
            }

            if (error == 0) {
               $.ajax({
                  url: '/local/components/democontent2.pi/new.vacancies/templates/main/upload_files.php',
                  data: fd,
                  processData: false,
                  contentType: false,
                  type: 'post',
                  success: function (data) {
                     arData = {
                        name: name,
                        descr: descr,
                        link: link,
                        resultText: resultText,
                        formatText: formatText,
                        vacID: vacID,
                        userID: userID,
                        taskFiles: data
                     }
                     $.ajax({
                        url: '/local/components/democontent2.pi/new.vacancies/templates/main/ajax.php',
                        method: 'POST',
                        dataType: 'html',
                        data: {
                           type: 'saveTestTask',
                           data: arData,
                        },
                        success: function (response) {
                           if (parseInt(response) != NaN) {
                              $.ajax({
                                 url: '/local/components/democontent2.pi/new.vacancies/templates/main/ajax.php',
                                 method: 'POST',
                                 dataType: 'json',
                                 data: {
                                    type: 'loadTestTask',
                                    data: arData,
                                    numTask: response
                                 },
                                 success: function (data) {
                                    $('.test__select .select__body').append(`
                                    <div class="select__item" data-value="${data[0].ID}">
                                       <p>${data[0].UF_NAME}</p>
                                    </div>
                                 `)
                                    $('.test__select .select__current').html(`
                                    <div class="select__item" data-value="${data[0].ID}">
                                       <p>${data[0].UF_NAME}</p>
                                    </div>
                                 `)
                                    $('.popup__new-test-close').trigger('click')
                                 },
                                 error: function (data) {
                                    console.log(data);
                                 }
                              });
                           }

                        },
                        error: function (data) {
                           console.log(data);
                        }
                     });
                  }
               });

            }
         })
      }

      function stop(e) {
         e.stopPropagation();
         e.preventDefault();
         document.querySelector('.new__test-load').classList.add('dragover');
      }

      // удаление загруженного файла
      function deleteFile() {
         const popupNewTest = document.querySelector('.popup__new-test');
         popupNewTest.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('preview__item-del')) {
               let itemIndex = target.closest('.preview__item').getAttribute('data-value');
               arrFile.forEach(function (elem, i) {
                  if (itemIndex == i) {
                     arrFile.splice(i, 1);
                     createPreview();
                  }
               });
               arrResult.forEach(function (elem, i) {
                  if (itemIndex == i) {
                     arrResult.splice(i, 1);
                     arrAllFiles.splice(i, 1);
                     createPreview();
                  }
               });
               target.closest('.preview__item').remove();
            }
         })
      }
      deleteFile();

      window.addEventListener("load", init);
   }
   loadFiles();

});
