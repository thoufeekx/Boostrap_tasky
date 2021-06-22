

//parent of bowser => window  ,you can edit alert, notification, new tab 

//parent of dom => document. you can edit html or the content in the page


     //query selector directly ascess parent element 
    //without using array 
     const taskContainer = document.querySelector(".task__container");


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

      
 
    };  

