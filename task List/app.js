const form=document.querySelector("#task-form");
const tasklist=document.querySelector(".collection");
const clearbtn=document.querySelector(".clear-task");
const filter=document.querySelector("#filter");
const taskinput=document.querySelector("#task");

loadEventListners();
function loadEventListners()
{
    document.addEventListener('DOMContentLoaded' , getTask);
    form.addEventListener('submit', addTask);
    tasklist.addEventListener('click', removeTask);
    clearbtn.addEventListener('click',clearTask);
    filter.addEventListener('keyup',filterTask);
}

function getTask()
{
    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task)
    {
        const li=document.createElement('li');
        li.className="collection-item";
        li.appendChild(document.createTextNode(task));
        const link=document.createElement('a');
        link.className="delete-item secondary-content";
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        tasklist.appendChild(li);
    }
    )

}

function addTask(e)
{
    if(taskinput.value==='')
    {
        alert("enter something bitch!");
    }
    else
    {
    const li=document.createElement('li');
    li.className="collection-item";
    li.appendChild(document.createTextNode(taskinput.value));
    const link=document.createElement('a');
    link.className="delete-item secondary-content";
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    tasklist.appendChild(li);
    storeTaskInLocalStorage(taskinput.value);
    taskinput.value="";
    }
    e.preventDefault();
}

function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e)
{
    if(e.target.parentElement.classList.contains("delete-item"))
    {
        if(confirm("You gonna loose your progress"))
        {
            e.target.parentElement.parentElement.remove();
        }
    }
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    
}

function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index)
    {
        if(taskItem.textContent === task)
        {
            tasks.splice(index, 1);
        }
    }
    )
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTask()
{
    while(tasklist.firstChild)
    {
        tasklist.removeChild(tasklist.firstChild);
    }
    clearTaskFromLocalStorage();

}
clearTaskFromLocalStorage()
{
    let tasks=[];
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function filterTask(e)
{
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(
        function(task)
        {
            const item=task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1)
            {
                task.style.display="block";
                
            }
            else
            {
                task.style.display="none";
                
            }
        }
    )

}
