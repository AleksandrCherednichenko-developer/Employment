document.addEventListener("DOMContentLoaded", () => {
   // слайдер категорий
   const slider = () => {
      $('.categories__slider').slick({
         arrows: true,
         dots: false,
         autoplay: false,
         infinite: false,
         slidesToScroll: 6,
         slidesToShow: 6,
         responsive: [
            {
               breakpoint: 1100,
               settings: {
                  slidesToScroll: 5,
                  slidesToShow: 5,
               }
            },
            {
               breakpoint: 850,
               settings: {
                  slidesToScroll: 4,
                  slidesToShow: 4,
               }
            },
         ]
      });
   }
   slider();

   // slider for image item
   const slideImage = () => {
      $('.summary__content-left .item .item__image').each(function () {

         $(this).click(function (event) {
            event.preventDefault();
         })

         const img = $(this).find('img');
         if (img.length > 1) {
            $(this).slick({
               arrows: false,
               dots: true,
               autoplay: false,
               infinite: false,
               slidesToScroll: 1,
               slidesToShow: 1,
               touchThreshold: 30,
            });
         }
      })
   };
   slideImage();

   // прелодер объявлений
   const loadItems = () => {
      const summaryItem = document.querySelector('.summary__content-left')
      const items = summaryItem.querySelector('.items');
      const itemsLoad = document.querySelector('.items__load');

      itemsLoad.style.display = 'grid';
      items.style.display = 'none';

      function closeLoadItem() {
         itemsLoad.style.display = 'none';
         items.style.display = 'grid';
      }
      setTimeout(closeLoadItem, 1000);
   };
   loadItems();

   // Переключение категории Вакансий
   const viewShow = () => {

      const viewShowItem = document.querySelectorAll('.view__left p');
      const viewSorting = document.querySelector('.view__right .sorting');

      viewShowItem.forEach(elem => {
         elem.addEventListener('click', () => {
            viewShowItem.forEach(elem => {
               elem.classList.remove('active');
            });
            elem.classList.add('active');

            localStorage.setItem('summary-categories-view', elem.getAttribute('data-value'));

            if (elem.classList.contains('active') && (elem.classList.contains('hot') || elem.classList.contains('new'))) {
               viewSorting.classList.add('disabled');
            } else if (elem.classList.contains('active') && elem.classList.contains('all')) {
               viewSorting.classList.remove('disabled');
            }
         });
      });

   };
   viewShow();

   // select menu
   const selectMenu = () => {

      const selectView = document.querySelector('.view .sorting .select');
      const selectCurrent = selectView.querySelector('.select__current');
      const slectItem = selectView.querySelectorAll('.select__item');

      selectView.addEventListener('click', (event) => {
         let target = event.target
         selectView.classList.toggle('active');

         if (target.classList.contains('select__item')) {
            slectItem.forEach(item => {
               item.classList.remove('active')
            })
            target.classList.add('active');

            localStorage.setItem('summary-view-sorting', target.getAttribute('data-value'));

            selectCurrent.textContent = target.textContent;
            selectCurrent.setAttribute('data-value', target.getAttribute('data-value'));
         }
      })

      document.addEventListener('click', (event) => {
         let target = event.target
         if (!(target.classList.contains('select__item') || target.classList.contains('select__header') || target.classList.contains('select__current'))) {
            selectView.classList.remove('active');
         }
      })

   };
   selectMenu();

   // swicher
   const swicher = () => {

      const swicher = document.querySelector('.view__right .switch'),
         swicherItem = swicher.querySelectorAll('.view__right .switch-item'),
         swicherSlide = swicher.querySelector('.view__right .switch-slide'),
         summaryContentMap = document.querySelector('.summary__content-left .main__map'),
         summaryContentItems = document.querySelector('.summary__content-left .items'),
         summaryContentItemsLoad = document.querySelector('.summary__content-left .items__load');

      swicherItem.forEach(elem => {
         elem.addEventListener('click', () => {
            swicherItem.forEach(elem => {
               elem.classList.remove('active');
            })
            elem.classList.add('active');
            swicherSlide.style.left = `${elem.offsetLeft}px`;

            if (elem.classList.contains('collumn')) {
               summaryContentMap.classList.remove('active');
               summaryContentItems.classList = 'items collumn';
               summaryContentItemsLoad.classList = 'items__load collumn';
               loadItems();
            } else if (elem.classList.contains('row')) {
               summaryContentMap.classList.remove('active');
               summaryContentItems.classList = 'items row';
               summaryContentItemsLoad.classList = 'items__load row';
               loadItems();
            } else if (elem.classList.contains('map')) {
               summaryContentMap.classList.add('active');
               summaryContentItems.classList = 'items row';
               summaryContentItemsLoad.classList = 'items__load row';
               loadItems();
            }

            localStorage.setItem('summary-view-switch', elem.getAttribute('data-value'));
         })
      })

   };
   swicher();

   // добавление коментария к карточки резюме
   const addComment = () => {

      const summaryContentLeft = document.querySelector('.summary__content-left');
      summaryContentLeft.addEventListener('click', (event) => {
         let target = event.target;

         if (target.closest('.comment') && target.closest('.item')) {
            let commentText = target.closest('.comment').querySelector('.comment__text'),
               commentBtn = target.closest('.comment').querySelector('.comment__btn'),
               commentBtnSave = target.closest('.comment').querySelector('.comment__btn-save'),
               commentBtnClear = target.closest('.comment').querySelector('.comment__btn-clear');

            event.preventDefault();
            commentText.onfocus = () => {
               commentText.classList.remove('not-empty');
            };

            commentText.onblur = () => {
               if (commentText.value !== '') {
                  commentText.classList.add('not-empty');
               } else {
                  return;
               }
            };

            if (target == commentBtnClear) {
               commentText.classList.remove('not-empty');
               commentText.value = '';
               event.preventDefault();
            }
         }
      })

   };
   addComment();

   // добавление карточки в избранное
   const itemLike = () => {

      $(document).on('click', '.item .like, .item .like-row', function () {
         let resumeId = $(this).closest('.item').attr('data-id')
         let favId = $(this).attr('data-fav')
         let target = $(this)

         $.ajax({
            url: '/local/components/democontent2.pi/new.vacancies/templates/main/ajax.php',
            method: 'POST',
            dataType: 'html',
            data: {
               userId: userId,
               resumeId: resumeId,
               favId: favId,
               type: 'fav'
            },
            success: function (data) {
               console.log(data);
               target.toggleClass('active')
            },
            error: function (data) {
               console.log(data);
            }
         });
      })

      // const summaryItems = document.querySelectorAll('.summary__content-left .items .item');

      // summaryItems.forEach(item => {
      //    item.addEventListener('click', (event) => {
      //       let target = event.target;

      //       if ((target.parentNode.parentNode).classList.contains('like')) {
      //          (target.parentNode.parentNode).classList.toggle('active');
      //          (target.parentNode.parentNode.parentNode).classList.toggle('active');
      //          ((target.parentNode.parentNode.parentNode).querySelector('.like-row')).classList.toggle('active');
      //       }

      //       if ((target.parentNode.parentNode).classList.contains('like-row')) {
      //          (target.parentNode.parentNode).classList.toggle('active');
      //          (target.parentNode.parentNode.parentNode).classList.toggle('active'); ((target.parentNode.parentNode.parentNode).querySelector('.like')).classList.toggle('active');
      //       }
      //    });
      // })

   };
   itemLike();


   //======================================================================//
   // отображение активной категории Просмотра вакансий при перезагрузке
   const viewSummaryCategories = () => {
      const viewShowItem = document.querySelectorAll('.view__left p');
      const viewSorting = document.querySelector('.view__right .sorting');

      if (this.localStorage.getItem('summary-categories-view') == 'all') {
         viewShowItem.forEach(elem => {
            if (elem.classList.contains('all')) {
               viewShowItem.forEach(elem => {
                  elem.classList.remove('active');
               })
               elem.classList.add('active');
               viewSorting.classList.remove('disabled');
            }
         })
      } else if (this.localStorage.getItem('summary-categories-view') == 'new') {
         viewShowItem.forEach(elem => {
            if (elem.classList.contains('new')) {
               viewShowItem.forEach(elem => {
                  elem.classList.remove('active');
               })
               elem.classList.add('active');
            }
         })
         // document.querySelector('.view__left p .new').classList.add('active')
         // console.log(document.querySelector('.view__left p .new'));
      } else if (this.localStorage.getItem('summary-categories-view') == 'hot') {
         viewShowItem.forEach(elem => {
            if (elem.classList.contains('hot')) {
               viewShowItem.forEach(elem => {
                  elem.classList.remove('active');
               })
               elem.classList.add('active');
            }
         })
      }
   };

   // отображение свитчера Просмотра вакансий при перезагрузке
   const viewSummarySwitch = () => {
      const swicher = document.querySelector('.view__right .switch'),
         swicherItem = swicher.querySelectorAll('.view__right .switch-item'),
         swicherSlide = swicher.querySelector('.view__right .switch-slide'),
         summaryContentMap = document.querySelector('.summary__content-left .main__map'),
         summaryContentItems = document.querySelector('.summary__content-left .items'),
         summaryContentItemsLoad = document.querySelector('.summary__content-left .items__load');

      if (this.localStorage.getItem('summary-view-switch') == 'collumn') {
         swicherItem.forEach(elem => {
            if (elem.classList.contains('collumn')) {
               swicherItem.forEach(elem => {
                  elem.classList.remove('active');
               })
               elem.classList.add('active');
               swicherSlide.style.left = `${elem.offsetLeft}px`;
               summaryContentMap.classList.remove('active');
               summaryContentItems.classList = 'items collumn';
               summaryContentItemsLoad.classList = 'items__load collumn';
            }
         })
      } else if (this.localStorage.getItem('summary-view-switch') == 'row') {
         swicherItem.forEach(elem => {
            if (elem.classList.contains('row')) {
               swicherItem.forEach(elem => {
                  elem.classList.remove('active');
               })
               elem.classList.add('active');
               swicherSlide.style.left = `${elem.offsetLeft}px`;
               summaryContentMap.classList.remove('active');
               summaryContentItems.classList = 'items row';
               summaryContentItemsLoad.classList = 'items__load row';
            }
         })
      } else if (this.localStorage.getItem('summary-view-switch') == 'map') {
         swicherItem.forEach(elem => {
            if (elem.classList.contains('map')) {
               swicherItem.forEach(elem => {
                  elem.classList.remove('active');
               })
               elem.classList.add('active');
               swicherSlide.style.left = `${elem.offsetLeft}px`;
               summaryContentMap.classList.add('active');
               summaryContentItems.classList = 'items row';
               summaryContentItemsLoad.classList = 'items__load row';
            }
         })
      }
   };

   // отображение селекта сортировки вакансий при перезагрузке
   const viewSummarySort = () => {
      const selectSorting = document.querySelector('.summary__content-left .select');
      const selectSortingCurrent = selectSorting.querySelector('.select__current');
      const selectSortingItems = selectSorting.querySelectorAll('.select__item');

      if (this.localStorage.getItem('summary-view-sorting') == 'by_matching') {
         selectSortingItems.forEach(item => {
            if (item.getAttribute('data-value') == 'by_matching') {
               selectSortingItems.forEach(item => {
                  item.classList.remove('active');
               })
               item.classList.add('active');
               selectSortingCurrent.textContent = item.textContent;
               selectSortingCurrent.setAttribute('data-value', item.getAttribute('data-value'));
            }
         })
      } else if (this.localStorage.getItem('summary-view-sorting') == 'descending_salaries') {
         selectSortingItems.forEach(item => {
            if (item.getAttribute('data-value') == 'descending_salaries') {
               selectSortingItems.forEach(item => {
                  item.classList.remove('active');
               })
               item.classList.add('active');
               selectSortingCurrent.textContent = item.textContent;
               selectSortingCurrent.setAttribute('data-value', item.getAttribute('data-value'));
            }
         })
      } else if (this.localStorage.getItem('summary-view-sorting') == 'ascending_salaries') {
         selectSortingItems.forEach(item => {
            if (item.getAttribute('data-value') == 'ascending_salaries') {
               selectSortingItems.forEach(item => {
                  item.classList.remove('active');
               })
               item.classList.add('active');
               selectSortingCurrent.textContent = item.textContent;
               selectSortingCurrent.setAttribute('data-value', item.getAttribute('data-value'));
            }
         })
      } else if (this.localStorage.getItem('summary-view-sorting') == 'by_date_of_change') {
         selectSortingItems.forEach(item => {
            if (item.getAttribute('data-value') == 'by_date_of_change') {
               selectSortingItems.forEach(item => {
                  item.classList.remove('active');
               })
               item.classList.add('active');
               selectSortingCurrent.textContent = item.textContent;
               selectSortingCurrent.setAttribute('data-value', item.getAttribute('data-value'));
            }
         })
      }
   };

   //======================================================================//
   window.addEventListener("load", function load() {
      viewSummaryCategories();
      viewSummarySwitch();
      viewSummarySort();
   }, false);

});
