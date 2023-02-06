// ****** SELECT ITEMS **********

const welcomePage = document.querySelector('.welcome-page__container');
const itemsListPage = document.querySelector('.items-container');
const nextPageButton = document.querySelector('.welcome-page__btn');

const displayCurrentDate = document.querySelector('.text-wrapper');
const nameInput = document.querySelector('#name');
const form = document.getElementById('new-category-form');
const categoryInput = document.getElementById('category-name');
const categoriesConteiner = document.querySelector('.category-box-container');

const username = localStorage.getItem('username') || '';
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let selectedCategoryId = localStorage.getItem('category.selectedCategoryId');

const categoriesCounter = document.querySelector('.category-counter');



// ****** FUNCTIONS **********

// PAGE TRANSITION
const leaveWelcomePage = (e) => {
    
    welcomePage.style.transform = "translateX(-100%)";
    welcomePage.addEventListener("transitionend", (e) => {
        welcomePage.style.display = "none"
    });
    if(categories.length == 0 || categories.length !== 0) {
      itemsListPage.style.transform = "translateX(0)";
      itemsListPage.style.display = "flex";
    }
};



// CURRENT DATE
const getCurrentDate = () => {
    const date = new Date();
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeZone: `${clientTimeZone}`}).format(date);
    displayCurrentDate.innerHTML = `Today is, ${currentDate}`;
};


//SHOW / UPDATE CATEGORY COUNTER/NUMBER
const updateCategoryCounter = () => {
 
    if (categories.length === 0 ) {
       categoriesCounter.innerText = "You don't have any categories";
    } else {
      const categoryString = categories.length === 1 ? "category" : "categories"
      categoriesCounter.innerText = `You have ${categories.length} ${categoryString}`;
      
    }  
};


//RENDER CATEGORY
const displayCategory = () => {
    categoriesConteiner.innerHTML = '';

    categories.forEach(category => {

        const categoryWrapper = document.createElement('div');
        categoryWrapper.classList.add('category-wrapper');

        const categoryItem = document.createElement('li');
        categoryItem.classList.add('category-box', 'glassmorphism-card');
        categoryItem.id = category.id;
        categoryWrapper.appendChild(categoryItem);   

        const categoryItemTask = document.createElement('div');
        categoryItemTask.classList.add('category-box__task');
        categoryItemTask.innerHTML = `<input class="category-box__name" type="text" value="${category.categoryName}" readonly>`;
        categoryItem.appendChild(categoryItemTask);

        const editDeleteBtnContainer = document.createElement('div');
        editDeleteBtnContainer.classList.add('btn-container');
        categoryItem.appendChild(editDeleteBtnContainer);

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
        editDeleteBtnContainer.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        editDeleteBtnContainer.appendChild(deleteBtn);

        const openButton = document.createElement('button');
        openButton.innerHTML = 'OPEN';
        openButton.classList.add('button-open');
        editDeleteBtnContainer.appendChild(openButton);

        deleteBtn.addEventListener('click', deleteElement); //DELETE BUTTON
        editBtn.addEventListener('click', editElement); // EDIT BUTTON

        const tasksCounter = document.createElement('p');
        tasksCounter.classList.add('tasks-counter');
        tasksCounter.innerHTML = "Click Open and add task/s"
        categoryItem.appendChild(tasksCounter);

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        categoryItem.appendChild(progressBar);
    
        const progressBarValue = document.createElement('div');
        progressBarValue.classList.add('progress-bar-value');
        progressBar.appendChild(progressBarValue);
    
        const progressBarFill = document.createElement('div');
        progressBarFill.classList.add('progress-bar-fill');
        progressBar.appendChild(progressBarFill);

        const taskElementsContainer = document.createElement('div');
        taskElementsContainer.classList.add('task-elements-container');
        taskElementsContainer.innerHTML = `
        <form class="new-task-form">
          <input
            class="task-input"
            type="text"
            placeholder="Name a new task and enter/click to add..."
          />
          <input
            class="create-task-btn"
            type="submit"
            value="Create task"
          />
        </form>` 

        const tasksWrapper = document.createElement('div');
        tasksWrapper.classList.add('tasks-wrapper');
        taskElementsContainer.appendChild(tasksWrapper);
    
        categoryItem.appendChild(taskElementsContainer);

        categoriesConteiner.appendChild(categoryWrapper); //APPEND TO MAIN CONTAINER



        function showProgressBar(){
          if(category.tasks.length !== 0 && categoryItem.classList.contains('active')){
                progressBar.style.display = 'block'
                console.log('progress bar')
            } else {
                progressBar.style.display = 'none'
            }
        };
    

        //DELETE FUNCTION
  
        function deleteElement(e) {
            let thisItem = e.currentTarget.parentElement.parentElement.parentElement;
            thisItem.classList.add('fall');
        
            let transitionEndHandler = function(e) {
                categories = categories.filter(item => item !== category);
                selectedCategoryId = null;
        
                saveToLocalStorage();
                displayCategory();
                updateCategoryCounter();
        
                // Remove the transitionend event listener
                window.removeEventListener('transitionend', transitionEndHandler);
            };
        
            window.addEventListener('transitionend', transitionEndHandler);
        }
        
        
        //EDIT FUNCTION
        function editElement(e){
  
            const input = categoryItem.querySelector('.category-box__name')
            input.removeAttribute('readonly');
    
            //Cursor at the end of text
            input.addEventListener('focus', e => {
            const { value } = e.target;
            e.target.setSelectionRange(value.length, value.length);
            });
    
            input.focus();
            input.addEventListener('blur', (e) => {
            input.setAttribute('readonly', true);
            category.categoryName = e.target.value;
            saveToLocalStorage();
            displayCategory();
            });   
        };

        //Unfold/Fold category box
        function toggleAccordion(event) {

            //categoryItem.style.height = `${itemsListPage.getBoundingClientRect().height}px`;
        
            categoryItem.classList.toggle("active");
            taskElementsContainer.style.display = categoryItem.classList.contains('active') ? 'flex' : 'none';
            openButton.innerText = categoryItem.classList.contains('active') ? 'CLOSE' : 'OPEN';
            progressBar.style.display = categoryItem.classList.contains('active') ? 'block' : 'none';
            categoryItem.classList.contains('active') ? showProgressBar() : undefined;
        }


        //SAVE FULLSCREEN OPTION ON REFRESH
        if (category.id === selectedCategoryId) { 
            //openElment();
        };

        openButton.addEventListener('click', () => {
            toggleAccordion()

        });




        //UPDATE DONE/UNDONE TAKS RATIO
        function updateTasksRatio(thisCategoryId) {
            const selectedCategory = categories.find(category => category.id === thisCategoryId);
            const completeTaskCount = selectedCategory.tasks.filter(task => task.complete).length;
            let taskRatioNumber = Math.floor((100 * completeTaskCount) / category.tasks.length);
            category.taskRatio.pop();
            category.taskRatio.push(taskRatioNumber);
            saveToLocalStorage();
        };



        //FUNCTIONS AND EVENT LISTENERS HANDEL INSIDE CATEGORY TASKS

        const taskForms = document.querySelectorAll('.new-task-form');

        //SUBMIT TASK 
        for(let i = 0; i < taskForms.length; i++){

            taskForms[i].addEventListener('submit', e => {
              e.preventDefault(); 
              const thisCategoryId = e.currentTarget.parentElement.parentElement.id;
      
              let task = {
      
                taskItemName: taskForms[i][0].value,
                id: new Date().getTime().toString(),
                remainingTime: [],
                complete: false,
      
              };
      
              if(taskForms[i][0].value == null || taskForms[i][0].value === '') return;
      
              const selectedCategory = categories.find(category => category.id === thisCategoryId);
              selectedCategory.tasks.push(task);
              saveToLocalStorage();
      
              updateCategoryCounter(thisCategoryId);
              updateTasksRatio(thisCategoryId);
              saveToLocalStorage();
      
              e.target.reset();
              displayTask()
            });     
        };


        const displayTask = () => {

            tasksWrapper.innerHTML = "";
            showProgressBar();

            category.tasks.forEach(task =>{

                let taskElement = document.createElement('div');
                taskElement.classList.add('task-item');
              
                const taskFirst = document.createElement('div');
                taskFirst.classList.add('task-first');
                taskElement.appendChild(taskFirst);
        
                const checkboxElement = document.createElement('input');
                checkboxElement.classList.add('completed-checkbox');
                checkboxElement.type = 'checkbox';
                checkboxElement.id = task.id;
                checkboxElement.checked = task.complete;
                taskFirst.appendChild(checkboxElement);
              
                const taskName = document.createElement('p')
                taskName.classList.add('todo-text');
                taskName.innerHTML = `${task.taskItemName}`
                taskFirst.appendChild(taskName);
        
                showTasksCount();
              
                const countDown = document.createElement('div');
                countDown.classList.add('timer-container')
                taskFirst.appendChild(countDown);
        
                tasksWrapper.appendChild(taskElement);
                



                //PROGRESS BAR
                class ProgressBar {
                    constructor (element, initialValue = 0) {
                  
                      this.valueElement = progressBarValue;
                      this.fillElement = progressBarFill;
                  
                      this.setValue(initialValue)
                    }
                  
                    setValue (newValue) {
                      if (isNaN(newValue)) {
                        return 0;
                      }
          
                      if (newValue <= 0) {
                        newValue = 0;
                      }
                  
                      if(newValue > 100) {
                        newValue = 100;
                      }
                  
                      this.value = newValue;
                      this.update();
                    }
                  
                    update(){
                      const percentage = this.value + '%';
                  
                      this.fillElement.style.width = percentage;
                      this.valueElement.textContent = percentage;
                  
                    } 
                };  
                  
                new ProgressBar(progressBar, category.taskRatio);
                

                //COUNTDOWN TIMER  
                class Timer {
                    constructor(root) {
                        root.innerHTML = Timer.getHTML();
                            
                        this.el = {
                            minutes: root.querySelector('.timer__part--minutes'),
                            seconds: root.querySelector('.timer__part--seconds'),
                            control: root.querySelector('.timer__btn--control'),
                            reset: root.querySelector('.timer__btn--reset'),
                            timeForm: root.querySelector('.time-form'),
                            timeValue: root.querySelector('.time-value'),
                            notificationBox: root.querySelector('.notification-time-box'),
                            closeBoxButton: root.querySelector('.btn-close-box'),
                        };            
                    
                        this.interval = null;
                        this.remainingSeconds = task.remainingTime;
                    
                        this.start();
                        this.stop();
                
                        this.updateInterfaceTime();
                        this.updateInterfaceControls();
                    
                    
                        this.el.control.addEventListener('click', (e) => {
                            const target =  e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
            
                            if (this.interval === null) {
                            this.start(target);
                            } else {
                            this.stop();
                            this.updateRemainingTime();
                            }
                    
                        });
                        
                        this.el.reset.addEventListener('click', (e) => {
            
                            //Show Input Box
                            this.el.notificationBox.style.display = 'flex';
                            this.el.notificationBox.style.zIndex = "100";
                        });
            
            
                        //Close Notification/Put Time Value Box
                        this.el.closeBoxButton.addEventListener('click', e => {
            
                            this.el.notificationBox.style.display = 'none';
                        });
            
            
                        this.el.timeForm.addEventListener('submit' , e => {
                            e.preventDefault();
                            const inputeMinutes = this.el.timeValue.value;

                            
                            const thisCategoryId = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
                            const thisTaskId = e.currentTarget.parentElement.parentElement.parentElement.parentElement.previousSibling.previousSibling.id;
            
                            const selectedCategory = categories.find(category => category.id === thisCategoryId );
                            const selectedTask = selectedCategory.tasks.find(task => task.id === thisTaskId);
            
                            selectedTask.remainingTime.pop();
                            selectedTask.remainingTime.push(inputeMinutes);
                            saveToLocalStorage();
            
                            this.el.notificationBox.style.display = 'none';
                            e.target.reset();
            
                            if(inputeMinutes < 60) {
                            this.stop();
                            
                            this.remainingSeconds = selectedTask.remainingTime * 60;
                            this.updateRemainingTime();
                            this.updateInterfaceTime();
                            updateTasksRatio(thisCategoryId);               
                            };
            
                            
                            checkboxElement.checked = false;
                            task.complete = false;
                            saveToLocalStorage();
                            showTasksCount();

                            new ProgressBar(progressBar, category.taskRatio); 
                        });
        
                    };
        
                    //Functions
                    updateRemainingTime(){
                        task.remainingTime.pop();
                        task.remainingTime.push(this.remainingSeconds);
                        localStorage.setItem('categories', JSON.stringify(categories));
                    };
        
                
                    updateInterfaceControls(){
                        if(this.interval === null){
                            this.el.control.innerHTML =`<p>play</p>`;
                            this.el.control.classList.add('timer__btn--start');
                            this.el.control.classList.remove('timer__btn--stop');
                        } else {
                            this.el.control.innerHTML =`<p>pause</p>`;
                            this.el.control.classList.add('timer__btn--stop');
                            this.el.control.classList.remove('timer__btn--start');
                    
                        }
                    };
                
                    updateInterfaceTime() {
                        const minutes = Math.floor(this.remainingSeconds / 60);
                        const seconds = this.remainingSeconds % 60;
                    
                        this.el.minutes.textContent = minutes.toString().padStart(2, '0');
                        this.el.seconds.textContent = seconds.toString().padStart(2, '0');
                    };
                
                    start(target){

                        const thisCategoryId = target;

                        if(this.remainingSeconds === 0 || this.remainingSeconds === []) return
                
                            this.interval = setInterval(() =>{
                
                                this.remainingSeconds--;
                                this.updateInterfaceTime();
                        
                                if (this.remainingSeconds === 0) {
                                this.stop();
                                checkboxElement.checked = true;
                                task.complete = true;
                                showTasksCount();
                                this.updateRemainingTime();
                                updateTasksRatio(thisCategoryId);
                                saveToLocalStorage();
                                new ProgressBar(progressBar, category.taskRatio);
                                }
                        
                            }, 1000);
                        
                            this.updateInterfaceControls();
                            
                        }
                    
                        stop(){
                        clearInterval(this.interval);
                        this.interval = null;
                        this.updateInterfaceControls();
                
                    };
                
                    static getHTML(){
                        return `
                        <div class="notification-time-box glassmorphism-card">
                            <div class="set-time-box">
                                <div class="set-time-box__content">
                                    <h2 class="time-title">Put Time</h2>
                                    <button class="btn-close-box">
                                    <i class="fa-solid fa-circle-xmark"></i>
                                    </button>
                                </div>
                
                                <div class="set-time-box__input-wrapper">
                                    <form class="time-form">
                                        <input
                                            class="time-value"
                                            id="time-value"
                                            type="input"
                                            placeholder="e.g 20 etc"
                                        />
                                        <input class="add-value-btn" type="submit" value="Add Time" />
                                    </form>
                                </div>
                            </div>
                        </div>
                        <span class="timer__part timer__part--minutes">00</span>
                        <span class="timer__part timer__part--semicolons">:</span>
                        <span class="timer__part timer__part--seconds">00</span>
                    
                        <button
                            type="button"
                            class="timer__btn timer__btn--control timer__start"
                        >
                        </button>
                    
                        <button
                            type="button"
                            class="timer__btn timer__btn--reset timer__setup"
                        >
                            <p>setup</p>
                        </button>`
                    }
                };
                new Timer(countDown); 

                //SHOW UPDATE MESSAGE TASK COUNT
                function showTasksCount(){

                    const incompleteTaskCount = category.tasks.filter(task => !task.complete).length;
                    const completeTaskCount = category.tasks.filter(task => task.complete).length;
          
                    if(incompleteTaskCount === 0){
                      tasksCounter.innerText = 'You have done everything! Good Job!'
                    } else {
                      let taskRatio = Math.floor((100 * completeTaskCount) / category.tasks.length)
                      const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
                      tasksCounter.innerText = `${incompleteTaskCount} ${taskString} remaining ${taskRatio}% done` 
                    }       
                };

                checkboxElement.addEventListener('click', e => {
                    checkboxElement.checked;
                    let thisCategoryId = checkboxElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
                    const selectedCategory = categories.find(category => category.id === thisCategoryId);
                    const selectedTask = selectedCategory.tasks.find(task => task.id === e.target.id);
                    selectedTask.complete = e.target.checked
                    saveToLocalStorage()
                    showTasksCount()
          
                    updateTasksRatio(thisCategoryId);
          
                    new ProgressBar(progressBar, selectedCategory.taskRatio);  
          
                });

            });
        };
        displayTask();

    });
};


//LOCAL STORAGE - SAVE TO LOCAL STORAGE
const saveToLocalStorage = () => {
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('category.selectedCategoryId', selectedCategoryId);
};



// ****** EVENT LISTENERS **********
window.addEventListener('DOMContentLoaded', e => {

    if(categories.length !== 0){
        welcomePage.style.display = "none"
        itemsListPage.style.transform = "translateX(0)";
        itemsListPage.style.display = "flex";
        displayCategory();
    };  

    getCurrentDate();
    updateCategoryCounter();
    
});

nameInput.value = username;
nameInput.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
});

// SELECTED CATEGORY ID

nextPageButton.addEventListener('click', leaveWelcomePage);

form.addEventListener('submit', e =>{
    e.preventDefault()
  
    if (categoryInput == null || categoryInput === '') return;
  
    const category = {
  
      categoryName: categoryInput.value.trim(),
      id: new Date().getTime().toString(),
      taskRatio: [],
      tasks: [],
    };

    categories.push(category);
    saveToLocalStorage();
    e.target.reset();
    
    displayCategory();
    updateCategoryCounter();

});
