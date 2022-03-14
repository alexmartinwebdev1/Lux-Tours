const open_btn = document.querySelector('.open-btn')
const close_btn = document.querySelector('.close-btn')
const nav = document.querySelectorAll('.nav')
const loadText = document.querySelector('.loading-text')
const header = document.querySelector('.header')
const panels = document.querySelectorAll('.panels__panel')
const cardBtns = document.querySelectorAll('.card__back--button')
const counters = document.querySelectorAll('.counters__counter--number')
const moreBtn = document.querySelector('.header__btn--more')
const sectionAbout = document.querySelector('.about')
const followers = document.querySelector('.followers')

open_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.add('visible'))
})

close_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.remove('visible'))
})

const removeActiveClasses = (items) => {
  items.forEach(item => item.classList.remove('active'))
}

panels.forEach(panel => {
  panel.addEventListener('click', () => {
    removeActiveClasses(panels)
    panel.classList.add('active')
  })
})

const startCount = () => {
  counters.forEach(counter => {
    counter.innerText = '0'
    const updateCounter = () => {
      const target = +counter.getAttribute('data-target')
      const c = +counter.innerText;
      const increment = target / 200
  
      if(c < target) {
        counter.innerText = Math.ceil(c + increment)
        setTimeout(updateCounter, 1)
      } else {
        counter.innerText = target
      }
    }
    updateCounter()
  })
}




const slider = function () {
  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots')

  let curSlide = 0
  const maxSlide = slides.length

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    })
  }

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'))

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active')
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0
    } else {
      curSlide++
    }

    goToSlide(curSlide)
    activateDot(curSlide)
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1
    } else {
      curSlide--
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  };

  const init = function () {
    goToSlide(0)
    createDots()

    activateDot(0)
  }
  init()

  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide()
    e.key === 'ArrowRight' && nextSlide()
  })

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset
      goToSlide(slide)
      activateDot(slide)
    }
  });
};
slider()


moreBtn.addEventListener('click', (e) => {
  e.preventDefault()
  sectionAbout.scrollIntoView({ behavior: 'smooth' })
})

document.querySelector('.nav__list').addEventListener('click', function (e) {
  e.preventDefault()

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})


const followersCount = function (entries, observer) {
  const [entry] = entries
  if (!entry.isIntersecting) return
  startCount()
  observer.unobserve(entry.target)
};

const followersObserver = new IntersectionObserver(followersCount, {
  root: null,
  threshold: 0.7
});

followersObserver.observe(followers)