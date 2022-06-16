'use strict'
const burgerCheckbox = document.querySelector('.burger-menu__checkbox')
const burgerDropDown = document.querySelector('.nav-container')
const shortenBtn = document.querySelector('.link-shortener__btn')
const shortenInput = document.querySelector('.link-shortener__input')
const statisticsSection = document.querySelector('.statistics-section')
const mainTag = document.querySelector('main')
const burgerLine1 = document.querySelector('.line--1')
const burgerLine2 = document.querySelector('.line--2')
const burgerLine3 = document.querySelector('.line--3')



//fetching the short link and injecting html to show it
const shortenApi = async function(){
    const errorSpanElement = document.querySelector('.error-span')
    try{
        let response = await fetch(`https://api.shrtco.de/v2/shorten?url=${shortenInput.value}`)
        let shorten = await response.json()
        let result = shorten.result.full_short_link

        //removing error styles if the previous try was invalid
        if(errorSpanElement){
            shortenInput.setCustomValidity('')
            errorSpanElement.remove()
        }

       let div = document.createElement('div') 
       div.setAttribute('class','link-results')
       div.innerHTML = `
       <div class="link-results__wrapper">
       <p class="link-results__original">${shorten.result.original_link}</p>
       <div class="link-results__short">
       <p>${result}</p>
       <button class='link-results__btn'>Copy</button>
       </div>
       </div>`
       statisticsSection.prepend(div)

    }
    catch(err){
        if(!errorSpanElement){
        shortenInput.setCustomValidity('Invalid field.')
        let errorSpan = document.createElement('span')
        errorSpan.setAttribute('class','error-span')
        errorSpan.innerHTML='Please add a valid link'
        shortenInput.after(errorSpan)
        } 
    }}

    shortenBtn.addEventListener('click', shortenApi)
    

//event propagation on statistics-section, copying the short link
    statisticsSection.addEventListener('pointerdown', function(e){
        if(e.target.classList.contains('link-results__btn'))
        {   
       (async ()=>{
                try{
        const copyContent = e.target.previousElementSibling.textContent
        await navigator.clipboard.writeText(copyContent)
        e.target.textContent = 'Copied!'
        e.target.style.backgroundColor = `hsl(257, 27%, 26%)`}
        catch(err){
            alert(err)
        }})()

     }})


//event propagating open/close navgiaion on burger X click and outside click

document.addEventListener('click', function(e){

    if(e.target.matches('.burger-menu__checkbox') && burgerCheckbox.checked==true){
        mainTag.style.filter = 'blur(0.5rem)'
        burgerDropDown.style.animation='menuOpen .3s'
        burgerLine1.style.transform= "translateY(12px) rotate(135deg)"
        burgerLine2.style.transform= "scale(0)"
        burgerLine3.style.transform= "translateY(-12px) rotate(-135deg)"
        burgerDropDown.classList.remove('hidden')
        
        
    }

   else if(e.target.matches('.burger-menu__checkbox')&& burgerCheckbox.checked==false|| !e.target.closest('.nav-container')&& burgerCheckbox.checked==true){   
    burgerDropDown.style.animation='menuClose .3s'
    burgerLine1.style.removeProperty('transform')
    burgerLine2.style.removeProperty('transform')
    burgerLine3.style.removeProperty('transform')
        burgerCheckbox.checked=false
        mainTag.style.filter = 'none'
        setTimeout(()=>{
            burgerDropDown.classList.add('hidden')
            },300)
    }
    else return

})

// menu on different sizes
window.addEventListener('resize', ()=>{
    if(window.innerWidth >= 1200){
        burgerDropDown.classList.remove('hidden')
        burgerCheckbox.checked = false
        mainTag.style.filter = 'none'
        burgerDropDown.style.animation='none'
    }

    //else if triggers only if i resize <1200 after i have already resized >1200  otherwise closing by clicking outside doesnt work and also X button request dobule click.

   else if(window.innerWidth < 1200 && burgerCheckbox.checked == false && !burgerDropDown.classList.contains('hidden')){
        burgerCheckbox.checked=true
    }
 })


 //navigation style on 1200 load
window.addEventListener('load', ()=>{
    if(window.innerWidth >= 1200){
        burgerDropDown.classList.remove('hidden')
    }
})
