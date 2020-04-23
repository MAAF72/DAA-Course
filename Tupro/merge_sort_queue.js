/*
1, 20, 90, -1, -999
10, 8, 7, 6, 5, 4, 3, 2, 1, 0, -999, -10
8, 7, 6, 5, 4, 3, 2, 1
*/
$(function() {
    var arr;
    var stepList;
    var currStep;
    
    const deepCopy = (arr) => {
        let copy = [];
        arr.forEach(elem => {
            if(Array.isArray(elem)) {
                copy.push(deepCopy(elem));
            } else {
                if (typeof elem === 'object') {
                    copy.push(deepCopyObject(elem));
                } else {
                    copy.push(elem);
                }
            }
        });
        return copy;
    }
    

    const deepCopyObject = (obj) => {
        let tempObj = {};
        for (let [key, value] of Object.entries(obj)) {
            if (Array.isArray(value)) {
                tempObj[key] = deepCopy(value);
            } else {
                if (typeof value === 'object') {
                    tempObj[key] = deepCopyObject(value);
                } else {
                    tempObj[key] = value
                }
            }
        }
        return tempObj;
    }

    function merge(arr1, arr2) {
        var arr3 = [];
        
        while (arr1.length > 0 & arr2.length > 0) {
            arr3.push(arr1[0] <= arr2[0] ? arr1.shift() : arr2.shift());
        }
        
        while (arr1.length > 0) {
            arr3.push(arr1.shift());
        }
        
        while (arr2.length > 0) {
            arr3.push(arr2.shift());
        }
        
        return arr3;
    }
    
    function mergeSort(deep, queue) {
        var stage = 'Combine';
        if (deep == 1) {
            stage = 'Divide';
        }
        
        stepList.set(deep, [stage, deepCopy(queue)]);
        
        if (queue.length == 1) {
            return;
        }
        
        var new_queue = [];
        
        while (queue.length > 1) {
            new_queue.push(merge(queue.shift(), queue.shift()));
        }
        
        if (queue.length == 1) {
            new_queue.push(queue.shift())
        }
        
        
        mergeSort(deep + 1, new_queue);
    }
    
    function solve() {
        stepList = new Map();
        currStep = 1;
        var queue = [];
        //divide
        arr.forEach(e => {
            queue.push([e]);
        });
        stepList.set(0, ['Initial', [arr]]);
        mergeSort(1, queue);
    }
    
    function visualizeStep(stage, items) {
        var container = $('<div/>', { 'class': 'flex-container' });
        items.forEach(item => {
            $(container).append($('<div/>', { 'class': 'item'}).text(item.join(' ')));
        });
        $(container).append($('<div/>', { 'class': 'step'}).text(stage));
        
        return container;
    }
    
    $('.btn-sort').click(() => {
        arr = $('#array').val().replace(/ /g, '').split(',').map(Number);
        
        for (var i of arr) {
            if (!Number.isFinite(i)) {
                alert('Invalid input!');
                return;
            }
        }
        if (arr.length < 2) {
            return alert('Lu mau gua pukul?');
            
        }
        
        $('#content').fadeOut(400, () => {
            $('#content').remove();
            $('body').prepend($('<div/>', { 'id': 'content' }));
            $('#content').append(`
            <div class="modal">
                <div class="modal-content">
                    INI ISI ALGORITMANYA YA BAMBANG
                </div>
            </div>
            `);
            $('#content').append(`
            <button class="btn btn-algoritma">Lihat Algoritma</button>
            `);
            $('#content').append(`
            <div id="panel" class="box">
                <p id="message">Klik next untuk melihat visualisasi algoritma merge sort menggunakan queue</p>
                <button class="btn btn-next">Next</button>
            </div>
            <center id="visualization"></center>
            `);
            $('#visualization').append(visualizeStep('Initial', [arr]));
            solve(arr);
        });
        
        
    });
    
    $('body').on('click', '.btn-next', () => {
        var step = stepList.get(currStep);
        if (step[0] === 'Divide') {
            $('#message').text('Bagi inputan menjadi kumpulan array yang memiliki panjang 1');
        } else if (currStep !== stepList.size - 1) {
            $('#message').text('Combine setiap dua array yang bersebelahan dan urutkan, lalu masukkan ke dalam list of array baru');
        } else {
            $('#message').text('Combine dua array yang tersisa dan urutkan. Yay sekarang arraynya sudah terurut :))');
            $('.btn-next').text('Coba lagi');
            $('.btn-next').click(() => location.reload(true));
        }
        $('#visualization').append(visualizeStep(step[0], step[1]));
        $(document).scrollTop($(document).height());
        currStep++;
    });
    
    $('body').on('click', '.btn-algoritma', () => {
        $('.modal').show();
        $('.modal-content').show();
        $('.modal-content').load('merge_sort_queue.py');
    });
    
    $(window).click((e) => {
        if ($(e.target).is('.modal')) {
            $('.modal-content').hide();
            $('.modal').fadeOut();
        }
    });
    
});