
const INPUT_SELECTOR = 'input,select,textarea,button,output';

class FormUla {

  #formItems;

  constructor(options=false){
    this.initBtn = document.querySelector('.form-ula-init-button');
    if(this.initBtn){
      var startBtn = document.createElement('BUTTON');
      startBtn.onclick = this.render;
      startBtn.style.display= 'block';
      startBtn.innerText="Start";
      this.initBtn.appendChild(startBtn);
    }
  }

  render() {

    //Add overlay
    if(!document.querySelector('.form-ula-overlay')){
      var overlay = document.createElement("DIV");
      overlay.className = "form-ula-overlay";
      document.body.appendChild(overlay);
    }

    // Moving first form item to center
    this.formItems = document.querySelectorAll('.form-ula-element');
    this.formItems[0].className += ' form-ula-active';

    //assign focus to first item DIV
    this.formItems[0].querySelector(INPUT_SELECTOR).focus();

    //inject Nav if nav div
    if(!document.querySelector('.form-ula-nav')){
      var nav = document.createElement("DIV");
      nav.className = 'form-ula-nav';

      var prevBtnIcon = document.createElement("I");
      prevBtnIcon.className = 'material-icons';
      prevBtnIcon.innerText = 'expand_less'
      prevBtnIcon.setAttribute("onclick","formUla.prev();")

      var nextBtnIcon = document.createElement("I");
      nextBtnIcon.className = 'material-icons';
      nextBtnIcon.innerText = 'expand_more'
      nextBtnIcon.setAttribute("onclick","formUla.next();")

      nav.appendChild(prevBtnIcon);
      nav.appendChild(nextBtnIcon);
      document.querySelector('.form-ula').appendChild(nav);
    }

    //add event listener for enter button on text elements
    var inputs = document.querySelectorAll(`.form-ula-element input,textarea,button,select`)
    inputs.forEach(function(item){
      item.onkeypress = (e) => {if(e.keyCode === 13 || e.keyCode === 38){formUla.next();}}
    });
  }



  //Moves the form to the next form-ula element
  next () {
    var current = document.querySelector('.form-ula-active');
    var next = document.querySelector(`[data-form-ula-order="${parseInt(current.dataset.formUlaOrder) + 1}"]`);
    if( next != null ){
      current.className = current.className.replace(' form-ula-active','');
      next.className += ' form-ula-active';
      next.querySelector(INPUT_SELECTOR).focus();
    }
  }

  //Moves the form to the previous form-ula element
  prev () {
    var current = document.querySelector('.form-ula-active');
    var prev = document.querySelector(`[data-form-ula-order="${parseInt(current.dataset.formUlaOrder) - 1}"]`);
    if( prev != null ){
      current.className = current.className.replace(' form-ula-active','');
      prev.className += ' form-ula-active';
      prev.querySelector(INPUT_SELECTOR).focus();
    }
  }

}
