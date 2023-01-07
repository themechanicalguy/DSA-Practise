/**
 * @param {HTMLElement} el - element to be wrapped
 */
// function $(el) {
//   return {
//     css: function(property, value) {
//       el.style[property] = value;
//       return this;
//     }
//   }
// }

function $(el) {
  // your code here
  this.ele = el;

  this.css = function (property, value) {
    console.log(this.ele.style, property, value);
    this.ele.style[property] = value;
    return this;
  };

  return this;
}

// class Wrapper {
//   constructor(element){
//     this.element = element
//   }

//   css(propertyName, value){
//     this.element.style[propertyName] = value
//     return this
//   }
// }

// function $(element) {
//   return new Wrapper(element)
// }
