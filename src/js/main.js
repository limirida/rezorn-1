const lightbox = GLightbox({});

var glide = new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  // autoplay:3000
}).mount()

var glide = new Glide('.projects-glide', {
  type: 'carousel',
  startAt: 0,
  // autoplay:3000
}).mount()


var glide = new Glide('.gratitude-glide', {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  focusAt: 'center',
}).mount()


var glide = new Glide('.reviews-glide', {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  focusAt: 'center',
}).mount()

// glide.go('=2');

// var glide = new Glide('.gratitude__wrap', {
//   type: 'carousel',
//   startAt: 0,
//   // autoplay:3000
// }).mount()

// glide.mount()
///////////////////////////////////////////

//   const glideHealth = new Glide('.glide-health', {
//     //autoplay: 6000,
//     //hoverpause: true,
//     type: 'carousel',
//     perView: 1
// }).mount();

// const singleImage = document.querySelector('.glide-health__single-img');
// const imgText = document.querySelectorAll('.glide-health__text');

// glideHealth.on('move', function() {
//     singleImage.src = imgText[glideHealth.index].dataset.imageFade;
//     singleImage.classList.add('fadeIn', 'animated');
// });

// glideHealth.on('move.after', function() {
//     singleImage.classList.remove('fadeIn', 'animated');
// });


const openText = document.querySelector(".read-more__btn");
const readText = document.querySelector(".read-more");

openText.addEventListener("click", btnClick);

function btnClick() {
  console.log(readText.classList);

  if (readText.classList.contains("hidden")) {
    openText.textContent = "Скрыть текст";
  } else {
    openText.textContent = "Читать далее";
  }

  readText.classList.toggle("hidden");
}