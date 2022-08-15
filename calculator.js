const buttons = document.getElementsByTagName('button');
const result = document.getElementById('result');
const elements =document.getElementsByClassName('orange');
const main =document.getElementsByClassName('main');
const ket =  document.getElementById('ket');

let action = '';
let arr = [...buttons];
let box = '';
let search = '';

for (let i = 0; i<arr.length; i++){
    arr[i].addEventListener('click', function (e) {
        if (result.value === '0') {
            if (e.target.dataset.value !== '.' ) {
                result.value = result.value.replace('0', '');
            }
        }

        actions(e);
        activeClass(e);
        tools(e);

        if (search.indexOf('.') === -1){
            ket.attributes['data-value'].value = '.';
        }
    });
}

function clear() {
    action = '';
    box = '';
    result.value = '0';
    search = ''

}

function equal() {
    try {
        result.value = eval(action);
        box = '';
    } catch (error) {
        alert('Error:' + ' Normal ban gri');
        result.value = '0';
        action = '';
        box = '';
        search = ''
    }
    let indexPoint = result.value.indexOf('.');
    if ( indexPoint !== -1){
        ket.attributes['data-value'].value = ket.attributes['data-value'].value.replace('.', '');

        }
}

function minus () {
    let index = result.value.indexOf('-');

    if (index === -1) {
        result.value = '-' + result.value;
        action = result.value
    }
    if (index !== -1){
        result.value = result.value.replace('-', '');
        action = result.value
    }
}

function activeClass(e) {

    document.querySelector('.active')?.classList.remove('active');
    e.target.classList.add('active')
}

function tools(e) {
    switch (e.target.dataset.value) {
        case 'AC':
            clear();
            break;
        case '=':
            equal(e);
            break;
        case '+/-':
            minus();
            break;
        case '%':
            result.value = eval(result.value/100);
            break;
        case '.':
            let indexDat = search.indexOf('.');
            if ( indexDat !== -1){
                ket.attributes['data-value'].value = ket.attributes['data-value'].value.replace('.', '');
            }
            break;
    }
}

function actions(e) {

    let numValue = e.target.dataset.type;
    if (numValue === 'num') {
        action += e.target.attributes['data-value'].value;
        result.value += e.target.attributes['data-value'].value;
        search += e.target.attributes['data-value'].value;
        searchBtn(e)
    } else if(numValue === 'math'){
        action += e.target.dataset.value;
        box += e.target.dataset.value;
        search = ''
    }
}

function searchBtn(e) {

        if (box.indexOf('-')!== -1 ||
            box.indexOf('+') !== -1 ||
            box.indexOf('*') !== -1 ||
            box.indexOf('/') !== -1 ) {

            box = '';
            result.value = e.target.dataset.value ;

            if (e.target.dataset.value === '.') {
                result.value = '0.'
            }
        }
}

