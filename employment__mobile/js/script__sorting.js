document.addEventListener("DOMContentLoaded", () => {
   // нажатие на ссылки сортировки
   function clickSortingLink() {
      let sortingLink = document.querySelectorAll('.sorting__wrapper .left p'),
         viewSorting = document.querySelector('.sorting__wrapper .right .sorting__select');

      // нажатие на элементы сортировки вакансий 
      sortingLink.forEach(elem => {
         elem.addEventListener('click', () => {
            sortingLink.forEach(elem => {
               elem.classList.remove('active');
            });
            elem.classList.add('active');

            localStorage.setItem('summary-categories-view', elem.getAttribute('data-value'));

            if (elem.classList.contains('active') && (elem.classList.contains('hot') || elem.classList.contains('new'))) {
               viewSorting.classList.add('hide');
            } else if (elem.classList.contains('active') && elem.classList.contains('all')) {
               viewSorting.classList.remove('hide');
            }
         });
      });

      // получение данных при перезагрузке страници
      function viewSummaryCategories() {
         if (localStorage.getItem('summary-categories-view') == 'all') {
            sortingLink.forEach(elem => {
               if (elem.classList.contains('all')) {
                  sortingLink.forEach(elem => {
                     elem.classList.remove('active');
                  })
                  elem.classList.add('active');
                  viewSorting.classList.remove('hide');
               }
            })
         } else if (localStorage.getItem('summary-categories-view') == 'new') {
            sortingLink.forEach(elem => {
               if (elem.classList.contains('new')) {
                  sortingLink.forEach(elem => {
                     elem.classList.remove('active');
                  })
                  elem.classList.add('active');
               }
            })
            // document.querySelector('.view__left p .new').classList.add('active')
            // console.log(document.querySelector('.view__left p .new'));
         } else if (localStorage.getItem('summary-categories-view') == 'hot') {
            sortingLink.forEach(elem => {
               if (elem.classList.contains('hot')) {
                  sortingLink.forEach(elem => {
                     elem.classList.remove('active');
                  })
                  elem.classList.add('active');
               }
            })
         }
      };
      window.addEventListener("load", function load() {
         viewSummaryCategories();
      }, false);

   };
   clickSortingLink();

   // нажатие на элементы всплывающего модального окна
   function clickSelectSorting() {
      let html = document.querySelector('html'),
         body = document.querySelector('body'),
         background = document.querySelector('.background'),
         selectCurrent = document.querySelector('.sorting .select__current'),
         sortingBody = document.querySelector('.sorting .select__body');

      // нажитие на элементы выпадающего меню сортировки
      document.addEventListener('click', (event) => {
         let target = event.target;
         if (target.classList.contains('select__item') && target.closest('.sorting__select .select__body')) {
            let scrollY = window.scrollY;
            localStorage.setItem('summary-view-sorting', target.getAttribute('data-value'));
            selectCurrent.textContent = target.textContent;
            selectCurrent.setAttribute('data-value', target.getAttribute('data-value'));

            (target.closest('.select__body').querySelectorAll('.select__item')).forEach(item => {
               item.classList.remove('active');
            });
            target.classList.add('active');

            // при нажатии закрывать окно
            sortingBody.classList.remove('active');
            background.classList.remove('active');
            setTimeout(() => {
               html.style.height = 'auto';
               body.style.height = 'auto';
               body.style.overflow = 'auto';
               body.style.position = 'relative';
               body.style.top = `0px`;
               window.scrollTo(0, scrollY);
            }, 200);
         }
      })

      // получение значение меню сортировки при перезагрузке
      function viewSummarySort() {
         let selectSortingItems = document.querySelectorAll('.sorting .select__body .select__item');

         function loadValue(value) {
            if (localStorage.getItem('summary-view-sorting') == value) {
               selectSortingItems.forEach(item => {
                  if (item.getAttribute('data-value') == value) {
                     selectSortingItems.forEach(item => {
                        item.classList.remove('active');
                     })
                     item.classList.add('active');
                     selectCurrent.textContent = item.textContent;
                     selectCurrent.setAttribute('data-value', item.getAttribute('data-value'));
                  }
               })
            }
         }
         loadValue('by_matching');
         loadValue('descending_salaries');
         loadValue('ascending_salaries');
         loadValue('by_date_of_change');

      };
      window.addEventListener("load", function load() {
         viewSummarySort();
      }, false);

   };
   clickSelectSorting();
});