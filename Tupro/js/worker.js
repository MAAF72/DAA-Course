function getRandInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

function mergeSort(queue) {
    while (queue.length > 1) {
        var new_queue = [];
        while (queue.length > 1) {
            new_queue.push(merge(queue.shift(), queue.shift()));
        }
        
        if (queue.length == 1) {
            new_queue.push(queue.shift());
        }
        
        queue = new_queue;
    }
}

function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return;
}

function calculateMerge(arr) {
    var start = performance.now();
    var queue = [];
    //divide
    for (var i = 0; i < arr.length; i++) {
        queue.push([arr[i]]);
    }
    mergeSort(queue);
    var end = performance.now();
    return Number(end - start).toFixed(3);
}

function calculateBubble(arr) {
    var start = performance.now();
    bubbleSort(arr);
    var end = performance.now();
    return Number(end - start).toFixed(3);
}

self.addEventListener('message', (e) => {
    var arr = Array.from({length: e.data}, () => getRandInteger(Number.MIN_VALUE, Number.MAX_VALUE));
    var arr2 = arr.slice();
    data = {
        num: e.data,
        merge: calculateMerge(arr2),
        bubble: calculateBubble(arr)
    }
    self.postMessage(data);
}, false);