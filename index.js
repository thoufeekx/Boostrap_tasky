

//parent of bowser => window  ,you can edit alert, notification, new tab 

//parent of dom => document. you can edit html or the content in the page


     //query selector directly ascess parent element 
    //without using array 
     const taskContainer = document.querySelector(".task__container");

     //to store card
     let globalStore =[];


    const generateNewCard = (taskData) =>  `
    <div class="col-md-6 col-lg-4" >
    <div class="card" >
        <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success" onclick="editCard.apply(this, arguments)">
            <i class="fas fa-pencil-alt" id=${taskData.id} onclick="editCard.apply(this, arguments)">
            </i>
            </button>
         
           <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
            <i class="far fa-trash-alt" id=${taskData.id} onclick="taskContainer.apply(this, arguments)"></i>
           </button>
        </div>
        <img src=${taskData.imageUrl} 
        class="card-img-top" alt="...">
        <div class="card-body" >
          <h5 class="card-title" id="task__title" >${taskData.taskTitle}</h5>
          <p class="card-text" id="task__description">${taskData.taskDescription}</p>
          <a href="#" class="btn btn-primary" id="task__type">${taskData.taskType}</a>
        </div>
        <div class="card-footer ">
          <button type="button" id=${taskData.id} class="btn btn-primary float-end" >Open Task</button>
        </div>
      </div>
    </div>
`;


                //Step to saving data to localstorage
          const loadInitialCardData = () => {
            //local storage to get tasky card data
          const getCardData = localStorage.getItem("tasky");

            //convert string to normal object
          const {cards} = JSON.parse(getCardData);


            //loopover those arary to task object to create html card, inject to DOM

             cards.map((cardObject) => {

              //inject to DOM
              taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
              

               //update our globalstore
              globalStore.push(cardObject);

             })

           



          }


     const saveChanges = () => {

      // The taskData object gets the "USER INPUT" and save it in Task Data

     const taskData = {
         
        //retune unique number for id
        id: `${Date.now()}`,
        
        
        // ".value" ==> return only value user had input
        imageUrl:        document.getElementById("imageurl").value,
        taskTitle:       document.getElementById("tasktitle").value,
        taskType:        document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
       };

      
     // four option  to insert new item beforebegin, afterbegin, beforeend, afterend 
      taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

      //delete
      //edit
      //open the card

       // doing this will add new cards in array or else it will delete previous data
      globalStore.push(taskData);

      //localStorage.setItem(globalStore);  => wrong 


      //JSON.stringfy need an object "globalstorage" is obj here
      //why cards? json.strinfy expects an obj, global store is an array to card was created
      localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
 
    };  



    // event is an event calling option
    const deleteCard = (event) => {

      //id
      //attach the window.event to event parameter
      event = window.event;
         


      //event.target.id give id of button clicked
      const targetID = event.target.id;


      const tagname = event.target.tagName;  //BUTTON



      //match the id of the element with the id inside global store
      //"cardoject" = each card in globalstore array


       //const newUpdatedArray = globalStore.filter((cardObject) => cardObject.id != targetID); 1

       //updating globalstore with new array

       //globalStore = newUpdatedArray;    2
 
       // 1 and 2 in one step , we have deleted newly updated array in above step
       globalStore = globalStore.filter((cardObject) => cardObject.id != targetID);
       
       

        //updating array after deletion
        localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

       //contact parent
       //taskContainer.removeChild()

       if(tagname === "BUTTON"){
         return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
       }
       else{
         return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
       }

    };


    /*const editTaskCard = (event) => {

       //attach the window.event to event parameter
       event= window.event;


       //event.target.id give id of button clicked
      const targetID = event.target.id;


      const tagname = event.target.tagName;  //BUTTON

    }
    */



   


/*

const saveData = () => {

  const edit__title = getElementById("task__title").textContent;
  const edit__type = getElementById("task__title").textContent;
  const edit__description = getElementById("task__title").textContent;

  document.getElementById("task__title").innerHTML = edit__title;
  document.getElementById("task__type").innerHTML = edit__type;
  document.getElementById("task__description").innerHTML = edit__description;


  document.getElementById("task__title").contentEditable = "false";
  document.getElementById("task__type").contentEditable = "false";
  document.getElementById("task__description").contentEditable = "false";
}

*/

///////////////////////////////////////////////////////////////////////////////////////


const editCard = (event) => {
  //console.log("hey edit is called");


  //attach the window.event to event parameter
  event = window.event;

  //event.target.id give id of button clicked
  const targetID = event.target.id;

  const tagname = event.target.tagName;  //BUTTON

  if( tagname === "BUTTON"){

    //now we need the parent element
    //if button is clicked
    parentElement = event.target.parentNode.parentNode;
  } 
  else{
    //if pencil icon is clicked
    parentElement = event.target.parentNode.parentNode.parentNode;
    
  }
  //taskTitle is linked with respective html content , here card title 
  let taskTitle       = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType        = parentElement.childNodes[5].childNodes[5];
  let submitButton    = parentElement.childNodes[7].childNodes[1];
  //console.log(submitButton);
   
  //console.log(taskType); to check the output in html console



  //setAttribute() is function that dynamically changes property of html elements
  taskTitle.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  submitButton.setAttribute("onclick", "saveEditChanges.apply(this, arguments)");
  


  //Dynamically changing name of "open task" to  "save changes"
  submitButton.innerHTML = "save changes";

    

  
};


const saveEditChanges = (event) => {
  event = window.event;

  //event.target.id give id of button clicked
  const targetID = event.target.id;

  const tagname = event.target.tagName;  //BUTTON

  if( tagname === "BUTTON"){

    //now we need the parent element
    //if button is clicked
    parentElement = event.target.parentNode.parentNode;
  } 
  else{
    //if pencil icon is clicked
    parentElement = event.target.parentNode.parentNode.parentNode;
    
  }
  //taskTitle is linked with respective html content , here card title 
  let taskTitle       = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType        = parentElement.childNodes[5].childNodes[5];
  let submitButton    = parentElement.childNodes[7].childNodes[1];



  const updatedData = {

    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDescription:taskDescription.innerHTML,
  };

  //console.log({updatedData});


    globalStore = globalStore.map((task) => {
      if(task.id === targetID) {
        return {
          id: task.id,
          // ".value" ==> return only value user had input
          imageUrl:       task.imageurl,
          taskTitle:       updatedData.taskTitle,
          taskType:        updatedData.taskType,
          taskDescription: updatedData.taskDescription,

        }
      }

      return task; //important else reamianing data awill be lost
    });
    //console.log(globalStore);
   //update array with new info
   localStoarage =localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));


   taskTitle.setAttribute("contenteditable","false");
  taskType.setAttribute("contenteditable","false");
  taskDescription.setAttribute("contenteditable","false");
 
  


  //Dynamically changing name of "open task" to  "save changes"
  submitButton.innerHTML = "Open Task";
  submitButton.removeAttribute("onclick")

  

};