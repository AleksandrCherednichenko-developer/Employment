document.addEventListener("DOMContentLoaded", () => {
   let body = document.querySelector('body');
   let scrollY;
   let background = document.querySelector('.background'); // фон панели фильтров
   let filterBtn = document.querySelector('.search__header .filter-btn') // кнопка фильтров
   let filterPanel = document.querySelector('.filter__panel'); // панель с фильтрами

   // секция "Категории"
   let categoriesList = document.querySelectorAll('.categories .categories__slider-item'); // все элементы из слайдера с категориями

   // фильтр "Профобласть"
   let filterProfArea = document.querySelector('.filter__prof-area'); // фильтр "Профобласть"
   let filterProfAreaText = document.querySelector('.filter__prof-area .text'); // блок для значений фильтра "Профобласть"
   let listProfArea = document.querySelector('.list__panel .list__prof-area'); // окно со списком профобластей
   let filterProfAreaIndicator;

   // фильтр "Специализация"
   let filterSpec = document.querySelector('.filter__specialisation'); // фильтр "Специализация"
   let filterSpecText = document.querySelector('.filter__specialisation .text'); // блок для значений фильтра "Специализация"
   let filterSpecTextPlaseholder = filterSpecText.querySelector('.text-placeholder'); // заглушка для блока с выбранными значениями
   let listSpec = document.querySelector('.list__specialisation'); // окно для выбора специализаций
   let specArr = []; // массив для значений фильтра "Специализация"
   let filterSpecIndicator;

   // фильтр "Город"
   let filterCityValue = document.querySelector('.filter__city .text'); // блок для значений фильтра "Город"
   let filterCityTextPlaseholder = filterCityValue.querySelector('.text-placeholder'); // заглушка для блока с выбранными значениями
   let listCity = document.querySelector('.list__city'); // окно для поиска города 
   let listCityItems = listCity.querySelector('.items'); // выпадающий список с городами
   let listCityValue = listCity.querySelector('.city-value'); // блок для значений фильтра города в окне поиска
   let cityArr = []; // массив для значений фильтра "Город"
   let filterCityIndicator;

   // фильтр "Переезд"
   let filterMovingItemInput = document.querySelectorAll('.filter__moving .item input'); // элементы списка фильтра "Переезд"
   let filterMovingIndicator;

   // фильтр "Зарплата"
   let filterSalaryFrom = document.querySelector('.filter__salary .from input'); // input для ввода зарплаты от
   let filterSalaryUpto = document.querySelector('.filter__salary .up-to input'); // input для ввода зарплаты до
   let filterSalaryCheckbox = document.querySelector('.filter__salary-checkbox input'); // checkbox из фильтра зарплат
   let filterSalaryIndicator;

   // фильтр "Опыт работы"
   let filterExperienceItem = document.querySelectorAll('.filter__experience .item'); // элементы списка филтра "Опыт работы"
   let experienceArr = []; // массив для значений фильтра "Опыт работы"
   let filterExperienceIndicator;

   // фильтр "Пол"
   let filterGenderItemInput = document.querySelectorAll('.filter__gender .item input'); // элементы списка фильтра "Пол"
   let filterGenderIndicator;

   // фильтр "Возраст"
   let filterAgeFrom = document.querySelector('.filter__age .from input'); // input для ввода возраст от
   let filterAgeUpto = document.querySelector('.filter__age .up-to input'); // input для ввода возраст до
   let filterAgeIndicator;

   // фильтр "Тип занятости"
   let filterEmploymentItem = document.querySelectorAll('.filter__employment .item'); // элементы списка филтра "Тип занятости"
   let employmentArr = []; // массив для значений фильтра "Тип занятости"
   let filterEmploymentIndicator;

   // фильтр "График работы"
   let filterScheduleItem = document.querySelectorAll('.filter__schedule .item'); // элементы списка филтра "График работы"
   let scheduleArr = []; // массив для значений фильтра "График работы"
   let filterScheduleIndicator;

   // фильтр "Публикация"
   let filterPublicationItemInput = document.querySelectorAll('.filter__publication .item input'); // элементы списка фильтра "Публикация"
   let filterPublicationIndicator;

   // фильтра "Языки"
   let filterLangText = document.querySelector('.filter__language .text'); // блок для значений фильтра "Языки"
   let filterLangTextPlaseholder = filterLangText.querySelector('.text-placeholder'); // заглушка для блока с выбранными значениями
   let listLang = document.querySelector('.list__language'); // окно для выбора языков
   let languageArr,
      LanguageCategoriesArr,
      langValID,
      langValLVL,
      allLanguage = [], // массив для значений фильтра "Языки"
      countLanguage = 0;
   let filterLanguagesIndicator;
   let filterLanguage = document.querySelector('.list__panel .language__filter-list');

   // фильтр "Гражданство"
   let filterCitizenshipText = document.querySelector('.filter__citizenship .text'); // блок для значений фильтра "Гражданство"
   let filterCitizenshipTextPlaseholder = filterCitizenshipText.querySelector('.text-placeholder'); // заглушка для блока с выбранными значениями
   let listCitizenship = document.querySelector('.list__citizenship'); // окно для выбора гражданства
   let citizenshipArr = []; // массив для значений фильтра "Гражданство"
   let filterCitizenshipIndicator;

   // фильтр "Разрешение на работу"
   let filterPermissionText = document.querySelector('.filter__permission .text'); // блок для значений фильтра "Разрешение на работу"
   let filterPermissionTextPlaseholder = filterPermissionText.querySelector('.text-placeholder'); // заглушка для блока с выбранными значениями
   let listPermission = document.querySelector('.list__permission'); // окно для выбора гражданства
   let permissionArr = []; // массив для значений фильтра "Разрешение на работу"
   let filterPermissionIndicator;

   // фильтр "Водительские права"
   let filterDriverLicenseItem = document.querySelectorAll('.filter__driver-license .item'); // элементы списка филтра "Водительские права"
   let driverLicenseArr = []; // массив для значений фильтра "Водительские права"
   let filterDriverLicenseIndicator;

   // фильтр "Дополнительно"
   let filterAdditionallyItem = document.querySelectorAll('.filter__additionally .item'); // элементы списка филтра "Дополнительно"
   let additionallyArr = []; // массив для значений фильтра "Дополнительно"
   let filterAdditionallyIndicator;

   //====/функции для работы с Cookie//====//
   // запись значений
   function writeCookie(name, val, expires) {
      var date = new Date;
      date.setDate(date.getDate() + expires);
      document.cookie = name + "=" + val + "; expires=" + date.toUTCString();
   }
   // получение значений
   function readCookie(name) {
      var matches = document.cookie.match(new RegExp(
         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
   }
   // удаление значений
   function delete_cookie(name) {
      writeCookie(name, "", -1)
   }


   // ввод в инпут только чисел
   function checkDigits(input) {
      // проверка на пробелы 
      if (input.value == false) {
         input.value = "";
      }

      if (input.value.length > 0) {
         let inputDataArr = input.value.split(/[- — /]/);
         let inputDataClear = inputDataArr.join('');
         let inputDataArrNew = inputDataClear.match(/.{1,1}/g);

         // отсекает первый ноль если больше 1 символа
         if (inputDataArrNew[0] == 0 && inputDataArrNew.length == 2) {
            inputDataArrNew.shift();
         }

         let inputDataArrClear = inputDataArrNew.filter(function (arr) {
            return arr.match(/^[1-9]|[0-9]|[0-9]$/g);
         });

         // фильтр на посторонние символы
         if (!inputDataArrNew[inputDataArrNew.length - 1].match(/[0-9]/)) {
            inputDataArrNew.length = inputDataArrNew.length - 1
            input.value = inputDataArrNew.join('');
         }
         input.value = inputDataArrClear.join('');
      }
   }

   //====//нажатие на элементы//====//
   document.addEventListener('click', (event) => {
      let target = event.target;

      // нажатие на элементы из слайдера категорий
      function clickSliderCategories() {
         // нажатие на первую кнопку
         if (target.closest('.categories__slider-btn') && target.closest('.categories')) {
            event.preventDefault();
            scrollY = window.scrollY;
            background.classList.add('active');
            filterPanel.classList.add('active');
            listProfArea.classList.add('active');
         }

         // нажатие на элементы из сайдера
         if (target.closest('.categories__slider-item') && target.closest('.categories')) {
            let elemClick = target.closest('.categories__slider-item');

            categoriesList.forEach(itemList => {
               itemList.classList.remove('active');
            })
            elemClick.classList.add('active');

            listProfArea.querySelectorAll('.item').forEach(item => {
               if (item.getAttribute('data-value') == elemClick.getAttribute('data-value')) {
                  listProfArea.querySelectorAll('.item').forEach(item => {
                     item.classList.remove('active');
                  })
                  item.classList.add('active');
               }
            })

            writeCookie('filter__prof-area', elemClick.getAttribute('data-value'), 30);

            filterProfAreaText.setAttribute('data-value', elemClick.getAttribute('data-value'));
            filterProfAreaText.textContent = elemClick.querySelector('p').textContent;
            listProfArea.classList.remove('active');

            // разблокировать/заблокировать филтр спциализация 
            if (filterProfAreaText.getAttribute('data-value') == '' || filterProfAreaText.getAttribute('data-value') == 'all') {
               filterSpec.classList.add('disabled');
            } else {
               filterSpec.classList.remove('disabled');
            }

            // при смене профобласти очищать фильтр специализация 
            specArr = [];
            filterSpecText.querySelectorAll('p').forEach(elem => {
               elem.remove();
            });
            filterSpecTextPlaseholder.style.display = 'block';
            listSpec.querySelectorAll('.item input').forEach(elem => {
               elem.checked = false;
            })
            writeCookie('filter__specialisation', specArr, 30);

            filterProfAreaIndicator = true;
            writeCookie('filterProfAreaIndicator', true, 30);
            filterIndicator();
         }
      };
      clickSliderCategories();

      // нажатие на кнопку фильтр в шапке
      function clickFilter() {
         // открыть фильтры при нажатии на кнопку фильтры
         if (target.closest('.filter-btn')) {
            event.preventDefault();
            scrollY = window.scrollY;
            background.classList.add('active');
            filterPanel.classList.add('active');
         }
         // закрыть фильтры при нажатии на крестик
         if (target.closest('.close__panel') && target.closest('.filter__panel')) {
            background.classList.remove('active');
            filterPanel.classList.remove('active');
            window.scrollTo({
               top: scrollY
            });
         }
      };
      clickFilter();

      // функционал фильтра "Профобласть"
      function clickFilterProfArea() {
         // открытие
         if (target.closest('.filter__prof-area') && target.closest('.filter__wrapper')) {
            listProfArea.classList.add('active');
         }
         // закрытие
         if (target.closest('.btn-back') && target.closest('.list__prof-area')) {
            listProfArea.classList.remove('active');
         }
         // нажатие на элемент
         if (target.closest('.item') && target.closest('.list__prof-area')) {
            let elem = target.closest('.item'),
               elemParent = target.closest('.item').parentNode;

            elemParent.querySelectorAll('.item').forEach(elem => {
               elem.classList.remove('active');
            });
            elem.classList.add('active');

            // смена активной категории слайдера при смене значений в списке профобластей 
            categoriesList.forEach(item => {
               if (elem.getAttribute('data-value') == item.getAttribute('data-value')) {
                  categoriesList.forEach(item => {
                     item.classList.remove('active');
                  })
                  item.classList.add('active');
               }
            })

            // запись значения в Cookie
            writeCookie('filter__prof-area', elem.getAttribute('data-value'), 30);

            // запись текста в в фильтр "Профобласть"
            filterProfAreaText.setAttribute('data-value', elem.getAttribute('data-value'));
            filterProfAreaText.textContent = elem.querySelector('p').textContent;
            listProfArea.classList.remove('active');

            // разблокировать/заблокировать филтр спциализация 
            if (filterProfAreaText.getAttribute('data-value') == '' || filterProfAreaText.getAttribute('data-value') == 'all') {
               filterSpec.classList.add('disabled');
            } else {
               filterSpec.classList.remove('disabled');
            }

            // при смене профобласти очищать фильтр специализация 
            specArr = [];
            filterSpecText.querySelectorAll('p').forEach(elem => {
               elem.remove();
            });
            filterSpecTextPlaseholder.style.display = 'block';
            listSpec.querySelectorAll('.item input').forEach(elem => {
               elem.checked = false;
            })
            writeCookie('filter__specialisation', specArr, 30);

            filterProfAreaIndicator = true;
            writeCookie('filterProfAreaIndicator', true, 30);
            filterIndicator();
         }
      };
      clickFilterProfArea();

      // функционал фильтра "Специализация"
      function clickFilterSpec() {
         // открытие
         if (target.closest('.filter__specialisation') && target.closest('.filter__wrapper')) {
            listSpec.classList.add('active');
         }
         // закрытие
         if (target.closest('.btn-back') && target.closest('.list__specialisation')) {
            listSpec.classList.remove('active');
         }
         // нажатие на элемент
         if (target.closest('.item input') && target.closest('.list__specialisation')) {
            let elemText = target.closest('.item').querySelector('p');
            let elemTextClone = elemText.cloneNode(true);

            filterSpecTextPlaseholder.style.display = 'none';

            if (target.closest('.item input').checked) {
               filterSpecText.append(elemTextClone);
               specArr.push(elemText.getAttribute('data-value'));
            } else {
               specArr.forEach(elemArr => {
                  if (elemArr == (elemText.getAttribute('data-value'))) {
                     specArr.splice((specArr.indexOf(elemArr)), 1);

                     // при снятии check удалять элемент из куки
                     let filterSpeсArrCooki = readCookie('filter__specialisation').split(',');
                     filterSpeсArrCooki.forEach(elemCooki => {
                        if (elemCooki == (elemText.getAttribute('data-value'))) {
                           filterSpeсArrCooki.splice((filterSpeсArrCooki.indexOf(elemCooki)), 1);
                        }
                     })

                  }
               })

               filterSpecText.querySelectorAll('p').forEach(elem => {
                  if (elem.getAttribute('data-value') == elemText.getAttribute('data-value')) {
                     elem.remove();
                     if (filterSpecText.querySelectorAll('p').length < 1) {
                        filterSpecTextPlaseholder.style.display = 'block';
                     }
                  }
               });
            }
            writeCookie('filter__specialisation', specArr, 30);

            // установить индикатор при выборе специализаций
            if (specArr.length != 0) {
               filterSpecIndicator = true
               writeCookie('filterSpecIndicator', true, 30);
            } else {
               filterSpecIndicator = false
               writeCookie('filterSpecIndicator', false, 30);
            }
            filterIndicator();

            // разблокировать/заблокировать филтр спциализация
            if (filterProfAreaText.getAttribute('data-value') == '' || filterProfAreaText.getAttribute('data-value') == 'all') {
               filterSpec.classList.add('disabled');
            } else {
               filterSpec.classList.remove('disabled');
            }

            filterSpec.classList.add('selected');
         }
      };
      clickFilterSpec();

      // функционал фильтра "Город"
      function clickFilterCity() {
         // открытие
         if (target.closest('.filter__city') && target.closest('.filter__panel')) {
            listCity.classList.add('active');
         }
         // закрытие
         if (target.closest('.btn-back') && target.closest('.list__city')) {
            listCity.classList.remove('active');
            listCityItems.classList.remove('active');
         }
         // нажатие на input ввода города
         if (target.closest('input') && target.closest('.list__city')) {
            target.addEventListener('input', () => {
               if (target.value.length > 2) {
                  listCityItems.classList.add('active');
               }
            })
         }
         // нажатие на элементы из списка городов
         if (target.closest('.item') && target.closest('.list__wrapper') && target.closest('.list__city')) {

            listCityItems.classList.remove('active');
            target.closest('.list__city').querySelector('input').value = '';

            filterCityTextPlaseholder.style.display = 'none';

            let removeCity = document.createElement('p');
            removeCity.className = "remove";

            if (cityArr.indexOf(target.textContent) == -1) {
               cityArr.push(target.textContent);

               let cityItemClone = target.cloneNode(true);
               let cityItemClone2 = target.cloneNode(true);

               cityItemClone.append(removeCity);
               listCityValue.append(cityItemClone);
               filterCityValue.append(cityItemClone2);
            }

            writeCookie('filter__city', cityArr, 30);

            if (cityArr.length != 0) {
               filterCityIndicator = true
               writeCookie('filterCityIndicator', true, 30);
            } else {
               filterCityIndicator = false
               writeCookie('filterCityIndicator', false, 30);
            }
            filterIndicator();
         }
         // удаление города при нажатии на крестик
         if (target.closest('.remove') && target.closest('.city-value')) {
            (target.parentNode).remove();

            const regionListItemRemove = (regionList) => {
               regionList.querySelectorAll('.item').forEach(elem => {
                  if (target.parentNode.textContent == elem.textContent) {
                     elem.remove();
                  }
               })
            }
            regionListItemRemove(listCityValue);
            regionListItemRemove(filterCityValue);

            cityArr.forEach(elemArr => {
               if (elemArr == target.parentNode.textContent) {
                  cityArr.splice((cityArr.indexOf(elemArr)), 1);
                  writeCookie('filter__city', cityArr, 30);
               }
            })

            if (cityArr.length == 0) {
               filterCityTextPlaseholder.style.display = 'block';
               delete_cookie('filter__city');

               filterCityIndicator = false
               writeCookie('filterCityIndicator', false, 30);
            } else {
               filterCityIndicator = true
               writeCookie('filterCityIndicator', true, 30);
            }
            filterIndicator();
         }

      };
      clickFilterCity();

      // функционал фильтра "Переезд"
      function clickFilteMoving() {
         if (target.closest('.item input') && target.closest('.filter__moving')) {
            filterMovingItemInput.forEach(item => {
               item.checked = false;
            })
            target.checked = true;

            filterMovingIndicator = true;
            writeCookie('filterMovingIndicator', true, 30);
            filterIndicator();

            writeCookie('filter__moving', target.closest('.item').getAttribute('data-value'), 30);
         }
      };
      clickFilteMoving();

      // функционал фильтра "Зарплата"
      function clickFilterSalary() {
         // ввод зарплаты от
         if (target == filterSalaryFrom) {
            filterSalaryFrom.addEventListener('input', () => {
               checkDigits(filterSalaryFrom)
               if (filterSalaryFrom.value != '') {
                  writeCookie('filter__salary-from', filterSalaryFrom.value, 30);
                  target.parentNode.querySelector('.clear-input').classList.add('active');

                  filterSalaryIndicator = true;
                  writeCookie('filterSalaryIndicator', true, 30);
                  filterIndicator();
               } else {
                  writeCookie('filter__salary-from', 'null', 30);
                  target.parentNode.querySelector('.clear-input').classList.remove('active');

                  filterSalaryIndicator = false;
                  writeCookie('filterSalaryIndicator', false, 30);
                  filterIndicator();
               }
            });
         }
         // очистка зарплата от
         if (target.closest('.clear-input') && target.closest('.from') && target.closest('.filter__salary')) {
            filterSalaryFrom.value = '';
            writeCookie('filter__salary-from', 'null', 30);
            target.classList.remove('active');

            if (filterSalaryUpto.value == '') {
               filterSalaryIndicator = false;
               writeCookie('filterSalaryIndicator', false, 30);
               filterIndicator();
            } else {
               filterSalaryIndicator = true;
               writeCookie('filterSalaryIndicator', true, 30);
               filterIndicator();
            }
         }
         // ввод зарплаты до
         if (target == filterSalaryUpto) {
            filterSalaryUpto.addEventListener('input', () => {
               checkDigits(filterSalaryUpto)
               if (filterSalaryUpto.value != '') {
                  writeCookie('filter__salary-upto', filterSalaryUpto.value, 30);
                  target.parentNode.querySelector('.clear-input').classList.add('active');

                  filterSalaryIndicator = true;
                  writeCookie('filterSalaryIndicator', true, 30);
                  filterIndicator();
               } else {
                  writeCookie('filter__salary-upto', 'null', 30);
                  target.parentNode.querySelector('.clear-input').classList.remove('active');

                  filterSalaryIndicator = false;
                  writeCookie('filterSalaryIndicator', false, 30);
                  filterIndicator();
               }
            });
         }
         // очистка зарплата до
         if (target.closest('.clear-input') && target.closest('.up-to') && target.closest('.filter__salary')) {
            filterSalaryUpto.value = '';
            writeCookie('filter__salary-upto', 'null', 30);
            target.classList.remove('active');

            if (filterSalaryFrom.value == '') {
               filterSalaryIndicator = false;
               writeCookie('filterSalaryIndicator', false, 30);
               filterIndicator();
            } else {
               filterSalaryIndicator = true;
               writeCookie('filterSalaryIndicator', true, 30);
               filterIndicator();
            }
         }
         // включение checkbox в фильтре "Зарплата"
         if (target == filterSalaryCheckbox) {
            if (filterSalaryCheckbox.checked == true) {
               writeCookie('income-is-indicated', 'true', 30);

               filterSalaryIndicator = true;
               writeCookie('filterSalaryIndicator', true, 30);
               filterIndicator();
            } else {
               writeCookie('income-is-indicated', 'false', 30);

               filterSalaryIndicator = false;
               writeCookie('filterSalaryIndicator', false, 30);
               filterIndicator();
            }
         }
      };
      clickFilterSalary();

      // функционал фильтра "Опыт работы"
      function clickFilteExperience() {
         if (target.closest('.item input') && target.closest('.filter__experience')) {
            if (target.checked == true) {
               experienceArr.push(target.closest('.item').getAttribute('data-value'));
               writeCookie('filter__experience', experienceArr, 30);

               if (experienceArr.length != 0) {
                  filterExperienceIndicator = true
                  writeCookie('filterExperienceIndicator', true, 30)
               } else {
                  filterExperienceIndicator = false
                  writeCookie('filterExperienceIndicator', false, 30)
               }
               filterIndicator();
            } else {
               experienceArr.forEach(elemArr => {
                  if (elemArr == (target.closest('.item').getAttribute('data-value'))) {
                     experienceArr.splice((experienceArr.indexOf(elemArr)), 1);
                     writeCookie('filter__experience', experienceArr, 30);

                     if (experienceArr.length != 0) {
                        filterExperienceIndicator = true
                        writeCookie('filterExperienceIndicator', true, 30)
                     } else {
                        delete_cookie('filter__experience');
                        filterExperienceIndicator = false
                        writeCookie('filterExperienceIndicator', false, 30)
                     }
                     filterIndicator();
                  }
               })
            }
         }
      };
      clickFilteExperience();

      // функционал фильтра "Пол"
      function clickFilterGender() {
         if (target.closest('.item input') && target.closest('.filter__gender')) {
            filterGenderItemInput.forEach(item => {
               item.checked = false;
            })
            target.checked = true;

            filterGenderIndicator = true;
            writeCookie('filterGenderIndicator', true, 30)
            filterIndicator();

            writeCookie('filter__gender', target.closest('.item').getAttribute('data-value'), 30);
         }
      };
      clickFilterGender();

      // функционал фильтра "Возраст"
      function clickFilterAge() {
         // ввод возраста от
         if (target == filterAgeFrom) {
            filterAgeFrom.addEventListener('input', () => {
               checkDigits(filterAgeFrom)
               if (filterAgeFrom.value != '') {
                  writeCookie('filter__age-from', filterAgeFrom.value, 30);
                  target.parentNode.querySelector('.clear-input').classList.add('active');

                  filterAgeIndicator = true;
                  filterIndicator();
               } else {
                  writeCookie('filter__age-from', 'null', 30);
                  target.parentNode.querySelector('.clear-input').classList.remove('active');

                  filterAgeIndicator = false;
                  filterIndicator();
               }
            });
         }
         // очистка возраста от
         if (target.closest('.clear-input') && target.closest('.from') && target.closest('.filter__age')) {
            filterAgeFrom.value = '';
            writeCookie('filter__age-from', 'null', 30);
            target.classList.remove('active');

            if (filterAgeUpto.value == '') {
               filterAgeIndicator = false;
               filterIndicator();
            } else {
               filterAgeIndicator = true;
               filterIndicator();
            }
         }
         // ввод возраста до
         if (target == filterAgeUpto) {
            filterAgeUpto.addEventListener('input', () => {
               checkDigits(filterAgeUpto)
               if (filterAgeUpto.value != '') {
                  writeCookie('filter__age-upto', filterAgeUpto.value, 30);
                  target.parentNode.querySelector('.clear-input').classList.add('active');

                  filterAgeIndicator = true;
                  filterIndicator();
               } else {
                  writeCookie('filter__age-upto', 'null', 30);
                  target.parentNode.querySelector('.clear-input').classList.remove('active');

                  filterAgeIndicator = false;
                  filterIndicator();
               }
            });
         }
         // очистка возраста до
         if (target.closest('.clear-input') && target.closest('.up-to') && target.closest('.filter__age')) {
            filterAgeUpto.value = '';
            writeCookie('filter__age-upto', 'null', 30);
            target.classList.remove('active');

            if (filterAgeFrom.value == '') {
               filterAgeIndicator = false;
               filterIndicator();
            } else {
               filterAgeIndicator = true;
               filterIndicator();
            }
         }
      };
      clickFilterAge();

      // функционал фильтра "Тип занятости"
      function clickFilteEmployment() {
         if (target.closest('.item input') && target.closest('.filter__employment')) {
            if (target.checked == true) {
               employmentArr.push(target.closest('.item').getAttribute('data-value'));
               writeCookie('filter__employment', employmentArr, 30);

               if (employmentArr.length != 0) {
                  filterEmploymentIndicator = true
                  writeCookie('filterEmploymentIndicator', true, 30)
               } else {
                  filterEmploymentIndicator = false
                  writeCookie('filterEmploymentIndicator', false, 30)
               }
               filterIndicator();
            } else {
               employmentArr.forEach(elemArr => {
                  if (elemArr == (target.closest('.item').getAttribute('data-value'))) {
                     employmentArr.splice((employmentArr.indexOf(elemArr)), 1);
                     writeCookie('filter__employment', employmentArr, 30);

                     if (employmentArr.length != 0) {
                        filterEmploymentIndicator = true
                        writeCookie('filterEmploymentIndicator', true, 30)
                     } else {
                        delete_cookie('filter__employment');
                        filterEmploymentIndicator = false
                        writeCookie('filterEmploymentIndicator', false, 30)
                     }
                     filterIndicator();
                  }
               })
            }
         }
      };
      clickFilteEmployment();

      // функционал фильтра "График работы"
      function clickFilteSchedule() {
         if (target.closest('.item input') && target.closest('.filter__schedule')) {
            if (target.checked == true) {
               scheduleArr.push(target.closest('.item').getAttribute('data-value'));
               writeCookie('filter__schedule', scheduleArr, 30);

               if (scheduleArr.length != 0) {
                  filterScheduleIndicator = true
                  writeCookie('filterScheduleIndicator', true, 30)
               } else {
                  filterScheduleIndicator = false
                  writeCookie('filterScheduleIndicator', false, 30)
               }
               filterIndicator();
            } else {
               scheduleArr.forEach(elemArr => {
                  if (elemArr == (target.closest('.item').getAttribute('data-value'))) {
                     scheduleArr.splice((scheduleArr.indexOf(elemArr)), 1);
                     writeCookie('filter__schedule', scheduleArr, 30);

                     if (scheduleArr.length != 0) {
                        filterScheduleIndicator = true
                        writeCookie('filterScheduleIndicator', true, 30)
                     } else {
                        delete_cookie('filter__schedule');
                        filterScheduleIndicator = false
                        writeCookie('filterScheduleIndicator', false, 30)
                     }
                     filterIndicator();
                  }
               })
            }
         }
      };
      clickFilteSchedule();

      // функционал фильтра "Публикация"
      function clickFilterPublication() {
         if (target.closest('.item input') && target.closest('.filter__publication')) {
            filterPublicationItemInput.forEach(item => {
               item.checked = false
            })
            target.checked = true;

            writeCookie('filter__publication', target.closest('.item').getAttribute('data-value'), 30);
            filterPublicationIndicator = true;
            writeCookie('filterPublicationIndicator', true, 30)
            filterIndicator();
         }
      };
      clickFilterPublication();

      // функционал фильтра "Знание языков"
      function clickFilterLanguages() {
         // открытие
         if (target.closest('.filter__language') && target.closest('.filter__wrapper')) {
            listLang.classList.add('active');

            listLang.querySelectorAll('.select-categories .header__current').forEach(elem => {
               if (elem.getAttribute('data-value') !== '') {
                  elem.closest('.select-categories').classList.remove('dont-click')
               }
            })
         }

         // закрытие
         if (target.closest('.btn-back') && target.closest('.list__language')) {
            listLang.classList.remove('active');
         }

         // нажатие на селект выбора языка
         if (target.closest('.header-select') && target.closest('.select-language')) {
            if (target.closest('.select-language').querySelector('.body-select').classList.contains('active')) {
               target.closest('.select-language').querySelector('.body-select').classList.remove('active');
            } else {
               document.querySelectorAll('.language__filter-list .body-select.active').forEach(list => {
                  list.classList.remove('active')
               })
               target.closest('.select-language').querySelector('.body-select').classList.add('active');
            }

            // скрывать значения которые уже выбранны
            let languageItems = document.querySelectorAll('.language__filter-list .select-language .body__item');
            if (localStorage.getItem('languages-value') != undefined) {
               let array = JSON.parse(localStorage.getItem('languages-value'));
               let languageName;
               let languageNameArray = [];
               array.forEach(elem => {
                  languageName = elem[0].split(':')[0];
                  languageNameArray.push(languageName);

                  languageItems.forEach(item => {
                     if (languageNameArray.indexOf(item.getAttribute('data-name')) !== -1) {
                        item.classList.add('hide')
                     } else {
                        item.classList.remove('hide')
                     }
                  })
               })
            }
         } else {
            document.querySelectorAll('.language__filter-list .body-select.active').forEach(list => {
               list.classList.remove('active')
            })
         }

         // нажатие на селект категории языка 
         if (target.closest('.header-select') && target.closest('.select-categories')) {
            if (target.closest('.select-categories').querySelector('.body-select').classList.contains('active')) {
               target.closest('.select-categories').querySelector('.body-select').classList.remove('active');
            } else {
               document.querySelectorAll('.language__filter-list .body-select.active').forEach(list => {
                  list.classList.remove('active')
               })
               target.closest('.select-categories').querySelector('.body-select').classList.add('active');
            }
         }

         // нажатие на элементе из списков
         if (target.classList.contains('body__item')) {
            let selectValue = (target.parentNode.parentNode).querySelector('.header__current');

            selectValue.textContent = target.textContent;
            selectValue.setAttribute('data-name', target.getAttribute('data-name'));
            selectValue.setAttribute('data-value', target.getAttribute('data-value'));

            // нажатие на элементы списка с языками
            if (target.closest('.select-language')) {
               languageArr = target.getAttribute('data-name');
               langValID = target.getAttribute('data-value');

               let categoriesInputValue = target.closest('.languages').querySelector('.select-categories .header__current');

               // разблокировать поле для ввода уровня владения языком
               if (target.closest('.select-language').querySelector('.header__current').getAttribute('data-value') !== '') {
                  target.closest('.languages').querySelector('.select-categories').classList.remove('dont-click');
               } else {
                  target.closest('.languages').querySelector('.select-categories').classList.add('dont-click');
               }

               categoriesInputValue.textContent = 'А1 – начальный';
               categoriesInputValue.setAttribute('data-name', 'А1 – начальный');
               categoriesInputValue.setAttribute('data-value', 'a1');
               LanguageCategoriesArr = categoriesInputValue.getAttribute('data-name');
               langValLVL = categoriesInputValue.getAttribute('data-value');
            }
            // нажатие на элементы списка с уровнем
            if (target.closest('.select-categories')) {
               LanguageCategoriesArr = target.getAttribute('data-name');
               langValLVL = target.getAttribute('data-value');
               target.closest('.select-categories').querySelector('.body-select').classList.remove('active');
            }

            if (listLang.querySelectorAll('.languages').length !== target.closest('.languages').querySelectorAll('.select-language .body__item').length) {
               listLang.querySelector('.add-language').classList.remove('dont-click');
            } else {
               listLang.querySelector('.add-language').classList.add('dont-click');
               listLang.querySelector('.add-language').style.display = 'none'
            }

            // запись значений в localstorage
            let languagesValue = languageArr + ':' + LanguageCategoriesArr + ';' + langValID + ':' + langValLVL;
            allLanguage[target.closest('.languages').getAttribute('data-count')] = [languagesValue];
            localStorage.setItem('languages-value', JSON.stringify(allLanguage));

            // вывод значений под фильтром "Знание языков"
            filterLangText.querySelectorAll('p').forEach(elem => {
               elem.remove();
            })
            allLanguage.forEach((elemArr, i) => {
               filterLangTextPlaseholder.style.display = 'none';
               let p = document.createElement('p');
               p.className = 'item';
               p.textContent = elemArr[0].split(':')[0];
               filterLangText.append(p);
            })

            if (allLanguage.length != 0) {
               filterLanguagesIndicator = true
               writeCookie('filterLanguagesIndicator', true, 30)
            } else {
               filterLanguagesIndicator = false
               writeCookie('filterLanguagesIndicator', false, 30)
            }
            filterIndicator();
         }

         // нажатие кнопки добавить еще язык
         if (target.classList.contains('add-language')) {
            let filterLanguagesItem = document.querySelectorAll('.language__filter-list .languages');
            // filterLanguagesItem[0].querySelectorAll('.body__item').forEach(item => {
            //    item.classList.remove('hide');
            // })

            let languageAdd = filterLanguagesItem[0].cloneNode(true);
            languageAdd.className = 'languages';
            languageAdd.querySelector('.select-language .header__current').textContent = 'Выберите язык';
            languageAdd.querySelector('.select-language .header__current').setAttribute('data-name', '');
            languageAdd.querySelector('.select-language .header__current').setAttribute('data-value', '');
            languageAdd.querySelector('.select-categories').classList.add('dont-click');
            languageAdd.querySelector('.select-categories .header__current').textContent = 'Выберите уровень';
            languageAdd.querySelector('.select-categories .header__current').setAttribute('data-name', '');
            languageAdd.querySelector('.select-categories .header__current').setAttribute('data-value', '');
            target.before(languageAdd);

            filterLanguagesItem = document.querySelectorAll('.language__filter-list .languages');
            for (let index = 0; index < filterLanguagesItem.length; index++) {
               filterLanguagesItem[index].setAttribute('data-count', index);
            }

            if (filterLanguagesItem.length > 0) {
               filterLanguagesItem.forEach(elem => {
                  elem.classList.remove('one');
               })
            }

            listLang.querySelector('.add-language').classList.add('dont-click');
         }

         // нажатие кнопки удалить под выбором языка
         if (target.classList.contains('remove-language')) {
            let filterLanguagesItem = document.querySelectorAll('.language__filter-list .languages');
            if (filterLanguagesItem.length !== 1) {
               let languagesValue = JSON.parse(localStorage.getItem('languages-value'));
               let langDataValue = target.parentNode.querySelector('.select-language .header__current').getAttribute('data-value');
               let langDataName = target.parentNode.querySelector('.select-language .header__current').getAttribute('data-name');
               let catDataValue = target.parentNode.querySelector('.select-categories .header__current').getAttribute('data-value');
               let catDataName = target.parentNode.querySelector('.select-categories .header__current').getAttribute('data-name');
               let asd = langDataName + ":" + catDataName + ";" + langDataValue + ":" + catDataValue;

               languagesValue.map(function (event, i) {
                  if (event[0] == asd) {
                     languagesValue.splice(i, 1);
                  }
               })

               allLanguage.map(function (event, i) {
                  if (event[0] == asd) {
                     allLanguage.splice(i, 1);
                  }
               })
               target.parentNode.remove();

               filterLanguagesItem = document.querySelectorAll('.language__filter-list .languages');
               for (let index = 0; index < filterLanguagesItem.length; index++) {
                  filterLanguagesItem[index].setAttribute('data-count', index);
               }
               localStorage.setItem('languages-value', JSON.stringify(languagesValue));
            }

            if (filterLanguagesItem.length == 1) {
               filterLanguagesItem.forEach(elem => {
                  elem.classList.add('one');
               })
            }

            let lastItem = listLang.querySelectorAll('.languages')[listLang.querySelectorAll('.languages').length - 1]
            if (lastItem.querySelector('.select-language .header__current').getAttribute('data-value') != '') {
               filterLanguage.querySelector('.add-language').style.display = 'block'
               listLang.querySelector('.add-language').classList.remove('dont-click');
            } else {
               filterLanguage.querySelector('.add-language').style.display = 'block'
               listLang.querySelector('.add-language').classList.add('dont-click');
            }

            // if (listLang.querySelectorAll('.languages').length !== target.closest('.languages').querySelectorAll('.select-language .body__item').length) {
            //    listLang.querySelector('.add-language').style.display = 'block'
            //    listLang.querySelector('.add-language').classList.remove('dont-click');
            // } else {
            //    listLang.querySelector('.add-language').classList.add('dont-click');
            // }

            // вывод значений под фильтром "Знание языков"
            filterLangText.querySelectorAll('p').forEach(elem => {
               elem.remove();
            })
            allLanguage.forEach((elemArr, i) => {
               filterLangTextPlaseholder.style.display = 'none';
               let p = document.createElement('p');
               p.className = 'item';
               p.textContent = elemArr[0].split(':')[0];
               filterLangText.append(p);
            })

            if (allLanguage.length != 0) {
               filterLanguagesIndicator = true
               writeCookie('filterLanguagesIndicator', true, 30)
            } else {
               filterLanguagesIndicator = false
               writeCookie('filterLanguagesIndicator', false, 30)
            }
            filterIndicator();
         }

         // нажатие кнопки сбросить под выбором языка
         if (target.classList.contains('clear-language')) {
            target.parentNode.querySelector('.select-language .header__current').textContent = 'Выберите язык';
            target.parentNode.querySelector('.select-language .header__current').setAttribute('data-name', '');
            target.parentNode.querySelector('.select-language .header__current').setAttribute('data-value', '');
            target.parentNode.querySelector('.select-categories .header__current').textContent = 'Выберите уровень';
            target.parentNode.querySelector('.select-categories .header__current').setAttribute('data-name', '');
            target.parentNode.querySelector('.select-categories .header__current').setAttribute('data-value', '');
            target.parentNode.querySelector('.select-categories').classList.add('dont-click');
            let languagesList = target.parentNode.querySelectorAll('.body__item');
            languagesList.forEach(elem => {
               elem.classList.remove('hide');
            })
            allLanguage.length = 0;
            localStorage.setItem('languages-value', JSON.stringify(allLanguage));

            // вывод значений под фильтром "Знание языков"
            filterLangText.querySelectorAll('p').forEach(elem => {
               elem.remove();
            })
            filterLangTextPlaseholder.style.display = 'block';

            if (allLanguage.length != 0) {
               filterLanguagesIndicator = true
               writeCookie('filterLanguagesIndicator', true, 30)
            } else {
               filterLanguagesIndicator = false
               writeCookie('filterLanguagesIndicator', false, 30)
            }
            filterIndicator();

            if (listLang.querySelectorAll('.languages').length !== target.closest('.languages').querySelectorAll('.select-language .body__item').length) {
               target.parentNode.querySelector('.select-categories').classList.add('dont-click');
               listLang.querySelector('.add-language').classList.add('dont-click');
            }
         }
      };
      clickFilterLanguages();

      // функционал фильтра "Гражданство"
      function clickFilterCitizenship() {
         // открытие
         if (target.closest('.filter__citizenship') && target.closest('.filter__wrapper')) {
            listCitizenship.classList.add('active');
         }
         // закрытие
         if (target.closest('.btn-back') && target.closest('.list__citizenship')) {
            listCitizenship.classList.remove('active');
         }
         // нажатие на элемент
         if (target.closest('.item input') && target.closest('.list__citizenship')) {
            let elemText = target.closest('.item').querySelector('p');
            let elemTextClone = elemText.cloneNode(true);

            filterCitizenshipTextPlaseholder.style.display = 'none';

            if (target.closest('.item input').checked) {
               filterCitizenshipText.append(elemTextClone);
               citizenshipArr.push(elemText.getAttribute('data-value'));
            } else {
               citizenshipArr.forEach(elemArr => {
                  if (elemArr == (elemText.getAttribute('data-value'))) {
                     citizenshipArr.splice((citizenshipArr.indexOf(elemArr)), 1);

                     // при снятии check удалять элемент из куки
                     let filterCitizenshipArrCooki = readCookie('filter__citizenship').split(',');
                     filterCitizenshipArrCooki.forEach(elemCooki => {
                        if (elemCooki == (elemText.getAttribute('data-value'))) {
                           filterCitizenshipArrCooki.splice((filterCitizenshipArrCooki.indexOf(elemCooki)), 1);
                        }
                     })

                  }
               })

               filterCitizenshipText.querySelectorAll('p').forEach(elem => {
                  if (elem.getAttribute('data-value') == elemText.getAttribute('data-value')) {
                     elem.remove();
                     if (filterCitizenshipText.querySelectorAll('p').length < 1) {
                        filterCitizenshipTextPlaseholder.style.display = 'none';
                     }
                  }
               });
               if (citizenshipArr.length == 0) {
                  filterCitizenshipTextPlaseholder.style.display = 'block';
               }
            }
            writeCookie('filter__citizenship', citizenshipArr, 30);

            if (citizenshipArr.length != 0) {
               filterCitizenshipIndicator = true;
               writeCookie('filterCitizenshipIndicator', true, 30)
            } else {
               delete_cookie('filter__citizenship')
               filterCitizenshipIndicator = false;
               writeCookie('filterCitizenshipIndicator', false, 30)
            }
            filterIndicator();
         }
      };
      clickFilterCitizenship();

      // функционал фильтра "Разрешение на работу"
      function clickFilterPermission() {
         // открытие
         if (target.closest('.filter__permission') && target.closest('.filter__wrapper')) {
            listPermission.classList.add('active');
         }
         // закрытие
         if (target.closest('.btn-back') && target.closest('.list__permission')) {
            listPermission.classList.remove('active');
         }
         // нажатие на элемент
         if (target.closest('.item input') && target.closest('.list__permission')) {
            let elemText = target.closest('.item').querySelector('p');
            let elemTextClone = elemText.cloneNode(true);

            filterPermissionTextPlaseholder.style.display = 'none';

            if (target.closest('.item input').checked) {
               filterPermissionText.append(elemTextClone);
               permissionArr.push(elemText.getAttribute('data-value'));
            } else {
               permissionArr.forEach(elemArr => {
                  if (elemArr == (elemText.getAttribute('data-value'))) {
                     permissionArr.splice((permissionArr.indexOf(elemArr)), 1);

                     // при снятии check удалять элемент из куки
                     let filterPermissionArrCooki = readCookie('filter__permission').split(',');
                     filterPermissionArrCooki.forEach(elemCooki => {
                        if (elemCooki == (elemText.getAttribute('data-value'))) {
                           filterPermissionArrCooki.splice((filterPermissionArrCooki.indexOf(elemCooki)), 1);
                        }
                     })

                  }
               })

               filterPermissionText.querySelectorAll('p').forEach(elem => {
                  if (elem.getAttribute('data-value') == elemText.getAttribute('data-value')) {
                     elem.remove();
                     if (filterPermissionText.querySelectorAll('p').length < 1) {
                        filterPermissionTextPlaseholder.style.display = 'none';
                     }
                  }
               });

               if (permissionArr.length == 0) {
                  filterPermissionTextPlaseholder.style.display = 'block';
               }
            }
            writeCookie('filter__permission', permissionArr, 30);

            if (permissionArr.length != 0) {
               filterPermissionIndicator = true;
               writeCookie('filterPermissionIndicator', true, 30)
            } else {
               delete_cookie('filter__permission')
               filterPermissionIndicator = false;
               writeCookie('filterPermissionIndicator', false, 30)
            }
            filterIndicator();
         }
      };
      clickFilterPermission();

      // функционал фильтра "Водительские права"
      function clickFilteDriverLicense() {
         if (target.closest('.item input') && target.closest('.filter__driver-license')) {
            if (target.checked == true) {
               driverLicenseArr.push(target.closest('.item').getAttribute('data-value'));
               writeCookie('filter__driver-license', driverLicenseArr, 30);

               if (driverLicenseArr.length != 0) {
                  filterDriverLicenseIndicator = true;
                  writeCookie('filterDriverLicenseIndicator', true, 30)
               } else {
                  filterDriverLicenseIndicator = false;
                  writeCookie('filterDriverLicenseIndicator', false, 30)
               }
               filterIndicator();
            } else {
               driverLicenseArr.forEach(elemArr => {
                  if (elemArr == (target.closest('.item').getAttribute('data-value'))) {
                     driverLicenseArr.splice((driverLicenseArr.indexOf(elemArr)), 1);
                     writeCookie('filter__driver-license', driverLicenseArr, 30);

                     if (driverLicenseArr.length != 0) {
                        filterDriverLicenseIndicator = true;
                        writeCookie('filterDriverLicenseIndicator', true, 30)
                     } else {
                        delete_cookie('filter__driver-license')
                        filterDriverLicenseIndicator = false;
                        writeCookie('filterDriverLicenseIndicator', false, 30)
                     }
                     filterIndicator();
                  }
               })
            }
         }
      };
      clickFilteDriverLicense();

      // функционал фильтра "Дополнительно"
      function clickFilteAdditionally() {
         if (target.closest('.item input') && target.closest('.filter__additionally')) {
            if (target.checked == true) {
               additionallyArr.push(target.closest('.item').getAttribute('data-value'));
               writeCookie('filter__additionally', additionallyArr, 30);

               if (additionallyArr.length != 0) {
                  filterAdditionallyIndicator = true;
                  writeCookie('filterAdditionallyIndicator', true, 30)
               } else {
                  filterAdditionallyIndicator = false;
                  writeCookie('filterAdditionallyIndicator', false, 30)
               }
               filterIndicator();
            } else {
               additionallyArr.forEach(elemArr => {
                  if (elemArr == (target.closest('.item').getAttribute('data-value'))) {
                     additionallyArr.splice((additionallyArr.indexOf(elemArr)), 1);
                     writeCookie('filter__additionally', additionallyArr, 30);

                     if (additionallyArr.length != 0) {
                        filterAdditionallyIndicator = true;
                        writeCookie('filterAdditionallyIndicator', true, 30)
                     } else {
                        delete_cookie('filter__additionally')
                        filterAdditionallyIndicator = false;
                        writeCookie('filterAdditionallyIndicator', false, 30)
                     }
                     filterIndicator();
                  }
               })
            }
         }
      };
      clickFilteAdditionally();

      // нажатие кнопки сбросить в списках
      function listClearBtnClick() {
         // список профобластей
         if (target.closest('.clear') && target.closest('.list__bottom') && target.closest('.list__prof-area')) {
            categoriesList.forEach(itemList => {
               itemList.classList.remove('active')
            })
            listProfArea.querySelectorAll('.item').forEach(item => {
               item.classList.remove('active');
            })

            filterProfAreaText.setAttribute('data-value', '');
            filterProfAreaText.textContent = 'Выберите профобласть';

            // очистить фильтр специализации
            filterSpecText.querySelectorAll('p').forEach(elem => {
               elem.remove();
            });
            filterSpecTextPlaseholder.style.display = 'block';
            specArr = [];
            // может не сработает
            listSpec.querySelectorAll('.item input').forEach(item => {
               item.checked = false;
            })
            filterSpec.classList.add('disabled');

            target.closest('.list__prof-area').classList.remove('active');
            delete_cookie('filter__prof-area');
            delete_cookie('filter__specialisation');

            filterProfAreaIndicator = false;
            writeCookie('filterProfAreaIndicator', false, 30);
            filterIndicator();
         }

         // список специализаций
         if (target.closest('.clear') && target.closest('.list__bottom') && target.closest('.list__specialisation')) {
            // очистить фильтр специализации
            filterSpecText.querySelectorAll('p').forEach(elem => {
               elem.remove();
            });
            // может не сработает
            listSpec.querySelectorAll('.item input').forEach(item => {
               item.checked = false;
            });

            filterSpecTextPlaseholder.style.display = 'block';
            target.closest('.list__specialisation').classList.remove('active');
            specArr = [];
            delete_cookie('filter__specialisation');

            filterSpecIndicator = false;
            writeCookie('filterSpecIndicator', false, 30);
            filterIndicator();
         }

         // список городов
         if (target.closest('.clear') && target.closest('.list__bottom') && target.closest('.list__city')) {
            listCityValue.querySelectorAll('.item').forEach(item => {
               item.remove();
            });
            filterCityValue.querySelectorAll('.item').forEach(item => {
               item.remove();;
            });

            cityArr = [];
            delete_cookie('filter__city');

            filterCityTextPlaseholder.style.display = 'block';
            target.closest('.list__city').classList.remove('active');

            filterCityIndicator = false;
            writeCookie('filterCityIndicator', false, 30);
            filterIndicator();
         }

         // список знания языков
         if (target.closest('.clear') && target.closest('.list__bottom') && target.closest('.list__language')) {
            let filterLanguagesItem = document.querySelectorAll('.language__filter-list .languages');
            filterLanguagesItem.forEach((item, index) => {
               if (index !== 0) {
                  item.remove();
               }
               if (index == 0) {
                  item.classList.add('one');
                  item.querySelector('.select-language .header__current').textContent = 'Выберите язык';
                  item.querySelector('.select-language .header__current').setAttribute('data-name', '');
                  item.querySelector('.select-language .header__current').setAttribute('data-value', '');
                  item.querySelector('.select-categories').classList.add('dont-click');
                  item.querySelector('.select-categories .header__current').textContent = 'Выберите уровень';
                  item.querySelector('.select-categories .header__current').setAttribute('data-name', '');
                  item.querySelector('.select-categories .header__current').setAttribute('data-value', '');
               }
            })

            filterLangText.querySelectorAll('p').forEach(elem => {
               elem.remove();
            })
            filterLangTextPlaseholder.style.display = 'block';
            target.closest('.list__language').classList.remove('active');
            allLanguage = [];
            localStorage.setItem('languages-value', JSON.stringify(allLanguage));

            filterLanguage.querySelector('.add-language').style.display = 'block'
            listLang.querySelector('.add-language').classList.add('dont-click');

            filterLanguagesIndicator = false;
            writeCookie('filterLanguagesIndicator', false, 30)
            filterIndicator();
         }

         // списов гражданство
         if (target.closest('.clear') && target.closest('.list__bottom') && target.closest('.list__citizenship')) {
            filterCitizenshipText.querySelectorAll('p').forEach(elem => {
               elem.remove();
            });
            listCitizenship.querySelectorAll('.item input').forEach(item => {
               item.checked = false;
            });

            filterCitizenshipTextPlaseholder.style.display = 'block';
            target.closest('.list__citizenship').classList.remove('active');
            citizenshipArr = [];
            delete_cookie('filter__citizenship');

            filterCitizenshipIndicator = false;
            writeCookie('filterCitizenshipIndicator', false, 30)
            filterIndicator();
         }

         // списов разрешение на работу
         if (target.closest('.clear') && target.closest('.list__bottom') && target.closest('.list__permission')) {
            filterPermissionText.querySelectorAll('p').forEach(elem => {
               elem.remove();
            });
            listPermission.querySelectorAll('.item input').forEach(item => {
               item.checked = false;
            });

            filterPermissionTextPlaseholder.style.display = 'block';
            target.closest('.list__permission').classList.remove('active');
            permissionArr = [];
            delete_cookie('filter__permission');

            filterPermissionIndicator = false;
            writeCookie('filterPermissionIndicator', false, 30)
            filterIndicator();
         }

      }
      listClearBtnClick();

      // нажатие кнопки применить в списках
      function listApplyBtnClick() {
         listProfAreaClass = '.list__prof-area';
         listSpecClass = '.list__specialisation';
         listCityClass = '.list__city';
         listLanguagesClass = '.list__language';
         listCityzenshipClass = '.list__citizenship';
         listPermissionClass = '.list__permission';

         function clickApply(elemClass) {
            if (target.closest('.apply') && target.closest('.list__bottom') && target.closest(elemClass)) {
               target.closest(elemClass).classList.remove('active');
            }
         };
         clickApply(listProfAreaClass);
         clickApply(listSpecClass);
         clickApply(listCityClass);
         clickApply(listLanguagesClass);
         clickApply(listCityzenshipClass);
         clickApply(listPermissionClass);
      }
      listApplyBtnClick();

      // нажатие кнопки применить в фильтрах
      function applyFilter() {
         if (target.closest('.apply') && target.closest('.filter__bottom') && target.closest('.filter__panel')) {
            body.classList.remove('lock');
            background.classList.remove('active');
            filterPanel.classList.remove('active');
            window.scrollTo({
               top: scrollY
            });
         }
      }
      applyFilter();

      // очистить все фильтры 
      function clearFilter() {
         if (target.closest('.clear') && target.closest('.filter__bottom') && target.closest('.filter__panel')) {
            // html.classList.remove('is-locked');
            body.classList.remove('lock');
            background.classList.remove('active');
            filterPanel.classList.remove('active');
            window.scrollTo({
               top: scrollY
            });

            delete_cookie('filter__prof-area');
            delete_cookie('filter__specialisation');
            delete_cookie('filter__city');
            delete_cookie('filter__moving');
            delete_cookie('filter__salary-from');
            delete_cookie('filter__salary-upto');
            delete_cookie('income-is-indicated');
            delete_cookie('filter__experience');
            delete_cookie('filter__gender');
            delete_cookie('filter__age-upto');
            delete_cookie('filter__age-from');
            delete_cookie('filter__employment');
            delete_cookie('filter__schedule');
            delete_cookie('filter__publication');
            delete_cookie('filter__citizenship');
            delete_cookie('filter__permission');
            delete_cookie('filter__driver-license');
            delete_cookie('filter__additionally');
            allLanguage = [];
            localStorage.setItem('languages-value', JSON.stringify(allLanguage));
            location.reload();

            // очистить индикаторы для фильтров
            filterProfAreaIndicator = false; writeCookie('filterProfAreaIndicator', false, 30);
            filterSpecIndicator = false; writeCookie('filterSpecIndicator', false, 30);
            filterCityIndicator = false; writeCookie('filterCityIndicator', false, 30);
            filterMovingIndicator = false; writeCookie('filterMovingIndicator', false, 30)
            filterSalaryIndicator = false; writeCookie('filterSalaryIndicator', false, 30)
            filterExperienceIndicator = false; writeCookie('filterExperienceIndicator', false, 30)
            filterGenderIndicator = false; writeCookie('filterGenderIndicator', false, 30)
            filterEmploymentIndicator = false; writeCookie('filterEmploymentIndicator', false, 30)
            filterScheduleIndicator = false; writeCookie('filterScheduleIndicator', false, 30)
            filterPublicationIndicator = false; writeCookie('filterPublicationIndicator', false, 30)
            filterLanguagesIndicator = false; writeCookie('filterLanguagesIndicator', false, 30)
            filterCitizenshipIndicator = false; writeCookie('filterCitizenshipIndicator', false, 30)
            filterPermissionIndicator = false; writeCookie('filterPermissionIndicator', false, 30)
            filterDriverLicenseIndicator = false; writeCookie('filterDriverLicenseIndicator', false, 30)
            filterAdditionallyIndicator = false; writeCookie('filterAdditionallyIndicator', false, 30)
            filterIndicator();
         }
      };
      clearFilter();

   })

   //====//индикатор активных фильтров//====//
   function filterIndicator() {
      if (
         filterProfAreaIndicator == true ||
         filterSpecIndicator == true ||
         filterCityIndicator == true ||
         filterMovingIndicator == true ||
         filterSalaryIndicator == true ||
         filterExperienceIndicator == true ||
         filterGenderIndicator == true ||
         filterAgeIndicator == true ||
         filterEmploymentIndicator == true ||
         filterScheduleIndicator == true ||
         filterPublicationIndicator == true ||
         filterLanguagesIndicator == true ||
         filterCitizenshipIndicator == true ||
         filterPermissionIndicator == true ||
         filterDriverLicenseIndicator == true ||
         filterAdditionallyIndicator == true
      ) {
         filterBtn.classList.add('not-empty');
      } else {
         filterBtn.classList.remove('not-empty');
      }
   };
   //====//получение значений фильтров при перезагрузке//====//
   window.addEventListener("load", function load() {
      // получение значений фильтра "Профобласть"
      function filterProfAreaLoad() {
         document.querySelectorAll('.list__prof-area .item').forEach(elem => {
            if (elem.getAttribute('data-value') == readCookie('filter__prof-area')) {
               elem.classList.add('active');
               filterProfAreaText.setAttribute('data-value', elem.getAttribute('data-value'));
               filterProfAreaText.textContent = elem.querySelector('p').textContent;

               // разблокировать/заблокировать филтр спциализация 
               if (filterProfAreaText.getAttribute('data-value') == '' || filterProfAreaText.getAttribute('data-value') == 'all') {
                  filterSpec.classList.add('disabled');
               } else {
                  filterSpec.classList.remove('disabled');
               }
            }
         })
         categoriesList.forEach(item => {
            if (item.getAttribute('data-value') == readCookie('filter__prof-area')) {
               item.classList.add('active');
            }
         })
      };
      filterProfAreaLoad();

      // получение значений фильтра "Специализация"
      function filterSpecLoad() {
         if (readCookie('filter__specialisation') != undefined && specArr.length != 0) {
            specArr = readCookie('filter__specialisation').split(',');

            if (!(filterProfAreaText.getAttribute('data-value') == '' || filterProfAreaText.getAttribute('data-value') == 'all')) {
               specArr.forEach(elemArr => {
                  listSpec.querySelectorAll('.item').forEach(elemList => {
                     if (elemArr == elemList.getAttribute('data-value')) {
                        elemList.querySelector('input').checked = true;
                        filterSpecText.append(elemList.querySelector('p').cloneNode(true));

                        if (filterSpecText.querySelectorAll('p').length < 1) {
                           filterSpecTextPlaseholder.style.display = 'block';
                        } else {
                           filterSpecTextPlaseholder.style.display = 'none';
                        }
                     }
                  })
               })
            }
         }
      }
      filterSpecLoad();

      // получение значений фильтра "Город"
      function filterCityLoad() {
         if (readCookie('filter__city') != undefined && readCookie('filter__city') != '') {
            cityArr = readCookie('filter__city').split(',');

            cityArr.forEach(elemArr => {
               filterCityTextPlaseholder.style.display = 'none';

               let itemCityFilter = document.createElement('p');
               itemCityFilter.className = "item";
               let itemCityList = document.createElement('p');
               itemCityList.className = "item";
               let removeCity = document.createElement('p');
               removeCity.className = "remove";

               itemCityFilter.textContent = elemArr;
               itemCityList.textContent = elemArr;

               filterCityValue.append(itemCityFilter);
               itemCityList.append(removeCity);
               listCityValue.append(itemCityList);
            })
         }
      }
      filterCityLoad();

      // получение значений фильтра "Переезд"
      function filterMovingLoad() {
         if (readCookie('filter__moving') != undefined) {
            filterMovingItemInput.forEach(item => {
               if (readCookie('filter__moving') == item.closest('.item').getAttribute('data-value')) {
                  item.checked = true
               }
            })
         }
      }
      filterMovingLoad();

      // получение значений фильтра "Зарплата"
      function filterSalaryLoad() {
         if (readCookie('filter__salary-from') != undefined) {
            if (readCookie('filter__salary-from') != 'null') {
               filterSalaryFrom.value = readCookie('filter__salary-from');
            }
         } else {
            if (readCookie('filter__salary-from') == 'null') {
               filterSalaryFrom.value = '';
            }
         }

         if (readCookie('filter__salary-upto') != undefined) {
            if (readCookie('filter__salary-upto') != 'null') {
               filterSalaryUpto.value = readCookie('filter__salary-upto');
            }
         } else {
            if (readCookie('filter__salary-upto') == 'null') {
               filterSalaryUpto.value = '';
            }
         }
         if (readCookie('income-is-indicated') != undefined) {
            if (readCookie('income-is-indicated') == 'false') {
               filterSalaryCheckbox.checked = false;
            } else if (readCookie('income-is-indicated') == 'true') {
               filterSalaryCheckbox.checked = true;
            }
         }
      }
      filterSalaryLoad();

      // получение значений фильтра "Опыт работы"
      function filterExperienceLoad() {
         if (readCookie('filter__experience') != undefined) {
            experienceArr = readCookie('filter__experience').split(',');

            experienceArr.forEach(elemArr => {
               filterExperienceItem.forEach(item => {
                  if (elemArr == item.getAttribute('data-value')) {
                     item.querySelector('input').checked = true;
                  }
               })
            });
         }
      }
      filterExperienceLoad();

      // получение значений фильтра "Пол"
      function filterGenderLoad() {
         if (readCookie('filter__gender') != undefined) {
            filterGenderItemInput.forEach(item => {
               if (readCookie('filter__gender') == item.closest('.item').getAttribute('data-value')) {
                  item.checked = true;
               }
            })
         }
      }
      filterGenderLoad();

      // получение значений фильтра "Возраст"
      function filterAgeLoad() {
         if (readCookie('filter__age-from') != undefined) {
            if (readCookie('filter__agey-from') != 'null') {
               filterAgeFrom.value = readCookie('filter__age-from');
            }
         } else {
            if (readCookie('filter__agey-from') == 'null') {
               filterAgeFrom.value = '';
            }
         }

         if (readCookie('filter__age-upto') != undefined) {
            if (readCookie('filter__age-upto') != 'null') {
               filterAgeUpto.value = readCookie('filter__age-upto');
            }
         } else {
            if (readCookie('filter__age-upto') == 'null') {
               filterAgeUpto.value = '';
            }
         }
      }
      filterAgeLoad();

      // получение значений фильтра "Тип занятости"
      function filterEmploymentLoad() {
         if (readCookie('filter__employment') != undefined) {
            employmentArr = readCookie('filter__employment').split(',');

            employmentArr.forEach(elemArr => {
               filterEmploymentItem.forEach(item => {
                  if (elemArr == item.getAttribute('data-value')) {
                     item.querySelector('input').checked = true;
                  }
               })
            });
         }
      }
      filterEmploymentLoad();

      // получение значений фильтра "График работы"
      function filterScheduleLoad() {
         if (readCookie('filter__schedule') != undefined) {
            scheduleArr = readCookie('filter__schedule').split(',');

            scheduleArr.forEach(elemArr => {
               filterScheduleItem.forEach(item => {
                  if (elemArr == item.getAttribute('data-value')) {
                     item.querySelector('input').checked = true;
                  }
               })
            });
         }
      }
      filterScheduleLoad();

      // получение значений фильтра "Публикация"
      function filterPublicationLoad() {
         if (readCookie('filter__publication') != undefined) {
            filterPublicationItemInput.forEach(item => {
               if (readCookie('filter__publication') == item.closest('.item').getAttribute('data-value')) {
                  item.checked = true;
               }
            })
         }
      }
      filterPublicationLoad();

      // получение данных фильтра "Языки"
      const filterLanguagesLoad = () => {
         if (localStorage.getItem('languages-value') != undefined) {
            allLanguage = JSON.parse(this.localStorage.getItem('languages-value'));
            if (allLanguage != null) {
               if ((allLanguage.length) > 0) {
                  let langQwe1 = allLanguage[0][0].split(';')[0];
                  let langQwe2 = allLanguage[0][0].split(';')[1];
                  let langValue1 = langQwe1.split(':');
                  let langValueLvl = langQwe2.split(':');

                  if (langValue1[0] == 'undefined') {
                     langValue1[0] = 'Выберите язык'
                  }
                  if (langValue1[1] == 'undefined') {
                     langValue1[1] = 'Выберите уровень'
                  }
                  let filterLanguagesItem = document.querySelector('.language__filter-list .languages');
                  filterLanguagesItem.querySelector('.select-language .header__current').textContent = langValue1[0];
                  filterLanguagesItem.querySelector('.select-language .header__current').setAttribute('data-name', langValue1[0]);
                  filterLanguagesItem.querySelector('.select-language .header__current').setAttribute('data-value', langValueLvl[0]);
                  filterLanguagesItem.querySelector('.select-categories .header__current').textContent = langValue1[1];
                  filterLanguagesItem.querySelector('.select-categories .header__current').setAttribute('data-name', langValue1[1]);
                  filterLanguagesItem.querySelector('.select-categories .header__current').setAttribute('data-value', langValueLvl[1]);

                  for (let index = 1; index < allLanguage.length; ++index) {
                     let langQwe1 = allLanguage[index][0].split(';')[0];
                     let langQwe2 = allLanguage[index][0].split(';')[1];
                     let langValue2 = langQwe1.split(':');
                     let langValueLvl2 = langQwe2.split(':');
                     const addLanguageBtn = document.querySelector('.language__filter-list .add-language');
                     countLanguage++;

                     let languageAdd = filterLanguagesItem.cloneNode(true);
                     languageAdd.querySelector('.select-language .header__current').textContent = langValue2[0];
                     languageAdd.querySelector('.select-language .header__current').setAttribute('data-name', langValue2[0]);
                     languageAdd.querySelector('.select-language .header__current').setAttribute('data-value', langValueLvl2[0]);
                     languageAdd.querySelector('.select-categories .header__current').textContent = langValue2[1];
                     languageAdd.querySelector('.select-categories .header__current').setAttribute('data-name', langValue2[1]);
                     languageAdd.querySelector('.select-categories .header__current').setAttribute('data-value', langValueLvl2[1]);
                     languageAdd.setAttribute('data-count', countLanguage);
                     addLanguageBtn.before(languageAdd);
                  }

                  filterLangText.querySelectorAll('p').forEach(elem => {
                     elem.remove();
                  })
                  // вывод значений под фильтром "Знание языков"
                  allLanguage.forEach((elemArr, i) => {
                     filterLangTextPlaseholder.style.display = 'none';
                     let p = document.createElement('p');
                     p.className = 'item';
                     p.textContent = elemArr[0].split(':')[0];
                     filterLangText.append(p);
                  })
               }

               let filterLanguagesItem = document.querySelectorAll('.language__filter-list .languages');
               if (filterLanguagesItem.length == 1) {
                  filterLanguagesItem.forEach(elem => {
                     elem.classList.add('one');
                  })
               } else if (filterLanguagesItem.length > 1) {
                  filterLanguagesItem.forEach(elem => {
                     elem.classList.remove('one');
                  })
               }

               if (listLang.querySelectorAll('.languages').length !== listLang.querySelector('.languages').querySelectorAll('.select-language .body__item').length) {
                  listLang.querySelector('.add-language').classList.add('dont-click');
               } else {
                  listLang.querySelector('.add-language').style.display = 'none'
                  listLang.querySelector('.add-language').classList.add('dont-click');
               }
               listLang.querySelectorAll('.select-categories .header__current').forEach(elem => {
                  if (elem.getAttribute('data-value') !== '') {
                     elem.closest('.select-categories').classList.remove('dont-click')
                     listLang.querySelector('.add-language').classList.remove('dont-click');
                  }
               })
               listLang.querySelectorAll('.select-language .header__current').forEach(elem => {
                  if (elem.getAttribute('data-value') !== '') {
                     listLang.querySelector('.add-language').classList.remove('dont-click');
                  }
               })
            }
         }
      };
      filterLanguagesLoad();

      // получение значений фильтра "Гражданство"
      function filterCitizenshipLoad() {
         if (readCookie('filter__citizenship') != undefined && citizenshipArr.length == 0) {
            citizenshipArr = readCookie('filter__citizenship').split(',');
            citizenshipArr.forEach(elemArr => {
               listCitizenship.querySelectorAll('.item').forEach(elemList => {
                  if (elemArr == elemList.getAttribute('data-value')) {
                     elemList.querySelector('input').checked = true;
                     filterCitizenshipText.append(elemList.querySelector('p').cloneNode(true));

                     if (filterCitizenshipText.querySelectorAll('p').length < 1) {
                        filterCitizenshipTextPlaseholder.style.display = 'block';
                     } else {
                        filterCitizenshipTextPlaseholder.style.display = 'none';
                     }
                  }
               })
            })
         }
      }
      filterCitizenshipLoad();

      // получение значений фильтра "Разрешение на работу"
      function filterPermissionLoad() {
         if (readCookie('filter__permission') != undefined && permissionArr.length == 0) {
            permissionArr = readCookie('filter__permission').split(',');
            permissionArr.forEach(elemArr => {
               listPermission.querySelectorAll('.item').forEach(elemList => {
                  if (elemArr == elemList.getAttribute('data-value')) {
                     elemList.querySelector('input').checked = true;
                     filterPermissionText.append(elemList.querySelector('p').cloneNode(true));

                     if (filterPermissionText.querySelectorAll('p').length < 1) {
                        filterPermissionTextPlaseholder.style.display = 'block';
                     } else {
                        filterPermissionTextPlaseholder.style.display = 'none';
                     }
                  }
               })
            })
         }
      }
      filterPermissionLoad();

      // получение значений фильтра "Водительские права"
      function filterDriverLicenseLoad() {
         if (readCookie('filter__driver-license') != undefined) {
            driverLicenseArr = readCookie('filter__driver-license').split(',');
            driverLicenseArr.forEach(elemArr => {
               filterDriverLicenseItem.forEach(item => {
                  if (elemArr == item.getAttribute('data-value')) {
                     item.querySelector('input').checked = true;
                  }
               })
            });
         }
      }
      filterDriverLicenseLoad();

      // получение значений фильтра "Дополнительно"
      function filterScheduleLoad() {
         if (readCookie('filter__additionally') != undefined) {
            additionallyArr = readCookie('filter__additionally').split(',');

            additionallyArr.forEach(elemArr => {
               filterAdditionallyItem.forEach(item => {
                  if (elemArr == item.getAttribute('data-value')) {
                     item.querySelector('input').checked = true;
                  }
               })
            });
         }
      }
      filterScheduleLoad();

      // получение индикатора фильтров при перезагрузке
      function filterIndicatorLoad(nameCookie) {
         if (readCookie(nameCookie) !== undefined) {
            if (readCookie(nameCookie) == 'true') {
               return true;
            } else {
               return false;
            }
         }
      }
      filterProfAreaIndicator = filterIndicatorLoad('filterProfAreaIndicator');
      filterSpecIndicator = filterIndicatorLoad('filterSpecIndicator');
      filterCityIndicator = filterIndicatorLoad('filterCityIndicator');
      filterMovingIndicator = filterIndicatorLoad('filterMovingIndicator');
      filterSalaryIndicator = filterIndicatorLoad('filterSalaryIndicator');
      filterExperienceIndicator = filterIndicatorLoad('filterExperienceIndicator');
      filterGenderIndicator = filterIndicatorLoad('filterGenderIndicator');
      filterEmploymentIndicator = filterIndicatorLoad('filterEmploymentIndicator');
      filterScheduleIndicator = filterIndicatorLoad('filterScheduleIndicator');
      filterPublicationIndicator = filterIndicatorLoad('filterPublicationIndicator');
      filterLanguagesIndicator = filterIndicatorLoad('filterLanguagesIndicator');
      filterCitizenshipIndicator = filterIndicatorLoad('filterCitizenshipIndicator');
      filterPermissionIndicator = filterIndicatorLoad('filterPermissionIndicator');
      filterDriverLicenseIndicator = filterIndicatorLoad('filterDriverLicenseIndicator');
      filterAdditionallyIndicator = filterIndicatorLoad('filterAdditionallyIndicator');
      filterIndicator();

   }, false);
});