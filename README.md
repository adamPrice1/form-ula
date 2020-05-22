# form-ula

![Form-ula field](https://screenshot.click/23-10-4djbx-87b2t.jpg)

Form-ula is a hands off form beautification library, The idea is that you put the form in the correct format, and then all configuration is done for you through Form-ula itself. 

Allowing you to get beautiful, performant forms off the ground incredibly quickly, we will be adding themes to make the forms fit in with your existing design scheme, plus adding configuration options, enabling you to focus on other aspects of your site!

Currently formula is built on a step-based interface for example:

![Form-ula demo](https://screenshot.click/22-38-hnxpz-kxqqk.gif)

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
