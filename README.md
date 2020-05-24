# form-ula

![Form-ula field](https://screenshot.click/23-10-4djbx-87b2t.jpg)

Form-ula is a hands off form beautification library, The idea is that you put the form in the correct format, and then all configuration is done for you through Form-ula itself. 

Allowing you to get beautiful, performant forms off the ground incredibly quickly, we will be adding themes to make the forms fit in with your existing design scheme, plus adding configuration options, enabling you to focus on other aspects of your site!

Currently formula is built on a step-based interface for example:

[Form-ula demo](https://codepen.io/poppadam/pen/PoPLZpY)

# Features

Formula has a multitude of features you can use when creating your forms:

* A bespoke API for handling form behaviour, want to move to the next step? just call `formUla.next()`
* Beautifully styled out of the box, no need to write CSS (unless you want too!)
* Want more than one field per step? We support that with no extra fiddling by you! Each step is it's own `div` element
* Configurable: add settings so Form-ula displays exactly how you want it too.

# Getting Started

Insert the following code in the head of your site:

```
  <link rel="stylesheet" type="text/css" href="form-ula.css">
  <script src="form-ula.js"></script>

  <script type="text/javascript">

    document.addEventListener('DOMContentLoaded', function() {
      formUla = new FormUla();
    });

    </script>
```

And this to your CSS file:

```
.form-ula-element{
  display: none;
}
```


The general structure that Form-ula follows is :

```
<div class="form-ula-wrapper">
    <div class="form-ula">
        <div class="form-ula-element" data-form-ula-order=0>
          Form field / label here 
        </div>
         <div class="form-ula-element" data-form-ula-order=1>
          Form field / label here 
        </div>
    </div>
</div>
```

The `data-form-ula-order` attribute controls the order in the form.

And that's it! once you click the start button that Form-ula injects, or call `formUla.render();` anywhere in your code your form is up and running. Easy right?



Want a start button for your form? add a `<div class="form-ula-init-button"></div>` anywhere in your body and style as you wish.

# Layout
Form-ula operates on a very simple class based layout. Each formula step is divided into four columns and you can control how many of these columns an element takes up by adding the appropriate class name. The default is one column.

e.g `class = 'form-ula-4-column'` would take up a full row of the form step.

Example: label + input on one line

```
      <div class="form-ula-element" data-form-ula-order=0 >
        <label> Age </label>
        <input id="age" class="form-ula-3-column"></input>
        <label > Name </label>
        <input id="name" class="form-ula-3-column"></input>
      </div>
```
![form layout demo](https://screenshot.click/24-16-wwpkf-bm5wm.jpg)

The same classes are available for rows, although there is no set number of rows!

# Configuration options

### fitFontSizeToRows default=true
This option changes the font size when using the form-ula row classes for layout. If you're writing your own CSS or have textarea tags I'd recomment setting this to false.

### includeConfirmationButton default=true
This adds a confirmation button to the bottom of each step. the button just moves to the next step when clicked.

### IncludeFormNavigation default=true
Responsible for injecting the arrow navigation to the right of the form.

### theme default='default'
Right now this is a dead option, there are no other themes. Watch this space though.

### animation default='slidein'
Right now this is a dead option, there are no other animations. Watch this space though.

### nextStepOnEnter default=false
When enter is pressed move to the next step of the form. This can be annoying if you have multiple inputs per form step, so it's disabled by default.

### injectStartBtnOnLoad default=true
Self-explanatory, injects a start button on Load, if you disable this you can use `formUla.render()` to show your form.

# API reference

Form-ula has a few options for interacting with it on your page.

### render()
example: 
```
<button onclick="formUla.render();"> Click here to show form </button>
```
This initialises the form itself.

### hide()
example: 
```
<button onclick="formUla.render();"> Click here to hide form </button>
```
This hides the form.

### prev()
example: 
```
<button onclick="formUla.prev();"> Click here to go back </button>
```
This moves the form to the previous step as defined by the `data-form-ula-order` attribute

### next()
example: 
```
<button onclick="formUla.next();"> Click here to go forward </button>
```
This moves the form to the next step as defined by the `data-form-ula-order` attribute

### injectStartBtn()
example: 
```
element.onfocus = "formUla.injectStartBtn();";
```
This injects the button to start the form, incase you didn't want to do it on load. in order to use this function you need to set the `injectStartBtnOnLoad: false` configuration option.

