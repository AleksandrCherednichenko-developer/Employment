document.addEventListener("DOMContentLoaded", () => {
   const html = document.querySelector('html'),
      body = document.querySelector('body'),
      filterPanel = document.querySelector('.summary__content-right .filter'),
      filterShowBtn = document.querySelector('.filter__show'),
      filterBackground = document.querySelector('.filter__background');


   const categoriesSliderItems = document.querySelectorAll('.work__categories .categories__slider-item'); // элементы слайдера с категориями

   const filterCategoriesText = document.querySelector('.categories__filter p'); // получение текста из фильтра категории
   const filterSpecialisation = document.querySelector('.specialisation__filter'); // получение фильтра специализация
   const filterSpecialisationList = filterSpecialisation.querySelector('.specialisation__filter-list'); // получение списка в фильтре специализация
   const filterRegion = document.querySelector('.region__filter'); // получение фильтра регион
   const filterRegionList = filterRegion.querySelector('.region__filter-list'); // получение списка выбранных городов
   const filterRegionCheckbox = filterRegion.querySelector('.region__filter-checkbox input'); // полуечние чекбокса в фильтре переезд
   const filterMoving = document.querySelector('.moving__filter'); // получение фильтра переезд
   const filterSalary = document.querySelector('.salary__filter'); // получение фильтра зарплата
   const filterSalaryInputFrom = filterSalary.querySelector('.salary__filter-input .from'); // получение инпута зарплата От
   const filterSalaryInputUpTo = filterSalary.querySelector('.salary__filter-input .up-to'); // получение инпута зарплата До
   const filterSalaryCheckbox = filterSalary.querySelector('.salary__filter-checkbox input'); // получение чекбокса из фильтра зарплата
   const filterExperience = document.querySelector('.experience__filter'); // получение фильтра опыт работы
   const filterExperienceList = filterExperience.querySelectorAll('input'); // получене списка из фильтра опыт работы
   let filterExperienceArr = [];
   const filterGender = document.querySelector('.gender__filter'); // получение фильтра пол
   const filterAge = document.querySelector('.age__filter'); // получение фильтра зарплата
   const filterAgeInputFrom = filterAge.querySelector('.age__filter-input .from'); // получение инпута возраст От
   const filterAgeInputUpTo = filterAge.querySelector('.age__filter-input .up-to'); // получение инпута возраст До
   const filterPublication = document.querySelector('.publication__filter'); // получение фильтра время публикации
   const filterEmployment = document.querySelector('.employment__filter'); // получение фильтра тип занятости
   const filterEmploymentList = filterEmployment.querySelectorAll('input'); // получение списка в фильтре тип занятости
   let filterEmploymentArr = [];
   const filterSchedule = document.querySelector('.schedule__filter'); // получение фильтра график работы
   const filterScheduleList = filterSchedule.querySelectorAll('input'); // получение списка в фильтре график работы
   let filterScheduleArr = [];
   const filterAdditionally = document.querySelector('.additionally__filter'); // получение фильтра дополнительно
   const filterAdditionallyList = filterAdditionally.querySelectorAll('input'); // получение списка в фильтре дополнительно
   let filterAdditionallyArr = [];
   const filterCitizenship = document.querySelector('.citizenship__filter'); // получение фильтра гражданство
   const filterCitizenshipList = filterCitizenship.querySelectorAll('input'); // получение списка в фильтре гражданство
   let filterCitizenshipArr = [];
   const filterLanguage = document.querySelector('.language__filter'); // получение фильтра языки
   let languageArr,
      LanguageCategoriesArr,
      langValID, langValLVL,
      allLanguage = [],
      countLanguage = 0;
   const filterPermission = document.querySelector('.permission__filter'); // получение фильтра разрешение на работу
   const filterPermissionList = filterPermission.querySelectorAll('input'); // получение списка в фильтре разрешение на работу
   let filterPermissionArr = [];
   const filterDriverLicense = document.querySelector('.driver-license__filter'); // получение фильтра водительские права
   const filterDriverLicenseList = filterDriverLicense.querySelectorAll('input'); // получение списка в фильтре водительские права
   let filterDriverLicenseArr = [];
   const popup = document.querySelector('#popupMain'); // получение фона для попап
   const popupCategories = popup.querySelector('.popup__categories'); // получение попап категории
   const popupCategoriesList = popupCategories.querySelectorAll('li'); // элементы списка в попап категории
   const popupCategoriesBtn = popupCategories.querySelectorAll('button'); // получение кнопок в попап категории
   const popupSpecialisation = popup.querySelector('.popup__specialisation'), // получение попап специализации
      popupSpecialisationActive = popupSpecialisation.querySelector('.categories-active'); // получение активной категории в попап специализации
   let popupSpecialisationList;
   let popupSpecialisationArr = [];
   const popupRegion = popup.querySelector('.popup__region'), // получение попап регион
      popupRegionSearch = popupRegion.querySelector('.search-input'),
      popupRegionValue = popupRegion.querySelector('.popup__region-list'); // получение поля ввода региона
   let popupRegionArr = [];

   let countExperienceCheck = 0,
      countEmploymentCheck = 0,
      countScheduleCheck = 0,
      countAdditionallyCheck = 0,
      countCitizenshipCheck = 0,
      countPermissionCheck = 0,
      countDriverLicenseCheck = 0;


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

   // ============================================= //
   // нажатие на элемент слайдера категории и на список в фильтре категории
   const clickCategoriesItem = (list1, list2) => {
      list1.forEach(item => {
         item.addEventListener('click', () => {
            list1.forEach(li => {
               li.classList.remove('active');
            });
            item.classList.add('active');
            filterCategoriesText.textContent = item.querySelector('p').textContent;
            localStorage.setItem('categories-active', item.getAttribute('data-value'));
            localStorage.setItem('categories-name', item.querySelector('p').textContent);

            list2.forEach(elem => {
               if (elem.getAttribute('data-value') == item.getAttribute('data-value')) {
                  list2.forEach(elem => {
                     elem.classList.remove('active');
                  });
                  elem.classList.add('active');
               }
            });

            // активировать фильтр специализация и кнопки в попап категории если выбранна любая категория кроме Всех
            if (item.getAttribute('data-value') !== 'all') {
               filterSpecialisation.classList.remove('disabled');
               localStorage.setItem('specialisation', 'enabled');
               popupCategoriesBtn.forEach(btn => {
                  btn.disabled = false;
                  if (btn.classList.contains('search')) {
                     btn.disabled = true;
                     btn.style.display = 'none';
                  } else if (btn.classList.contains('next')) {
                     btn.style.display = 'block';
                  }
               })
            } else {
               filterSpecialisation.classList.add('disabled');
               localStorage.setItem('specialisation', 'disabled');
               popupCategoriesBtn.forEach(btn => {
                  btn.disabled = true;
                  if (btn.classList.contains('search')) {
                     btn.disabled = false;
                     btn.style.display = 'block';
                  } else if (btn.classList.contains('next')) {
                     btn.style.display = 'none';
                  }
               })
            }

            // при смене категории очищать список специализаций
            popupSpecialisationList = popupSpecialisation.querySelectorAll('input');
            popupSpecialisationList.forEach(elem => {
               elem.checked = false;
            })
            popupSpecialisationArr.length = 0;
            localStorage.setItem('specialisation-value', JSON.stringify(popupSpecialisationArr));

            // очищать список в фильтре специализация
            (filterSpecialisationList.querySelectorAll('p')).forEach(elem => {
               elem.remove();
            })
         });
      });
   };
   clickCategoriesItem(categoriesSliderItems, popupCategoriesList);
   clickCategoriesItem(popupCategoriesList, categoriesSliderItems);

   // нажатие на элемент в попап специалзация
   const clickSpecialisationItem = () => {
      popupSpecialisationList = popupSpecialisation.querySelectorAll('input');
      popupSpecialisationList.forEach(elem => {
         let checkboxText = (elem.parentNode.querySelector('p'));
         let pClone = checkboxText.cloneNode(true);

         elem.addEventListener('click', () => {
            if (elem.checked == true) {
               popupSpecialisationArr.push(elem.parentNode.getAttribute('data-value'));

               localStorage.setItem('specialisation-value', JSON.stringify(popupSpecialisationArr));

               filterSpecialisationList.append(pClone);
               filterSpecialisation.querySelector('.specialisation__filter-top').classList.add('margin-bottom');
            } else {
               popupSpecialisationArr.forEach(elemArr => {
                  if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                     popupSpecialisationArr.splice((popupSpecialisationArr.indexOf(elemArr)), 1);
                     localStorage.setItem('specialisation-value', JSON.stringify(popupSpecialisationArr));
                  }
               })

               filterSpecialisationList.querySelectorAll('p').forEach(elem => {
                  if (checkboxText.textContent == elem.textContent) {
                     elem.remove();
                     if (filterSpecialisationList.querySelectorAll('p').length == 0) {
                        filterRegion.querySelector('.specialisation__filter-top').classList.remove('margin-bottom');
                     }
                  }
               })
            }
         })
      })
   };

   // функционал в попап регион
   const popupRegionInput = () => {
      let popupRegionSearchList;

      popupRegion.addEventListener('click', e => {
         let target = e.target;
         if (target == popupRegionSearch) {
            popupRegionSearch.addEventListener('input', () => {
               popupRegionSearchList = popupRegion.querySelector('.search-list'); // получение выподающего списка регионов
               popupRegionSearchList.classList.add('active');
            })
         }

         if (target.closest('.search-list') && target.closest('.item')) {
            popupRegionSearchList.classList.remove('active');
            popupRegionSearch.value = '';

            let removeRegion = document.createElement('p');
            removeRegion.className = "remove";

            let removeRegionPopup = document.createElement('p');
            removeRegionPopup.className = "remove";

            if (popupRegionArr.indexOf(target.textContent) == -1) {
               popupRegionArr.push(target.textContent);
               localStorage.setItem('region-value', JSON.stringify(popupRegionArr));

               let regionItem = target.cloneNode(true);
               let regionItemPopup = target.cloneNode(true);

               regionItem.append(removeRegion);
               filterRegionList.append(regionItem);

               if (filterRegionList.querySelectorAll('p.item').length > 0) {
                  filterRegion.querySelector('.region__filter-top').classList.add('margin-bottom');
               }

               regionItemPopup.append(removeRegionPopup);
               popupRegionValue.append(regionItemPopup);
            }
         }
      })
   }
   popupRegionInput();

   // функцианал фильтра зарплата
   const filterSalaryInput = () => {
      filterSalaryInputFrom.addEventListener('input', () => {
         checkDigits(filterSalaryInputFrom)
         if (filterSalaryInputFrom.value !== '') {
            localStorage.setItem('salary-from', filterSalaryInputFrom.value);
         } else {
            localStorage.setItem('salary-from', 'null');
         }
      });

      filterSalaryInputUpTo.addEventListener('input', () => {
         checkDigits(filterSalaryInputUpTo)
         if (filterSalaryInputUpTo.value !== '') {
            localStorage.setItem('salary-up-to', filterSalaryInputUpTo.value);
         } else {
            localStorage.setItem('salary-up-to', 'null');
         }
      });

      filterSalaryCheckbox.addEventListener('click', () => {
         if (filterSalaryCheckbox.checked == true) {
            localStorage.setItem('income-is-indicated', 'true');
         } else {
            localStorage.setItem('income-is-indicated', 'false');
         }
      })
   }
   filterSalaryInput();

   // функцианал фильтра возраст
   const filterAgeInput = () => {
      filterAgeInputFrom.addEventListener('input', () => {
         checkDigits(filterAgeInputFrom)
         if (filterAgeInputFrom.value !== '') {
            localStorage.setItem('age-from', filterAgeInputFrom.value);
         } else {
            localStorage.setItem('age-from', 'null');
         }
      });

      filterAgeInputUpTo.addEventListener('input', () => {
         checkDigits(filterAgeInputUpTo)
         if (filterAgeInputUpTo.value !== '') {
            localStorage.setItem('age-up-to', filterAgeInputUpTo.value);
         } else {
            localStorage.setItem('age-up-to', 'null');
         }
      });
   }
   filterAgeInput();

   // функционал фильтра опыт работы
   const filterExperienceInput = () => {

      filterExperienceList.forEach(elem => {

         elem.addEventListener('click', () => {
            if (elem.checked == true) {
               filterExperienceArr.push(elem.parentNode.getAttribute('data-value'));
               localStorage.setItem('experience-value', JSON.stringify(filterExperienceArr));
               countExperienceCheck++;
            } else {
               filterExperienceArr.forEach(elemArr => {
                  if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                     filterExperienceArr.splice((filterExperienceArr.indexOf(elemArr)), 1);
                     localStorage.setItem('experience-value', JSON.stringify(filterExperienceArr));
                  }
               })
               countExperienceCheck--;
            }
            notAll(countExperienceCheck, filterExperience);
         })

      })
   }
   filterExperienceInput();

   // функционал фильтра тип занятости
   const filterEmploymentInput = () => {
      filterEmploymentList.forEach(elem => {

         elem.addEventListener('click', () => {
            if (elem.checked == true) {
               filterEmploymentArr.push(elem.parentNode.getAttribute('data-value'));
               localStorage.setItem('employment-value', JSON.stringify(filterEmploymentArr));
               countEmploymentCheck++;
            } else {
               filterEmploymentArr.forEach(elemArr => {
                  if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                     filterEmploymentArr.splice((filterEmploymentArr.indexOf(elemArr)), 1);
                     localStorage.setItem('employment-value', JSON.stringify(filterEmploymentArr));
                  }
               })
               countEmploymentCheck--;
            }
            notAll(countEmploymentCheck, filterEmployment);
         })

      })
   }
   filterEmploymentInput();

   // функционал фильтра график работы
   const filterScheduleInput = () => {
      filterScheduleList.forEach(elem => {

         elem.addEventListener('click', () => {
            if (elem.checked == true) {
               filterScheduleArr.push(elem.parentNode.getAttribute('data-value'));
               localStorage.setItem('schedule-value', JSON.stringify(filterScheduleArr));
               countScheduleCheck++;
            } else {
               filterScheduleArr.forEach(elemArr => {
                  if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                     filterScheduleArr.splice((filterScheduleArr.indexOf(elemArr)), 1);
                     localStorage.setItem('schedule-value', JSON.stringify(filterScheduleArr));
                  }
               })
               countScheduleCheck--;
            }
            notAll(countScheduleCheck, filterSchedule);
         })

      })
   }
   filterScheduleInput();

   // функционал фильтра дополнительно
   const filterAdditionallyInput = () => {
      filterAdditionallyList.forEach(elem => {

         elem.addEventListener('click', () => {
            if (elem.checked == true) {
               filterAdditionallyArr.push(elem.parentNode.getAttribute('data-value'));
               localStorage.setItem('additionally-value', JSON.stringify(filterAdditionallyArr));
               countAdditionallyCheck++;
            } else {
               filterAdditionallyArr.forEach(elemArr => {
                  if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                     filterAdditionallyArr.splice((filterAdditionallyArr.indexOf(elemArr)), 1);
                     localStorage.setItem('additionally-value', JSON.stringify(filterAdditionallyArr));
                  }
               })
               countAdditionallyCheck--;
            }
            notAll(countAdditionallyCheck, filterAdditionally);
         })

      })
   }
   filterAdditionallyInput();

   // функционал фильтра гражданство
   const filterCitizenshipInput = () => {
      filterCitizenshipList.forEach(elem => {

         elem.addEventListener('click', () => {
            if (elem.checked == true) {
               filterCitizenshipArr.push(elem.parentNode.getAttribute('data-value'));
               localStorage.setItem('citizenship-value', JSON.stringify(filterCitizenshipArr));
               countCitizenshipCheck++;
            } else {
               filterCitizenshipArr.forEach(elemArr => {
                  if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                     filterCitizenshipArr.splice((filterCitizenshipArr.indexOf(elemArr)), 1);
                     localStorage.setItem('citizenship-value', JSON.stringify(filterCitizenshipArr));
                  }
               })
               countCitizenshipCheck--;
            }
            notAll(countCitizenshipCheck, filterCitizenship);
         })
      })
   }
   filterCitizenshipInput();

   // функционал фильтра разрешение на работу
   const filterPermissionInput = () => {
      filterPermissionList.forEach(elem => {

         elem.addEventListener('click', () => {
            if (elem.checked == true) {
               filterPermissionArr.push(elem.parentNode.getAttribute('data-value'));
               localStorage.setItem('permission-value', JSON.stringify(filterPermissionArr));
               countPermissionCheck++;
            } else {
               filterPermissionArr.forEach(elemArr => {
                  if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                     filterPermissionArr.splice((filterPermissionArr.indexOf(elemArr)), 1);
                     localStorage.setItem('permission-value', JSON.stringify(filterPermissionArr));
                  }
               })
               countPermissionCheck--;
            }
            notAll(countPermissionCheck, filterPermission);
         })
      })
   }
   filterPermissionInput();

   // функционал фильтра водительские права
   const filterDriverLicenseInput = () => {
      filterDriverLicenseList.forEach(elem => {

         elem.addEventListener('click', () => {
            if (elem.checked == true) {
               filterDriverLicenseArr.push(elem.parentNode.getAttribute('data-value'));
               localStorage.setItem('driver__license-value', JSON.stringify(filterDriverLicenseArr));
               countDriverLicenseCheck++;
            } else {
               filterDriverLicenseArr.forEach(elemArr => {
                  if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                     filterDriverLicenseArr.splice((filterDriverLicenseArr.indexOf(elemArr)), 1);
                     localStorage.setItem('driver__license-value', JSON.stringify(filterDriverLicenseArr));
                  }
               })
               countDriverLicenseCheck--;
            }
            notAll(countDriverLicenseCheck, filterDriverLicense);
         })
      })
   }
   filterDriverLicenseInput();

   //добавление маркера если категория не пуста
   const notAll = (count, filter) => {
      if (count > 0) {
         filter.classList.remove('not-all');
         filter.classList.add('not-all');
      } else if (count == 0) {
         filter.classList.remove('not-all');
      }
   };

   // добавление маркера если фильтр языков не пустой
   const notAllLanguades = () => {
      let firstLanguages = document.querySelector('.select-language .header__current');
      if (firstLanguages.getAttribute('data-value') !== '') {
         filterLanguage.classList.add('not-all');
      } else {
         filterLanguage.classList.remove('not-all');
      }
   }

   // ============================================= //
   // проверка активной категории
   const loadCategories = (list) => {
      list.forEach(elem => {
         if (!(this.localStorage.getItem('categories-active'))) {
            list.forEach(elem => {
               if (elem.getAttribute('data-value') == 'all') {
                  elem.classList.add('active');

                  localStorage.setItem('categories-name', elem.querySelector('p').textContent);
                  localStorage.setItem('categories-active', elem.getAttribute('data-value'));

                  localStorage.setItem('specialisation', 'disabled');

                  popupSpecialisationArr.length = 0;
                  localStorage.setItem('specialisation-value', JSON.stringify(popupSpecialisationArr));

                  popupRegionArr.length = 0;
                  localStorage.setItem('region-value', JSON.stringify(popupRegionArr));

                  localStorage.setItem('moving-value', 'all');

                  localStorage.setItem('search-in-all-regions', 'false');

                  localStorage.setItem('salary-from', 'null');

                  localStorage.setItem('salary-up-to', 'null');

                  localStorage.setItem('income-is-indicated', 'false');

                  filterExperienceArr.length = 0;
                  localStorage.setItem('experience-value', JSON.stringify(filterExperienceArr));

                  localStorage.setItem('gender-value', 'all');

                  localStorage.setItem('age-from', 'null');

                  localStorage.setItem('age-up-to', 'null');

                  localStorage.setItem('publication-value', 'all');

                  filterEmploymentArr.length = 0;
                  localStorage.setItem('employment-value', JSON.stringify(filterEmploymentArr));

                  filterScheduleArr.length = 0;
                  localStorage.setItem('schedule-value', JSON.stringify(filterScheduleArr));

                  filterAdditionallyArr.length = 0;
                  localStorage.setItem('additionally-value', JSON.stringify(filterAdditionallyArr));

                  filterCitizenshipArr.length = 0;
                  localStorage.setItem('citizenship-value', JSON.stringify(filterCitizenshipArr));

                  allLanguage.length = 0;
                  localStorage.setItem('languages-value', JSON.stringify(allLanguage));
                  notAllLanguades();

                  filterPermissionArr.length = 0;
                  localStorage.setItem('permission-value', JSON.stringify(filterPermissionArr));

                  filterDriverLicenseArr.length = 0;
                  localStorage.setItem('driver__license-value', JSON.stringify(filterDriverLicenseArr));
               }
            })
         } else if (elem.getAttribute('data-value') == this.localStorage.getItem('categories-active')) {
            elem.classList.add('active');
            filterCategoriesText.textContent = this.localStorage.getItem('categories-name');
         }
      })
   };
   // проверка если есть активная категория то показать фильтр специализации
   const examinationFilterSpecialisation = () => {
      if ((this.localStorage.getItem('specialisation')) == 'disabled') {
         filterSpecialisation.classList.add('disabled');
      } else {
         filterSpecialisation.classList.remove('disabled');
      }
   };
   // проверка если есть активная категория то показывать кнопки
   const examinationBtnPopupCategories = () => {
      if ((this.localStorage.getItem('categories-active')) !== 'all') {
         popupCategoriesBtn.forEach(btn => {
            btn.disabled = false;
            if (btn.classList.contains('search')) {
               btn.disabled = false;
               btn.style.display = 'none';
            } else if (btn.classList.contains('next')) {
               btn.style.display = 'block';
            }
         })
      } else {
         popupCategoriesBtn.forEach(btn => {
            btn.disabled = true;
            if (btn.classList.contains('search')) {
               btn.disabled = false;
               btn.style.display = 'block';
            } else if (btn.classList.contains('next')) {
               btn.style.display = 'none';
            }
         })
      }
   };
   // получение установленных чекбоксов в попап специализация при загрузке
   const examinationCheckboxSpecialisation = () => {
      let category = localStorage.getItem('categories-active')
      $.ajax({
         url: '/local/components/democontent2.pi/new.vacancies/templates/main/ajax.php',
         method: 'POST',
         dataType: 'html',
         data: {
            type: 'subcategories',
            category: category
         },
         success: function (data) {
            $('.popup__specialisation ul').html(data)
            let specialisationValue = JSON.parse(localStorage.getItem('specialisation-value'))
            popupSpecialisationList = popupSpecialisation.querySelectorAll('input'); // получение списка из попап специализаци

            popupSpecialisationList.forEach(elem => {
               specialisationValue.forEach(elemArr => {
                  if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                     elem.checked = true;

                     let checkboxText = (elem.parentNode.querySelector('p'));
                     let pClone = checkboxText.cloneNode(true);

                     filterSpecialisationList.append(pClone);
                  }
                  if (filterSpecialisationList.querySelectorAll('p').length !== 0) {
                     filterSpecialisation.querySelector('.specialisation__filter-top').classList.add('margin-bottom');
                  }
               })
            })
         },
         error: function (data) {
            console.log(data);
         }
      });
   };
   // получение записанных городов в фильтре регион при загрузке
   const examinationRegionFilter = () => {
      let regionValue = JSON.parse(this.localStorage.getItem('region-value'));
      popupRegionArr = regionValue;

      regionValue.forEach(elem => {
         let regionItem = document.createElement('p');
         regionItem.className = "item";
         regionItem.textContent = elem;

         let removeRegion = document.createElement('p');
         removeRegion.className = "remove";

         regionItem.append(removeRegion);
         filterRegionList.append(regionItem);


         let regionItemPopup = document.createElement('p');
         regionItemPopup.className = "item";
         regionItemPopup.textContent = elem;

         let removeRegionPopup = document.createElement('p');
         removeRegionPopup.className = "remove";

         regionItemPopup.append(removeRegionPopup);
         filterRegionList.append(regionItemPopup);

         if (filterRegionList.querySelectorAll('p.item').length > 0) {
            filterRegion.querySelector('.region__filter-top').classList.add('margin-bottom');
         }

         popupRegionValue.append(regionItemPopup);
      })

      if (this.localStorage.getItem('search-in-all-regions') == 'true') {
         filterRegionCheckbox.checked = true;
         filterRegion.querySelector('.region__filter-top').classList.add('disabled');
         filterRegionList.classList.add('disabled');
      }
   };
   // получение данных в фильтре переезд при загрузке
   const examinationMovingFilter = () => {
      (filterMoving.querySelectorAll('.moving__filter-list input')).forEach(elem => {
         if (this.localStorage.getItem('moving-value') == elem.parentNode.getAttribute('data-value')) {
            elem.checked = true;
            filterMoving.classList.add('not-all');
         }
      })
   };
   // получение данных в фильтре зарплата при перезагрузке
   const examinationSalaryFilter = () => {

      if (this.localStorage.getItem('salary-from') !== 'null') {
         filterSalaryInputFrom.value = this.localStorage.getItem('salary-from');
      }
      if (this.localStorage.getItem('salary-up-to') !== 'null') {
         filterSalaryInputUpTo.value = this.localStorage.getItem('salary-up-to');
      }
      if (this.localStorage.getItem('income-is-indicated') == 'true') {
         filterSalaryCheckbox.checked = true;
      }
   };
   // получение данных в фильтре возраст при перезагрузке
   const examinationAgeFilter = () => {
      if (this.localStorage.getItem('age-from') !== 'null') {
         filterAgeInputFrom.value = this.localStorage.getItem('age-from');
      }
      if (this.localStorage.getItem('age-up-to') !== 'null') {
         filterAgeInputUpTo.value = this.localStorage.getItem('age-up-to');
      }
   };
   // получение данных в фильтре опыт работы при загрузке
   const examinationExperienceFilter = () => {
      filterExperienceArr = JSON.parse(this.localStorage.getItem('experience-value'));

      filterExperienceList.forEach(elem => {
         filterExperienceArr.forEach(elemArr => {
            if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
               elem.checked = true;
               countExperienceCheck++;
            }
         })
      })
      notAll(countExperienceCheck, filterExperience);
   };
   // получение данных в фильтре пол при загрузке
   const examinationGenderFilter = () => {
      (filterGender.querySelectorAll('.gender__filter-list input')).forEach(elem => {
         if (this.localStorage.getItem('gender-value') == elem.parentNode.getAttribute('data-value')) {
            elem.checked = true;
            filterGender.classList.add('not-all');
         }
      })
   };
   // получение данных в фильтр время публикации при загрузке
   const examinationPublicationFilter = () => {
      (filterPublication.querySelectorAll('.publication__filter-list input')).forEach(elem => {
         if (this.localStorage.getItem('publication-value') == elem.parentNode.getAttribute('data-value')) {
            elem.checked = true;
            filterPublication.classList.add('not-all');
         }
      })
   };
   // получение данных в фильтр тип занятости при загрузке
   const examinationEmploymentFilter = () => {
      filterEmploymentArr = JSON.parse(this.localStorage.getItem('employment-value'));

      filterEmploymentList.forEach(elem => {
         filterEmploymentArr.forEach(elemArr => {
            if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
               elem.checked = true;
               countEmploymentCheck++;
            }
         })
      })
      notAll(countEmploymentCheck, filterEmployment);
   };
   // получение данных в фильтр график работы при загрузке
   const examinationScheduleFilter = () => {
      filterScheduleArr = JSON.parse(this.localStorage.getItem('schedule-value'));

      filterScheduleList.forEach(elem => {
         filterScheduleArr.forEach(elemArr => {
            if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
               elem.checked = true;
               countScheduleCheck++;
            }
         })
      })
      notAll(countScheduleCheck, filterSchedule);
   };
   // получение данных в фильтр дополнительно при загрузке
   const examinationAdditionallyFilter = () => {
      filterAdditionallyArr = JSON.parse(this.localStorage.getItem('additionally-value'));

      filterAdditionallyList.forEach(elem => {
         filterAdditionallyArr.forEach(elemArr => {
            if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
               elem.checked = true;
               countAdditionallyCheck++;
            }
         })
      })
      notAll(countAdditionallyCheck, filterAdditionally);
   };
   // получение данных в фильтр гражданство при загрузке
   const examinationCitizenshipFilter = () => {
      if (localStorage.getItem('citizenship-value') != undefined) {
         filterCitizenshipArr = JSON.parse(this.localStorage.getItem('citizenship-value'));

         filterCitizenshipList.forEach(elem => {
            filterCitizenshipArr.forEach(elemArr => {
               if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                  elem.checked = true;
                  countCitizenshipCheck++;
               }
            })
         })
         notAll(countCitizenshipCheck, filterCitizenship);
      }
   };
   // получение данных в фильтр разрешение на работу при загрузке
   const examinationPermissionFilter = () => {
      if (localStorage.getItem('driver__license-value')) {
         filterPermissionArr = JSON.parse(this.localStorage.getItem('driver__license-value'));

         filterPermissionList.forEach(elem => {
            filterPermissionArr.forEach(elemArr => {
               if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                  elem.checked = true;
                  countPermissionCheck++
               }
            })
         })
         notAll(countPermissionCheck, filterPermission);
      }
   };
   // получение данных в фильтр водительские права при загрузке
   const examinationDriverLicenseFilter = () => {
      if (localStorage.getItem('driver__license-value')) {
         filterDriverLicenseArr = JSON.parse(this.localStorage.getItem('driver__license-value'));

         filterDriverLicenseList.forEach(elem => {
            filterDriverLicenseArr.forEach(elemArr => {
               if (elemArr == (elem.parentNode.getAttribute('data-value'))) {
                  elem.checked = true;
                  countDriverLicenseCheck++;
               }
            })
         })
         notAll(countDriverLicenseCheck, filterDriverLicense);
      }
   };
   // получение данных в фильтр языки при перезагрузке страници
   const examinationLanguagesFilter = () => {
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

            for (index = 1; index < allLanguage.length; ++index) {
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

         if (filterLanguage.querySelectorAll('.languages').length !== filterLanguage.querySelector('.languages').querySelectorAll('.select-language .body__item').length) {
            filterLanguage.querySelector('.add-language').classList.add('dont-click');
         } else {
            filterLanguage.querySelector('.add-language').style.display = 'none'
            filterLanguage.querySelector('.add-language').classList.add('dont-click');
         }
         filterLanguage.querySelectorAll('.select-categories .header__current').forEach(elem => {
            if (elem.getAttribute('data-value') !== '') {
               elem.closest('.select-categories').classList.remove('dont-click')
               filterLanguage.querySelector('.add-language').classList.remove('dont-click');
            }
         })
         filterLanguage.querySelectorAll('.select-language .header__current').forEach(elem => {
            if (elem.getAttribute('data-value') !== '') {
               filterLanguage.querySelector('.add-language').classList.remove('dont-click');
            }
         })

         notAllLanguades();
      }
   };

   // ============================================= //
   // получение данных из localStorage при загрузки страницы
   window.addEventListener("load", function load() {
      loadCategories(categoriesSliderItems);
      loadCategories(popupCategoriesList);
      examinationFilterSpecialisation();
      examinationBtnPopupCategories();
      examinationCheckboxSpecialisation();
      examinationRegionFilter();
      examinationMovingFilter();
      examinationSalaryFilter();
      examinationExperienceFilter();
      examinationGenderFilter();
      examinationPublicationFilter();
      examinationEmploymentFilter();
      examinationScheduleFilter();
      examinationAdditionallyFilter();
      examinationCitizenshipFilter();
      examinationPermissionFilter();
      examinationDriverLicenseFilter();
      examinationAgeFilter();
      examinationLanguagesFilter();
   }, false);


   // ============================================= //
   // клики на странице
   body.addEventListener('click', (event) => {
      let target = event.target

      // нажатие на кнопку фильтры при ширине экрана меньше 990px
      if (target.closest('.filter__show')) {
         filterPanel.classList.toggle('fixed-desktop');
         filterShowBtn.classList.toggle('active');
         filterBackground.classList.toggle('active');
         html.classList.toggle('lock');
      }
      if (target.closest('.filter__background')) {
         filterPanel.classList.remove('fixed-desktop');
         filterShowBtn.classList.remove('active');
         filterBackground.classList.remove('active');
         html.classList.remove('lock');
      }

      // нажатие на фон попапов
      if (target == popup) {
         if (filterPanel.classList.contains('fixed-desktop')) {
            popup.classList.remove('active');
            popupCategories.classList.remove('active');
            popupSpecialisation.classList.remove('active');
            popupRegion.classList.remove('active');
         } else {
            html.classList.remove('lock');
            popup.classList.remove('active');
            popupCategories.classList.remove('active');
            popupSpecialisation.classList.remove('active');
            popupRegion.classList.remove('active');
         }
      }

      // закрытие попапов при нажатии на крестик
      if (target.classList.contains('close-popup')) {
         if (filterPanel.classList.contains('fixed-desktop')) {
            target.parentNode.classList.remove('active');
            popup.classList.remove('active');
         } else {
            target.parentNode.classList.remove('active');
            html.classList.remove('lock');
            popup.classList.remove('active');
         }
      }

      // нажатие на фильтр категории
      if (target.closest('.categories__filter')) {
         html.classList.add('lock');
         popup.classList.add('active');
         popupCategories.classList.add('active');
      }

      // нажатие на кнопки в попап категории
      if (target.closest('.popup__categories-btn')) {
         if (target.classList.contains('clear')) {
            const clearPopupCategories = (list) => {
               list.forEach(elem => {
                  if (elem.getAttribute('data-value') == 'all') {
                     list.forEach(elem => {
                        elem.classList.remove('active')
                     })
                     elem.classList.add('active');
                     localStorage.setItem('categories-name', elem.querySelector('p').textContent);
                     localStorage.setItem('categories-active', elem.getAttribute('data-value'));
                     localStorage.setItem('specialisation', 'disabled');
                  }
               })
            };
            clearPopupCategories(popupCategoriesList);
            clearPopupCategories(categoriesSliderItems);
            examinationBtnPopupCategories();
            examinationFilterSpecialisation();
            filterCategoriesText.textContent = this.localStorage.getItem('categories-name');
            popupSpecialisationArr.length = 0;
            localStorage.setItem('specialisation-value', JSON.stringify(popupSpecialisationArr));

            html.classList.remove('lock');
            popup.classList.remove('active');
            popupCategories.classList.remove('active');
         }
         if (target.classList.contains('next')) {
            popupCategories.classList.remove('active');
            popupSpecialisation.classList.add('active');
            popupSpecialisationActive.textContent = this.localStorage.getItem('categories-name');
         }
      }

      // нажатие на фильтр специализация
      if (target.closest('.specialisation__filter')) {
         html.classList.add('lock');
         popup.classList.add('active');
         popupSpecialisation.classList.add('active');
         popupSpecialisationActive.textContent = this.localStorage.getItem('categories-name');
      }

      // нажатие на элементы в попапе специализации
      if (target.closest('.popup__specialisation')) {
         if (target.tagName == 'INPUT') {
            let checkboxText = (target.parentNode.querySelector('p'));
            let pClone = checkboxText.cloneNode(true);

            if (target.checked == true) {
               popupSpecialisationArr.push(target.parentNode.getAttribute('data-value'));
               localStorage.setItem('specialisation-value', JSON.stringify(popupSpecialisationArr));
               filterSpecialisationList.append(pClone);
               filterSpecialisation.querySelector('.specialisation__filter-top').classList.add('margin-bottom');
            } else {
               popupSpecialisationArr.forEach(elemArr => {
                  if (elemArr == (target.parentNode.getAttribute('data-value'))) {
                     popupSpecialisationArr.splice((popupSpecialisationArr.indexOf(elemArr)), 1);
                     localStorage.setItem('specialisation-value', JSON.stringify(popupSpecialisationArr));
                  }
               })
               filterSpecialisationList.querySelectorAll('p').forEach(target => {
                  if (checkboxText.textContent == target.textContent) {
                     target.remove();
                     if (filterSpecialisationList.querySelectorAll('p').length == 0) {
                        filterSpecialisation.querySelector('.specialisation__filter-top').classList.remove('margin-bottom');
                     }
                  }
               })
            }
         }
      }

      // нажатие на стрелку в попап специализация
      if (target.closest('.popup__specialisation') && target.classList.contains('btn-back')) {
         popupSpecialisation.classList.remove('active');
         popupCategories.classList.add('active');
      }

      // нажатие на кнопки в попап специализация
      if (target.closest('.popup__specialisation-btn')) {

         if (target.classList.contains('clear')) {
            popupSpecialisationList = popupSpecialisation.querySelectorAll('input');
            popupSpecialisationList.forEach(elem => {
               elem.checked = false;
            })
            popupSpecialisationList = [];
            popupSpecialisationArr = [];
            localStorage.setItem('specialisation-value', JSON.stringify(popupSpecialisationArr));
            (filterSpecialisationList.querySelectorAll('p')).forEach(elem => {
               elem.remove();
            })
            html.classList.remove('lock');
            popup.classList.remove('active');
            popupSpecialisation.classList.remove('active');
            filterSpecialisation.querySelector('.specialisation__filter-top').classList.remove('margin-bottom');
         }
         if (target.classList.contains('search')) {
            html.classList.remove('lock');
            popup.classList.remove('active')
            popupCategories.classList.remove('active');
            popupSpecialisation.classList.remove('active');
         }
      }

      // нажатие на фильтр регион
      if (target.closest('.region__filter-top')) {
         popup.classList.add('active');
         popupRegion.classList.add('active');
      }

      // установка чекбокса под фильтром регион
      if (target == filterRegionCheckbox) {
         if (filterRegionCheckbox.checked == true) {
            filterRegion.querySelector('.region__filter-top').classList.add('disabled');
            filterRegionList.classList.add('disabled');
            localStorage.setItem('search-in-all-regions', 'true');
         } else {
            filterRegion.querySelector('.region__filter-top').classList.remove('disabled');
            filterRegionList.classList.remove('disabled');
            localStorage.setItem('search-in-all-regions', 'false');
         }
      }

      // удаление региона при нажатии на крестик
      if (target.classList.contains('remove')) {
         (target.parentNode).remove();

         const regionListItemRemove = (regionList) => {
            regionList.querySelectorAll('.item').forEach(elem => {
               if (target.parentNode.textContent == elem.textContent) {
                  elem.remove();
               }

               if (filterRegionList.querySelectorAll('p.item').length == 0) {
                  filterRegion.querySelector('.region__filter-top').classList.remove('margin-bottom');
               }
            })
         }
         regionListItemRemove(filterRegionList);
         regionListItemRemove(popupRegionValue);
         popupRegionArr.forEach(elemArr => {
            if (elemArr == target.parentNode.textContent) {
               popupRegionArr.splice((popupRegionArr.indexOf(elemArr)), 1);
               localStorage.setItem('region-value', JSON.stringify(popupRegionArr));
            }
         })
      }

      // нажатие на кнопки в попап регион
      if (target.closest('.popup__region-btn')) {
         if (target.classList.contains('clear')) {
            popupRegionArr.length = 0;
            localStorage.setItem('region-value', JSON.stringify(popupRegionArr));
            (filterRegionList.querySelectorAll('p')).forEach(elem => {
               elem.remove();
            });
            (popupRegionValue.querySelectorAll('p')).forEach(elem => {
               elem.remove();
            })
            html.classList.remove('lock');
            popup.classList.remove('active');
            popupRegion.classList.remove('active');

            if (filterRegionList.querySelectorAll('p.item').length == 0) {
               filterRegion.querySelector('.region__filter-top').classList.remove('margin-bottom');
            }
         }
         if (target.classList.contains('search')) {
            html.classList.remove('lock');
            popup.classList.remove('active');
            popupRegion.classList.remove('active');
         }
      }

      // нажатие на фильтр переезд
      if (target.closest('.moving__filter-top')) {
         filterMoving.classList.toggle('active')
      }

      // нажатие на элемент в фильтре переезд
      if (target.closest('.moving__filter-list .item')) {
         if (target.tagName == 'INPUT') {
            (filterMoving.querySelectorAll('.moving__filter-list input')).forEach(elem => {
               elem.checked = false;
            });
            target.checked = true;
            localStorage.setItem('moving-value', target.parentNode.getAttribute('data-value'));
            filterMoving.classList.add('not-all');
         }
      }

      // нажатие на фильтр опыт работы
      if (target.closest('.experience__filter-top')) {
         filterExperience.classList.toggle('active')
      }

      // нажатие на фильтр пол
      if (target.closest('.gender__filter-top')) {
         filterGender.classList.toggle('active')
      }

      // нажатие на элемент в фильтре пол
      if (target.closest('.gender__filter-list .item')) {
         if (target.tagName == 'INPUT') {
            (filterGender.querySelectorAll('.gender__filter-list input')).forEach(elem => {
               elem.checked = false;
            });
            target.checked = true;
            localStorage.setItem('gender-value', target.parentNode.getAttribute('data-value'));
            filterGender.classList.add('not-all');
         }
      }

      // нажатие на фильтр публикация 
      if (target.closest('.publication__filter-top')) {
         filterPublication.classList.toggle('active')
      }

      // нажатие на элемент в фильтре публикации
      if (target.closest('.publication__filter-list .item')) {
         if (target.tagName == 'INPUT') {
            (filterPublication.querySelectorAll('.publication__filter-list input')).forEach(elem => {
               elem.checked = false;
            });
            target.checked = true;
            localStorage.setItem('publication-value', target.parentNode.getAttribute('data-value'));
            filterPublication.classList.add('not-all');
         }
      }

      // нажатие на кнопку больше фильтров
      if (target.closest('.more__filter-btn')) {
         const moreFilter = document.querySelector('.all__filter .more__filter')
         moreFilter.classList.toggle('active');
         if (moreFilter.classList.contains('active')) {
            target.textContent = "Меньше фильтров"
         } else {
            target.textContent = "Больше фильтров"
         }
      }

      // нажатие на фильтр тип занятости
      if (target.closest('.employment__filter-top')) {
         filterEmployment.classList.toggle('active')
      }

      // нажатие на фильтр график работы
      if (target.closest('.schedule__filter-top')) {
         filterSchedule.classList.toggle('active')
      }

      // нажатие на фильтр график работы
      if (target.closest('.additionally__filter-top')) {
         filterAdditionally.classList.toggle('active')
      }

      // нажатие на фильтр гражданство
      if (target.closest('.citizenship__filter-top')) {
         filterCitizenship.classList.toggle('active')
      }

      // нажатие на фильтр знание языков
      if (target.closest('.language__filter-top')) {
         filterLanguage.classList.toggle('active');
         filterLanguage.querySelectorAll('.select-categories .header__current').forEach(elem => {
            if (elem.getAttribute('data-value') !== '') {
               console.log('elem: ', elem);
               elem.closest('.select-categories').classList.remove('dont-click')
            }
         })
      }
      // нажатие на селект языка в фильтре знание языков
      if (target.closest('.select-language')) {
         if (target.closest('.select-language').querySelector('.body').classList.contains('active')) {
            target.closest('.select-language').querySelector('.body').classList.remove('active');
         } else {
            document.querySelectorAll('.language__filter-list .body.active').forEach(list => {
               list.classList.remove('active')
            })
            target.closest('.select-language').querySelector('.body').classList.add('active');
         }

         // скрывать значения которые уже выбранны
         let languageItems = document.querySelectorAll('.language__filter-list .select-language .body__item')
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
      } else {
         document.querySelectorAll('.language__filter-list .body.active').forEach(list => {
            list.classList.remove('active')
         })
      }
      // нажатие на селект категории в фильтре знание языков
      if (target.closest('.select-categories')) {
         if (target.closest('.select-categories').querySelector('.body').classList.contains('active')) {
            target.closest('.select-categories').querySelector('.body').classList.remove('active');
         } else {
            document.querySelectorAll('.language__filter-list .body.active').forEach(list => {
               list.classList.remove('active')
            })
            target.closest('.select-categories').querySelector('.body').classList.add('active');
         }
      }
      // нажатие на элемент селекта в фильтре знание языков
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


            if (filterLanguage.querySelectorAll('.languages').length !== target.closest('.body').querySelectorAll('.body__item').length) {
               filterLanguage.querySelector('.add-language').classList.remove('dont-click');
            } else {
               filterLanguage.querySelector('.add-language').classList.add('dont-click');
               filterLanguage.querySelector('.add-language').style.display = 'none'
            }

            notAllLanguades();
         }
         // нажатие на элементы списка с уровнем
         if (target.closest('.select-categories')) {
            LanguageCategoriesArr = target.getAttribute('data-name');
            langValLVL = target.getAttribute('data-value');
            target.closest('.select-categories').querySelector('.body').classList.remove('active');
         }

         // запись значений в localstorage
         let languagesValue = languageArr + ':' + LanguageCategoriesArr + ';' + langValID + ':' + langValLVL;
         allLanguage[target.closest('.languages').getAttribute('data-count')] = [languagesValue];
         localStorage.setItem('languages-value', JSON.stringify(allLanguage));
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

         filterLanguage.querySelector('.add-language').classList.add('dont-click');
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

         let lastItem = filterLanguage.querySelectorAll('.languages')[filterLanguage.querySelectorAll('.languages').length - 1]
         if (lastItem.querySelector('.select-language .header__current').getAttribute('data-value') != '') {
            filterLanguage.querySelector('.add-language').style.display = 'block'
            filterLanguage.querySelector('.add-language').classList.remove('dont-click');
         } else {
            filterLanguage.querySelector('.add-language').style.display = 'block'
            filterLanguage.querySelector('.add-language').classList.add('dont-click');
         }

         // if (filterLanguage.querySelectorAll('.languages').length !== target.closest('.languages').querySelectorAll('.select-language .body__item').length) {
         //    filterLanguage.querySelector('.add-language').style.display = 'block'
         //    filterLanguage.querySelector('.add-language').classList.add('dont-click');
         // } else {
         //    filterLanguage.querySelector('.add-language').classList.remove('dont-click');
         // }
      }
      // нажатие кнопки сбросить под выбором языка
      if (target.classList.contains('clear-language')) {
         target.parentNode.querySelector('.select-language .header__current').textContent = 'Выберите язык';
         target.parentNode.querySelector('.select-language .header__current').setAttribute('data-name', '');
         target.parentNode.querySelector('.select-language .header__current').setAttribute('data-value', '');
         target.parentNode.querySelector('.select-categories .header__current').textContent = 'Выберите уровень';
         target.parentNode.querySelector('.select-categories .header__current').setAttribute('data-name', '');
         target.parentNode.querySelector('.select-categories .header__current').setAttribute('data-value', '');
         let languagesList = target.parentNode.querySelectorAll('.body__item');
         languagesList.forEach(elem => {
            elem.classList.remove('hide');
         })
         allLanguage.length = 0;
         localStorage.setItem('languages-value', JSON.stringify(allLanguage));

         target.parentNode.querySelector('.select-categories').classList.add('dont-click');
         filterLanguage.querySelector('.add-language').classList.add('dont-click');

         if (filterLanguage.querySelectorAll('.languages').length !== target.closest('.languages').querySelectorAll('.select-language .body__item').length) {
            target.parentNode.querySelector('.select-categories').classList.add('dont-click');
            filterLanguage.querySelector('.add-language').classList.add('dont-click');
         }
         notAllLanguades();
      }


      // нажатие на фильтр разрешение на работу
      if (target.closest('.permission__filter-top')) {
         filterPermission.classList.toggle('active')
      }

      // нажатие на фильтр водительские права
      if (target.closest('.driver-license__filter-top')) {
         filterDriverLicense.classList.toggle('active')
      }

      // нажатие на кнопку применить на панели фильтров
      if (target.closest('.filter .all__filter-btn .apply')) {
         filterPanel.classList.remove('fixed-desktop');
         filterShowBtn.classList.remove('active');
         filterBackground.classList.remove('active');
         html.classList.remove('lock-bg');
      }

      // нажатие на кнопку сбросить все фильтры
      if (target.closest('.all__filter-btn') && target.classList.contains('clear')) {
         const clearCategories = (list) => {
            list.forEach(elem => {
               if (elem.getAttribute('data-value') == 'all') {
                  list.forEach(elem => {
                     elem.classList.remove('active')
                  })
                  elem.classList.add('active');
                  filterCategoriesText.textContent = this.localStorage.getItem('categories-name');

                  localStorage.setItem('categories-name', elem.querySelector('p').textContent);
                  localStorage.setItem('categories-active', elem.getAttribute('data-value'));

                  localStorage.setItem('specialisation', 'disabled');

                  popupSpecialisationArr.length = 0;
                  localStorage.setItem('specialisation-value', JSON.stringify(popupSpecialisationArr));

                  popupRegionArr.length = 0;
                  localStorage.setItem('region-value', JSON.stringify(popupRegionArr));

                  localStorage.setItem('moving-value', 'all');

                  localStorage.setItem('salary-from', 'null');

                  localStorage.setItem('salary-up-to', 'null');

                  localStorage.setItem('income-is-indicated', 'false');

                  filterExperienceArr.length = 0;
                  localStorage.setItem('experience-value', JSON.stringify(filterExperienceArr));

                  localStorage.setItem('gender-value', 'all');

                  localStorage.setItem('age-from', 'null');

                  localStorage.setItem('age-up-to', 'null');

                  localStorage.setItem('publication-value', 'all');

                  filterEmploymentArr.length = 0;
                  localStorage.setItem('employment-value', JSON.stringify(filterEmploymentArr));

                  filterScheduleArr.length = 0;
                  localStorage.setItem('schedule-value', JSON.stringify(filterScheduleArr));

                  filterAdditionallyArr.length = 0;
                  localStorage.setItem('additionally-value', JSON.stringify(filterAdditionallyArr));

                  filterCitizenshipArr.length = 0;
                  localStorage.setItem('citizenship-value', JSON.stringify(filterCitizenshipArr));

                  allLanguage.length = 0;
                  localStorage.setItem('languages-value', JSON.stringify(allLanguage));

                  filterPermissionArr.length = 0;
                  localStorage.setItem('permission-value', JSON.stringify(filterPermissionArr));

                  filterDriverLicenseArr.length = 0;
                  localStorage.setItem('driver__license-value', JSON.stringify(filterDriverLicenseArr));
               }
            })
         };
         clearCategories(categoriesSliderItems);
         clearCategories(popupCategoriesList);
         examinationFilterSpecialisation();
         examinationBtnPopupCategories();
         examinationCheckboxSpecialisation();
         examinationRegionFilter();
         examinationMovingFilter();
         examinationSalaryFilter();
         examinationExperienceFilter();
         examinationGenderFilter();
         examinationPublicationFilter();
         examinationEmploymentFilter();
         examinationScheduleFilter();
         examinationAdditionallyFilter();
         examinationCitizenshipFilter();
         examinationPermissionFilter();
         examinationDriverLicenseFilter();
         examinationAgeFilter();
         examinationLanguagesFilter();
         filterPanel.classList.remove('fixed-desktop');
         filterShowBtn.classList.remove('active');
         filterBackground.classList.remove('active');
         html.classList.remove('lock-bg');
         location.reload();
      }
   });
});
