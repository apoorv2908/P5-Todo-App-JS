var arr_of_obj = new Set();
var value_id;
var title_flag = false;
var subtask = new Map;

//-------------------------------------------------------
//function to ceate the popup which adds card 
function modal(){
    document.getElementById("popup-to-add-card").style.display = "block";
    document.getElementById("header").style.filter="blur(5px)";
};
//-------------------------------------------------------

//-------------------------------------------------------
//Function which creates card after assigning details in popup
function addCard(){
    var card_title = document.getElementById("modal-input-box").value;
    createObj(card_title);
    closeModal();
}
//-------------------------------------------------------


//-------------------------------------------------------
//Function which closes the popup which creates card
function closeModal(){
    document.getElementById("popup-to-add-card").style.display = "none";
    document.getElementById("header").style.filter="blur(0px)"
}
//-------------------------------------------------------


//-------------------------------------------------------
//Function to assign the details of each card into a set
function createObj(title){
    document.getElementById('empty-list').style.display = 'none'
    var card_obj = {
        title: title,
        id: Date.now(),
        subtask
    };
    arr_of_obj.add(card_obj);
    createCard(card_obj.id);
};
//-------------------------------------------------------


//-------------------------------------------------------
//Function to create subtask in a card 
function addList(){
    var cloned_list_item = document.querySelector(".this-list-element").cloneNode(true);
    var subtask_name = document.getElementById('modal-input-box-card').value;
    console.log(value_id);
    cloned_list_item.innerText =  subtask_name; 
    cloned_list_item.style.display = "block";
    cloned_list_item.setAttribute('id',`${Date.now()}`);
    cloned_list_item.setAttribute('value',`${Date.now()}`);
    cloned_list_item.setAttribute('style',"margin-left: 10px; font-family: 'Yatra One', cursive;");
    
    var done_button = document.createElement('button');
    done_button.setAttribute('id',`check-done-${Date.now()}`);
    done_button.setAttribute('class','mark-as-done-class');
    done_button.setAttribute('value',`${Date.now()}`);
    done_button.setAttribute('onclick','completedTask(this.value)');
    done_button.innerText = ' Mark Done';
    done_button.setAttribute('style','font-size:15 px;cursor:pointer; height:18px; border-radius:10px;')
    cloned_list_item.appendChild(done_button);
    cloned_list_item.setAttribute('onClick',"completedTask(this.value)");
     for(obj of arr_of_obj){
        for(prop in obj){
            if(obj.id == value_id){
                obj.subtask.set(`${subtask_name}`,`${Date.now()}`);
                break;
            }
        }
    }
    document.getElementById(`${value_id}`).getElementsByClassName('add-list-after-this')[0].appendChild(cloned_list_item).appendChild(done_button);
    closeCardModal();
}


//-------------------------------------------------------
//Function to close the popup of adding the subtask
function closeCardModal(){
    document.getElementById('modal-div-card').style.display = "none";
}
//-------------------------------------------------------


//-------------------------------------------------------
//adding sublist items to card
function addSubtask(val) {
    document.getElementById("modal-div-card").style.display = "block";
    value_id = val;
};
//-------------------------------------------------------


//-------------------------------------------------------
//Function to delete a card
function deleteCard(val){
    var delete_div = document.getElementById(`${val}`);
    for(obj of arr_of_obj){
        for(prop in obj){
        if (obj.id==val)
        arr_of_obj.delete(obj);
        break;
        }
    }
    delete_div.parentNode.removeChild(delete_div);
    if(arr_of_obj.size==0){
        document.getElementById('empty-list').style.display = 'block';
    }
    
};
//cloning of card
function createCard(){
    var first_card = document.querySelector('.card').cloneNode(true);
    display(first_card);
};

//task list item done
function completedTask(value){
    document.getElementById(`${value}`).style.textDecoration = 'line-through';
    document.getElementById(`${value}`).style.color = '#112D4E';
    document.getElementById(`check-done-${value}`).remove();
}
//appending cards to outer container
function display(card){
    document.getElementById('empty-list').style.display = 'none'
    arr_of_obj.forEach(element => {
        card.id = element.id;
        card.querySelector(".card-head").innerHTML = element.title;
        card.querySelector(".card-head").setAttribute('value',`${element.id}`);
        card.setAttribute("value",`${element.id}`);
        card.setAttribute("display","block");
        card.setAttribute("min-height","300px");
        card.querySelector(".delete-button-in-card").setAttribute("value",`${element.id}`);
        card.querySelector(".delete-button-in-card").setAttribute("onClick","deleteCard(this.value)");
        card.querySelector(".add-button-in-card").setAttribute("value",`${element.id}`);
        card.querySelector(".add-button-in-card").setAttribute("onClick","addSubtask(this.value)");    
    });
    if(title_flag)
    card.style.display = 'none';
    else
    card.style.display = "block";
    document.getElementById("outer-container").appendChild(card);
}
//selected card
function headerFunc(val){
    var card_header;
    for(let ele of arr_of_obj){
        for(let id in ele){
            if(ele[id]==val){
                card_header = ele.title;
                break;
            };
        };
    };
    document.querySelector("#header-part1").style.display = 'none';
    for(let ele of arr_of_obj){
            if(ele.id==val){
                document.getElementById(`${ele.id}`).style.display = 'block';
            }
            else {
                document.getElementById(`${ele.id}`).style.display = 'none';
            }
    };
    document.getElementById('card-dynamic-head').innerText = `${card_header}`;
    document.getElementById('card-dynamic-head').style.display = 'flex'
    document.getElementById('outer-container').style.justifyContent = 'center'
    document.getElementById('back-button').style.display = 'block'
    title_flag = true;
};


//after clicking back button main page
function displayAll(){
    title_flag = false;
    document.querySelector("#header-part1").style.display = 'block';
    document.getElementById('back-button').style.display = 'none';
    for(let ele of arr_of_obj){
            document.getElementById(`${ele.id}`).style.display = 'block';
    };
    document.getElementById('card-dynamic-head').innerText = ``;
    document.getElementById('card-dynamic-head').style.display = 'none';
}