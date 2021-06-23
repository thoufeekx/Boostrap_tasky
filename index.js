

//parent of bowser => window  ,you can edit alert, notification, new tab 

//parent of dom => document. you can edit html or the content in the page


     //query selector directly ascess parent element 
    //without using array 
     const taskContainer = document.querySelector(".task__container");

     //to store card
     const globalStore =[];


    const generateNewCard = (taskData) =>  `
    <div class="col-md-6 col-lg-4" id=${taskData.id}>
    <div class="card ">
        <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success">
            <i class="fas fa-pencil-alt">
            </i>
            </button>
         
           <button type="button" class="btn btn-outline-danger">
            <i class="far fa-trash-alt"></i>
           </button>
        </div>
        <img src=${taskData.imageUrl} 
        class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${taskData.taskTitle}</h5>
          <p class="card-text">${taskData.taskDescription}</p>
          <a href="#" class="btn btn-primary ">${taskData.taskType}</a>
        </div>
        <div class="card-footer ">
          <button type="button" class="btn btn-primary float-end">Open task</button>
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




    const deleteCard = (event) => {

      //id
      event = window.event;

      const targetID = event

      //match the id of the element with the id inside global store

    }

