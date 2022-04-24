const project_container = document.getElementById('project_container');
const modal = document.getElementById('modal');
const modal_title = document.getElementById('modal_title');
const modal_start_date = document.getElementById('modal_start_date');
const modal_end_date = document.getElementById('modal_end_date');
const modal_info = document.getElementById('modal_info');
const modal_url = document.getElementById('modal_url');


async function get_json(file) {
  try {
    const req = await fetch('assets/json/' + file + '.json');
    return await req.json();

  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}


new ShuffleText(document.getElementById('shuffler')).start();


document.addEventListener("DOMContentLoaded", function(e) {

  new fullpage('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: false,
    sectionSelector: '.slide_section',
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['0', '1', '2', '3'],
    onLeave: function(origin, destination, direction) {
      console.log(origin);
      if (destination.item.getElementsByClassName('title')[0]) {
        new ShuffleText(destination.item.getElementsByClassName('title')[0]).start();
      }
      var lis = destination.item.getElementsByTagName('li');
      for (var i = 0; i < lis.length; i++) {
        lis[i].classList.add('animate__fadeInLeft', `animate__delay-0${i}`);
      }
    },
  });

  fullpage_api.setAllowScrolling(true);

  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    console.log($target);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  (document.querySelectorAll('.modal-background, .modal-close, .modal-close-button, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });

  let project_links = document.getElementsByClassName('project_link');

  for (var i = 0; i < project_links.length; i++) {
    project_links[i].addEventListener('click', (e) => {
      modal.classList.add('is-active');
      modal_title.textContent = e.target.getAttribute('data-title');
      modal_start_date.textContent = e.target.getAttribute('data-start_date');
      modal_end_date.textContent = e.target.getAttribute('data-end_date');
      modal_info.textContent = e.target.getAttribute('data-info');
      var url = e.target.getAttribute('data-url');
      if (url != 'false') {
        modal_url.href = e.target.getAttribute('data-url');
        modal_url.parentNode.classList.remove('is-hidden');
      } else {
        modal_url.parentNode.classList.add('is-hidden');
      }
    });
  }

  dontGo({
    title: 'Shaun Kollannur - Machine Learning Researcher',
    faviconSrc: 'assets/img/favicon2.png',
    timeout: 1000
  });

})
