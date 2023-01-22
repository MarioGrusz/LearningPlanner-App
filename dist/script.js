"use strict";function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,_toPropertyKey(a.key),a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!==_typeof(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var welcomePage=document.querySelector(".welcome-page__container"),itemsListPage=document.querySelector(".items-container"),nextPageButton=document.querySelector(".welcome-page__btn"),displayCurrentDate=document.querySelector(".text-wrapper"),form=document.getElementById("new-category-form"),categoryInput=document.getElementById("category-name"),categoriesConteiner=document.querySelector(".category-box-container"),categories=JSON.parse(localStorage.getItem("categories"))||[],selectedCategoryId=localStorage.getItem("category.selectedCategoryId"),categoriesCounter=document.querySelector(".category-counter"),leaveWelcomePage=function(e){welcomePage.style.transform="translateX(-100%)",welcomePage.addEventListener("transitionend",(function(e){welcomePage.style.display="none"})),0!=categories.length&&0===categories.length||(itemsListPage.style.transform="translateX(0)",itemsListPage.style.display="flex")},getCurrentDate=function(){var e=new Date,t=Intl.DateTimeFormat().resolvedOptions().timeZone,n=new Intl.DateTimeFormat("en-GB",{dateStyle:"full",timeZone:"".concat(t)}).format(e);displayCurrentDate.innerHTML="Today is, ".concat(n)},updateCategoryCounter=function(){if(0===categories.length)categoriesCounter.innerText="You don't have any categories";else{var e=1===categories.length?"category":"categories";categoriesCounter.innerText="You have ".concat(categories.length," ").concat(e)}},displayCategory=function e(){categoriesConteiner.innerHTML="",categories.forEach((function(t){var n=document.createElement("div");n.classList.add("category-wrapper");var a=document.createElement("li");a.classList.add("category-box","glassmorphism-card"),a.id=t.id,n.appendChild(a);var i=document.createElement("div");i.classList.add("category-box__task"),i.innerHTML='<input class="category-box__name" type="text" value="'.concat(t.categoryName,'" readonly>'),a.appendChild(i);var r=document.createElement("div");r.classList.add("btn-container"),a.appendChild(r);var o=document.createElement("button");o.classList.add("edit-btn"),o.innerHTML='<i class="fas fa-edit"></i>',r.appendChild(o);var s=document.createElement("button");s.classList.add("delete-btn"),s.innerHTML='<i class="fas fa-trash"></i>',r.appendChild(s);var l=document.createElement("button");l.innerHTML="OPEN",l.classList.add("button-open"),r.appendChild(l),s.addEventListener("click",(function(n){n.currentTarget.parentElement.parentElement.parentElement.classList.add("fall"),window.addEventListener("transitionend",(function(){categories=categories.filter((function(e){return e!==t})),selectedCategoryId=null,saveToLocalStorage(),e(),updateCategoryCounter()}))})),o.addEventListener("click",(function(n){var i=a.querySelector(".category-box__name");i.removeAttribute("readonly"),i.addEventListener("focus",(function(e){var t=e.target.value;e.target.setSelectionRange(t.length,t.length)})),i.focus(),i.addEventListener("blur",(function(n){i.setAttribute("readonly",!0),t.categoryName=n.target.value,saveToLocalStorage(),e()}))}));var c=document.createElement("p");c.classList.add("tasks-counter"),c.innerHTML="Click Open and add task/s",a.appendChild(c);var d=document.createElement("div");d.classList.add("progress-bar"),a.appendChild(d);var u=document.createElement("div");u.classList.add("progress-bar-value"),d.appendChild(u);var m=document.createElement("div");m.classList.add("progress-bar-fill"),d.appendChild(m);var p=document.createElement("div");p.classList.add("task-elements-container"),p.innerHTML='\n        <form class="new-task-form">\n          <input\n            class="task-input"\n            type="text"\n            placeholder="Name a new task and enter/click to add..."\n          />\n          <input\n            class="create-task-btn"\n            type="submit"\n            value="Create task"\n          />\n        </form>';var g=document.createElement("div");function f(){0===t.tasks.length?d.style.display="none":d.style.display="block"}function v(e){return[e,"px"].join("")}function y(e){var n=categories.find((function(t){return t.id===e})),a=n.tasks.filter((function(e){return e.complete})).length,i=Math.floor(100*a/t.tasks.length);t.taskRatio.pop(),t.taskRatio.push(i),saveToLocalStorage()}g.classList.add("tasks-wrapper"),p.appendChild(g),a.appendChild(p),categoriesConteiner.appendChild(n),f(),t.id,l.addEventListener("click",(function(e){selectedCategoryId=e.target.parentElement.parentElement.id,saveToLocalStorage(),function(){if(a.classList.contains("fullscreen"))a.classList.remove("fullscreen"),p.style.display="none",setTimeout((function(e){return a.style.position="static"}),1e3),l.innerText="OPEN",selectedCategoryId=null,saveToLocalStorage();else{var e={top:(t=a.getBoundingClientRect()).top,left:t.left,width:t.width,height:t.height};a.style.width=v(e.width),a.style.height=v(e.height),a.style.top=v(e.top),a.style.left=v(e.left),a.classList.add("fullscreen"),p.style.display="flex",l.innerText="CLOSE",a.position="fixed"}var t}()}));for(var h=document.querySelectorAll(".new-task-form"),b=function(e){h[e].addEventListener("submit",(function(t){t.preventDefault();var n=t.currentTarget.parentElement.parentElement.id,a={taskItemName:h[e][0].value,id:(new Date).getTime().toString(),remainingTime:[],complete:!1};if(null!=h[e][0].value&&""!==h[e][0].value){var i=categories.find((function(e){return e.id===n}));i.tasks.push(a),saveToLocalStorage(),updateCategoryCounter(n),y(n),saveToLocalStorage(),t.target.reset(),_()}}))},L=0;L<h.length;L++)b(L);var _=function(){g.innerHTML="",f(),t.tasks.forEach((function(e){var n=document.createElement("div");n.classList.add("task-item");var a=document.createElement("div");a.classList.add("task-first"),n.appendChild(a);var i=document.createElement("input");i.classList.add("completed-checkbox"),i.type="checkbox",i.id=e.id,i.checked=e.complete,a.appendChild(i);var r=document.createElement("p");r.classList.add("todo-text"),r.innerHTML="".concat(e.taskItemName),a.appendChild(r),l();var o=document.createElement("div");o.classList.add("timer-container"),a.appendChild(o),g.appendChild(n);var s=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;_classCallCheck(this,e),this.valueElement=u,this.fillElement=m,this.setValue(n)}return _createClass(e,[{key:"setValue",value:function(e){if(isNaN(e))return 0;e<=0&&(e=0),e>100&&(e=100),this.value=e,this.update()}},{key:"update",value:function(){var e=this.value+"%";this.fillElement.style.width=e,this.valueElement.textContent=e}}]),e}();function l(){var e=t.tasks.filter((function(e){return!e.complete})).length,n=t.tasks.filter((function(e){return e.complete})).length;if(0===e)c.innerText="You have done everything! Good Job!";else{var a=Math.floor(100*n/t.tasks.length),i=1===e?"task":"tasks";c.innerText="".concat(e," ").concat(i," remaining ").concat(a,"% done")}}new s(d,t.taskRatio),new(function(){function n(a){var r=this;_classCallCheck(this,n),a.innerHTML=n.getHTML(),this.el={minutes:a.querySelector(".timer__part--minutes"),seconds:a.querySelector(".timer__part--seconds"),control:a.querySelector(".timer__btn--control"),reset:a.querySelector(".timer__btn--reset"),timeForm:a.querySelector(".time-form"),timeValue:a.querySelector(".time-value"),notificationBox:a.querySelector(".notification-time-box"),closeBoxButton:a.querySelector(".btn-close-box")},this.interval=null,this.remainingSeconds=e.remainingTime,this.start(),this.stop(),this.updateInterfaceTime(),this.updateInterfaceControls(),this.el.control.addEventListener("click",(function(e){null===r.interval?r.start():(r.stop(),r.updateRemainingTime())})),this.el.reset.addEventListener("click",(function(e){r.el.notificationBox.style.display="flex",r.el.notificationBox.style.zIndex="100"})),this.el.closeBoxButton.addEventListener("click",(function(e){r.el.notificationBox.style.display="none"})),this.el.timeForm.addEventListener("submit",(function(n){n.preventDefault();var a=r.el.timeValue.value,o=n.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id,c=n.currentTarget.parentElement.parentElement.parentElement.parentElement.previousSibling.previousSibling.id,u=categories.find((function(e){return e.id===o})),m=u.tasks.find((function(e){return e.id===c}));m.remainingTime.pop(),m.remainingTime.push(a),saveToLocalStorage(),r.el.notificationBox.style.display="none",n.target.reset(),a<60&&(r.stop(),r.remainingSeconds=60*m.remainingTime,r.updateRemainingTime(),r.updateInterfaceTime()),i.checked=!1,e.complete=!1,saveToLocalStorage(),l(),y(o),new s(d,t.taskRatio)}))}return _createClass(n,[{key:"updateRemainingTime",value:function(){e.remainingTime.pop(),e.remainingTime.push(this.remainingSeconds),localStorage.setItem("categories",JSON.stringify(categories)),console.log("update ramaining time")}},{key:"updateInterfaceControls",value:function(){null===this.interval?(this.el.control.innerHTML="<p>play</p>",this.el.control.classList.add("timer__btn--start"),this.el.control.classList.remove("timer__btn--stop")):(this.el.control.innerHTML="<p>pause</p>",this.el.control.classList.add("timer__btn--stop"),this.el.control.classList.remove("timer__btn--start"))}},{key:"updateInterfaceTime",value:function(){var e=Math.floor(this.remainingSeconds/60),t=this.remainingSeconds%60;this.el.minutes.textContent=e.toString().padStart(2,"0"),this.el.seconds.textContent=t.toString().padStart(2,"0")}},{key:"start",value:function(){var t=this;0!==this.remainingSeconds&&null!==this.remainingSeconds&&(this.interval=setInterval((function(){t.remainingSeconds--,t.updateInterfaceTime(),0===t.remainingSeconds&&(t.stop(),i.checked=!0,e.complete=!0,l(),t.updateRemainingTime(),saveToLocalStorage())}),1e3),this.updateInterfaceControls())}},{key:"stop",value:function(){clearInterval(this.interval),this.interval=null,this.updateInterfaceControls()}}],[{key:"getHTML",value:function(){return'\n                        <div class="notification-time-box glassmorphism-card">\n                            <div class="set-time-box">\n                                <div class="set-time-box__content">\n                                    <h2 class="time-title">Put Time</h2>\n                                    <button class="btn-close-box">\n                                    <i class="fa-solid fa-circle-xmark"></i>\n                                    </button>\n                                </div>\n                \n                                <div class="set-time-box__input-wrapper">\n                                    <form class="time-form">\n                                        <input\n                                            class="time-value"\n                                            id="time-value"\n                                            type="input"\n                                            placeholder="e.g 20 etc"\n                                        />\n                                        <input class="add-value-btn" type="submit" value="Add Time" />\n                                    </form>\n                                </div>\n                            </div>\n                        </div>\n                        <span class="timer__part timer__part--minutes">00</span>\n                        <span class="timer__part timer__part--semicolons">:</span>\n                        <span class="timer__part timer__part--seconds">00</span>\n                    \n                        <button\n                            type="button"\n                            class="timer__btn timer__btn--control timer__start"\n                        >\n                        </button>\n                    \n                        <button\n                            type="button"\n                            class="timer__btn timer__btn--reset timer__setup"\n                        >\n                            <p>setup</p>\n                        </button>'}}]),n}())(o),i.addEventListener("click",(function(e){i.checked;var t=i.parentElement.parentElement.parentElement.parentElement.parentElement.id,n=categories.find((function(e){return e.id===t})),a=n.tasks.find((function(t){return t.id===e.target.id}));a.complete=e.target.checked,saveToLocalStorage(),l(),y(t),new s(d,n.taskRatio)}))}))};_()}))},saveToLocalStorage=function(){localStorage.setItem("categories",JSON.stringify(categories)),localStorage.setItem("category.selectedCategoryId",selectedCategoryId)};window.addEventListener("DOMContentLoaded",(function(e){0!==categories.length&&(welcomePage.style.display="none",itemsListPage.style.transform="translateX(0)",itemsListPage.style.display="flex",displayCategory()),getCurrentDate(),updateCategoryCounter()})),nextPageButton.addEventListener("click",leaveWelcomePage),form.addEventListener("submit",(function(e){if(e.preventDefault(),null!=categoryInput&&""!==categoryInput){var t={categoryName:categoryInput.value.trim(),id:(new Date).getTime().toString(),taskRatio:[],tasks:[]};categories.push(t),saveToLocalStorage(),e.target.reset(),displayCategory(),updateCategoryCounter()}}));
//# sourceMappingURL=script.js.map