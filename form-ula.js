
const INPUT_SELECTOR = 'input,select,textarea,button,output';

class FormUla {

  defaultOptions = {
    fitFontSizeToRows: true,
    includeConfirmationButton: true,
    IncludeFormNavigation: true,
    theme: 'default',
    animation: 'slidein',
    nextStepOnEnter: false,
    injectStartBtnOnLoad: true
  };

  constructor(options){
    //if options are present, merge them
    if(options){
      console.log(options)
      this.options = {...this.defaultOptions,...options};
      console.log({...this.defaultOptions,...options})
    }else{
      this.options = this.defaultOptions;
    }

    // Add a tabindex to all formUla elements
    document.querySelectorAll('.form-ula-element').forEach((item, i) => {
      item.tabindex = i;
    });
    if(this.options.injectStartBtnOnLoad){
      this.injectStartBtn();
    }
  }

  injectStartBtn () {
    var initBtn = document.querySelector('.form-ula-init-button');
    if(initBtn){
      var startBtn = document.createElement('BUTTON');
      startBtn.setAttribute("onclick","formUla.render();")
      startBtn.style.display= 'block';
      startBtn.innerText="Start";
      initBtn.appendChild(startBtn);
    }
  }

  render() {

    //Add overlay
    var overlay = document.querySelector('.form-ula-overlay')
    if(!overlay){
      var overlay = document.createElement("DIV");
      overlay.className = "form-ula-overlay";
      document.body.appendChild(overlay);
    } else {
      overlay.style.display = 'block';
    }

    // Moving first form item to center
    this.formItems = document.querySelectorAll('.form-ula-element');
    this.formItems[0].className += ' form-ula-active form-ula-transition';
    setTimeout(() => { this.formItems[0].className = this.formItems[0].className.replace(' form-ula-transition',''); }, 1500);

    //assign focus to first item DIV
    this.formItems[0].querySelector(INPUT_SELECTOR).focus();

    //inject Nav
    if(this.options.IncludeFormNavigation){
      var nav = document.querySelector('.form-ula-nav');
      if(!nav){
        nav = document.createElement("DIV");
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
      }else{
        nav.style.display = 'grid';
      }
    }

    // Inject confirmation button into div if config
    if(this.options.includeConfirmationButton){
      var submitBtn = document.querySelector('.form-ula-next-btn');
      if(!submitBtn){
        submitBtn = document.createElement("BUTTON");
        submitBtn.className = 'form-ula-next-btn';
        var span = document.createElement('SPAN')
        span.className="material-icons"
        span.innerText = "check";
        submitBtn.appendChild(span);
        submitBtn.setAttribute("onclick","formUla.next();")
        this.formItems[0].appendChild(submitBtn);
      }else{
        submitBtn.parentElement.removeChild(submitBtn);
        this.formItems[0].appendChild(submitBtn);
      }
    }

    //add event listener for enter button on text elements if option is true
    if(this.options.nextStepOnEnter){
      var inputs = document.querySelectorAll(`.form-ula-element input,textarea,button,select`)
      inputs.forEach(function(item){
        item.onkeypress = (e) => {if(e.keyCode === 13 || e.keyCode === 38){formUla.next();}}
      });
    }

    //Set font-size relative to row number if config
    if(this.options.fitFontSizeToRows){
      var autoFontSize = document.createElement("STYLE");
      autoFontSize.innerText = `
      .form-ula-2-row{
        font-size: 2em;
      }

      .form-ula-3-row{
        font-size: 3em;
      }

      .form-ula-4-row{
        font-size: 4em;
      }
      `
      document.head.appendChild(autoFontSize);
    }
  }

  //hide the formUla
  hide () {
    document.querySelector('.form-ula-overlay').style.display = 'none';
    var current = document.querySelector('.form-ula-active');
    current.className = current.className.replace(' form-ula-active','');
    var nav = document.querySelector('.form-ula-nav')
    if(nav){
      nav.style.display = 'none';
    }
  }

  //Moves the form to the next form-ula element
  next () {
    var current = document.querySelector('.form-ula-active');
    var next = document.querySelector(`[data-form-ula-order="${parseInt(current.dataset.formUlaOrder) + 1}"]`);
    if( next != null ){

      // hide the current element and show the next element
      current.className = current.className.replace(' form-ula-active','');
      next.className += ' form-ula-active form-ula-transition';

      var firstInput = next.querySelector(INPUT_SELECTOR);
      if(firstInput){
        firstInput.focus();
      }

      // the transition class is removed to stop transitions happening on re-focus
      setTimeout(() => { next.className = next.className.replace(' form-ula-transition',''); }, 1500);

      // remove button node from current element and append it to the next element
      if(this.options.includeConfirmationButton){
        var submitBtn = document.querySelector('.form-ula-next-btn');
        submitBtn.parentElement.removeChild(submitBtn);
        next.appendChild(submitBtn);
      }
    }
  }

  //Moves the form to the previous form-ula element
  prev () {
    var current = document.querySelector('.form-ula-active');
    var prev = document.querySelector(`[data-form-ula-order="${parseInt(current.dataset.formUlaOrder) - 1}"]`);
    if( prev != null ){

      // hide the current element and show the next element
      current.className = current.className.replace(' form-ula-active','');
      prev.className += ' form-ula-active form-ula-transition';
      prev.querySelector(INPUT_SELECTOR).focus();

      // the transition class is removed to stop transitions happening on re-focus
      setTimeout(() => { prev.className = prev.className.replace(' form-ula-transition',''); }, 1500);

      // remove button node from current element and append it to the previous element
      if(this.options.includeConfirmationButton){
        var submitBtn = document.querySelector('.form-ula-next-btn');
        submitBtn.parentElement.removeChild(submitBtn);
        prev.appendChild(submitBtn);
      }
    }
  }

}
