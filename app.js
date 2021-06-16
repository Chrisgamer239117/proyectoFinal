
console.log("Hola a todos ❤")

const formulario =document.getElementById('formulario');
const input = document.getElementById('input');
const input1 = document.getElementById('input2');
const Listact=document.getElementById('Lista-actividades');
const template=document.getElementById('template').content;
const fragment=document.createDocumentFragment();
let actividades={}

//console.log(Date.now())
document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('actividades')){
        actividades =JSON.parse(localStorage.getItem('actividades'))
    }
    pintarActividades()
})
Listact.addEventListener('click', e=>{
    btnAccion(e)
})
formulario.addEventListener('submit',e=>{
    e.preventDefault()
    //console.log(e.target[0].value)
    //console.log(e.target.querySelector('input').value)
    //console.log(input.value)
    setActividad(e)
})
    const setActividad=e =>{
        if(input.value.trim()===''){
            console.log('esta vacio')
            return
        }
        const actividad={
        id: Date.now(),
        des:input1.value,
        texto:input.value,
        estado: false

        }
        actividades[actividad.id]=actividad
        //console.log(actividades)
        formulario.reset()
        input.focus()


        pintarActividades()

    }

    const pintarActividades =()=>{
        localStorage.setItem('actividades', JSON.stringify(actividades))


        if(Object.values(actividades).length=== 0){
            Listact.innerHTML='<div class="alert alert-dark text-center"> No hay actividades pendientes 😍🥰    </div>'
            
        
            return
        }


        Listact.innerHTML=''
        Object.values(actividades).forEach(actividad =>{
            const clone = template.cloneNode(true)
            clone.querySelector('p').textContent =actividad.texto

            if(actividad.estado){
                clone.querySelector('.alert').classList.replace('alert-warning','alert-primary')
                clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-undo-alt')
                clone.querySelector('p').style.textDecoration ='Line-through'
            }
            clone.querySelectorAll('.fas')[0].dataset.id =actividad.id
            clone.querySelectorAll('.fas')[1].dataset.id =actividad.id
            fragment.appendChild(clone)
        })
        Listact.appendChild(fragment)
    }

    const btnAccion= e =>{
        //console.log(e.target.classList.contains('fa-check-circle'))
        if (e.target.classList.contains('fa-check-circle')){
            //console.log(e.target.dataset.id)
            actividades[e.target.dataset.id].estado= true
            pintarActividades()
            
        }
        if (e.target.classList.contains('fa-minus-circle')){
            delete actividades[e.target.dataset.id]
            pintarActividades()
        }   
        if (e.target.classList.contains('fa-undo-alt')){
            //console.log(e.target.dataset.id)
            actividades[e.target.dataset.id].estado= false
            pintarActividades()
            
        }
        e.stopPropagation()
    }
