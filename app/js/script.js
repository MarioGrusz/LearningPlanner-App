// ****** SELECT ITEMS **********

const welcomePage = document.querySelector('.container');
const itemsListPage = document.querySelector('.items-container');
const nextPageButton = document.querySelector('.welcome-page__btn');

const displayCurrentDate = document.querySelector('.text-wrapper');

const form = document.getElementById('new-category-form');
const categoryInput = document.getElementById('category-name');
const categoriesConteiner = document.querySelector('.category-box-container');

let categories = JSON.parse(localStorage.getItem('categories')) || [];
let selectedCategoryId = localStorage.getItem('category.selectedCategoryId');

const categoriesCounter = document.querySelector('.category-counter');
const setHeightContainer = document.querySelector('.category-box-container');
const infoHeight = setHeightContainer.getBoundingClientRect().height; ///????????

console.log(infoHeight)





// ****** FUNCTIONS **********

// PAGE TRANSITION
const leaveWelcomePage = (e) => {
    
    welcomePage.style.transform = "translateX(-100%)";
    welcomePage.addEventListener("transitionend", () => {welcomePage.style.display="none"})
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

        //DELETE FUNCTION
        function deleteElement(e){
           
            let thisItem = e.currentTarget.parentElement.parentElement.parentElement;
            thisItem.classList.add('fall');

            window.addEventListener('transitionend', function(){
                categories = categories.filter(item => item !== category);
                selectedCategoryId = null;
                
                saveToLocalStorage();
                displayCategory();
                updateCategoryCounter(); 

            });
        };
  
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

        function openElement(){
            categoryItem.classList.add('fullscreen'); 
            openButton.innerText = 'CLOSE';
            taskElementsContainer.style.display = 'flex';
            categoryItem.style.height = `${infoHeight}px`;
        };


        //SAVE FULLSCREEN OPTION ON REFRESH
        if (category.id === selectedCategoryId) { 
          openElement();
        };

      
        //CATEGORY BOX TO FULLSCREEN 
        openButton.addEventListener('click', e => {

            selectedCategoryId = e.target.parentElement.parentElement.id;
            saveToLocalStorage();
                        
            if (categoryItem.classList.contains('fullscreen')){
                categoryItem.classList.remove('fullscreen');
                taskElementsContainer.style.display = 'none'
                openButton.innerText = 'OPEN';
                selectedCategoryId = null;
                saveToLocalStorage();

                categoryItem.style.height = 'auto';

            } else {
                openElement();

                //const infoHeight = setHeightContainer.getBoundingClientRect().height;
                categoryItem.style.height = `${infoHeight}px`;
            }
        }); 

    });
};


//LOCAL STORAGE - SAVE TO LOCAL STORAGE
const saveToLocalStorage = () => {
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('category.selectedCategoryId', selectedCategoryId);
};



// ****** EVENT LISTENERS **********
window.addEventListener('DOMContentLoaded', e => {
    getCurrentDate();
    displayCategory();
    updateCategoryCounter();
});

// SELECTED CATEGORY ID
categoriesConteiner.addEventListener('click', e =>{
    if (e.target.tagName.toLowerCase() === 'li'){
      selectedCategoryId = e.target.id;

      
      saveToLocalStorage();
      displayCategory();
    }; 
});

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
  





// ****** LOCAL STORAGE **********