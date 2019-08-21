

eventListener();

function eventListener () {

    const ui = new UI;

    document.querySelector('.nav-btn').addEventListener('click', function () {
        ui.navShow();
    })

    document.querySelector('.video-switch').addEventListener('click', function () {
        ui.slideBtn();
    })

    //Submit form

    document.querySelector('.drink-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.querySelector('.input-name').value;
        const lastName = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;
        let value = ui.checkEmpty(name, lastName, email);

        if (value) {

            let customer = new Customer(email, lastName, email)
            ui.addCustomer(customer)
            ui.showFeedback('customer added to the list', 'success');
            ui.clearField();
        }
        else {
            ui.showFeedback('some form value are empty', 'error');
        }

    })

    //display modal 

    const links = document.querySelectorAll('.work-item-icon');
    links.forEach (function(item) {
        item.addEventListener('click', function(event) {
            ui.showModal(event);
        })
    }) 

    //hide modal
    document.querySelector('.work-modal-close').addEventListener('click', function () {
        ui.closeModal();
    })

}

function UI () {

}
//show nav
UI.prototype.navShow = function () {
    document.querySelector('.nav').classList.toggle('nav-slide')
}

//play/pause the video
UI.prototype.slideBtn = function () {
    let btn = document.querySelector('.video-switch-btn');

    if (!btn.classList.contains('btnslide')) {
        btn.classList.add('btnslide')
        document.querySelector('.video-item').pause()
    }else {
        btn.classList.remove('btnslide')
        document.querySelector('.video-item').play()

        

        }
}


//check for empty values
UI.prototype.checkEmpty = function(name, lastname, email) {
    let result;
    if (name === '' || lastname === '' || email === '') {
 result = false;
    }
    else {
  result = true;
    }
    return result;
}

UI.prototype.showFeedback = function (text, type) {
    const feedback = document.querySelector('.drink-form-feedback');
    if (type === 'success') {
        feedback.classList.add('success');
        feedback.innerText = text;
        this.removeAlert('success');
    }
    else if (type === 'error') {
        feedback.classList.add('error');
        feedback.innerText = text;
        this.removeAlert('error');

    }
}

//remove alert
UI.prototype.removeAlert = function (type) {
    setTimeout(function () {
        document.querySelector('.drink-form-feedback').classList.remove(type)
    }, 3000)
}


//add customer

UI.prototype.addCustomer = function(customer) {
    const images = [1, 2, 3, 4, 5];
    let random = Math.floor(Math.random() * images.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = ` <img src="images/person-${random}.jpg" alt="" class="person-thumbnail">
    <h4 class="person-name">${customer.name}</h4>
    <h4 class="person-last-name">${customer.lastname}</h4>`
    document.querySelector('.drink-card-list').appendChild(div)
}

//clear fields
UI.prototype.clearField = function () {
     document.querySelector('.input-name').value = '';
     document.querySelector('.input-lastname').value = '';
     document.querySelector('.input-email').value = '';
}


function Customer(name,lastname,email) {
    this.name =name,
    this.lastname = lastname,
    this.email = email;
}


UI.prototype.showModal = function (event) {
    event.preventDefault(); 
    if(event.target.parentElement.classList.contains('work-item-icon'));
    let id = event.target.parentElement.dataset.id
    
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('work-modal-item');

    modal.classList.add('work-modal-show');
    modalItem.style.backgroundImage = `url(img/work- ${id}.jpeg)`
}

//hide modal

UI.prototype.closeModal = function() {
    document.querySelector('.work-modal').classList.remove('work-modal-show');
}
