document.addEventListener("DOMContentLoaded", () => {
   const loadWindow = () => {
      let summaryItems = document.querySelector('.summary__wrapper'),
         summaryItemsLoad = document.querySelector('.summary__wrapper-load');

      summaryItemsLoad.style.display = 'grid';
      summaryItems.style.display = 'none';
      function closeLoadItems() {
         summaryItemsLoad.style.display = 'none';
         summaryItems.style.display = 'grid';
      }

      setTimeout(closeLoadItems, 1500);
   }
   loadWindow();

   document.addEventListener('click', (event) => {
      let target = event.target;

      // добавление в избранное обычной крточки 
      if (target.closest('.btn-save') && target.closest('.summary__btn')) {
         if (!(target.closest('.btn-save').classList.contains('active'))) {
            target.closest('.btn-save').classList.add('active');
            target.closest('.btn-save').querySelector('p').textContent = 'Сохраненно'
         } else {
            target.closest('.btn-save').classList.remove('active');
            target.closest('.btn-save').querySelector('p').textContent = 'Сохранить'
         }
      }

      // добавление в избранное премиум карточки
      if (target.closest('.btn-save') && target.closest('.summary__btn-premium')) {
         if (!(target.closest('.btn-save').classList.contains('active'))) {
            target.closest('.btn-save').classList.add('active');
         } else {
            target.closest('.btn-save').classList.remove('active');
         }
      }

      // отменить преход на резюме при на жатии на кнопки
      if (target.closest('.summary__btn') || target.closest('.summary__btn-premium')) {
         event.preventDefault();
      }
   })

});