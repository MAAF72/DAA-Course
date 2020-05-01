$(function() {
    if (typeof(Worker) === 'undefined') {
        alert('Your browser doesn\'t have support for Web Worker, this site can\'t work as it should!');
    }
    
    var data = [];
    var compareBar;
    
    var worker = new Worker('js/worker.js');
    
    worker.addEventListener('message', (e) => {
        data.push(e.data);
        if (!compareBar) {
           compareBar = Morris.Bar({
                element: 'bar-chart',
                data: data,
                xkey: 'num',
                ykeys: ['merge', 'bubble'],
                labels: ['Merge Sort', 'Bubble Sort'],
                hideHover: 'auto',
                hoverCallback: (index, options, content, row) => {
                    return `
                    <div>The number of element is ${row.num}</div>
                    <div style="color: rgb(11, 98, 164);">Merge Sort takes ${row.merge} ms</div>
                    <div style="color: rgb(122, 146, 163);">Bubble Sort takes ${row.bubble} ms</div>
                    `;
                }
            });
            
            compareBar.options.labels.forEach((label, i) => {
                var legendItem = $('<span class="legend-item"></span>').text(label).prepend('<span class="legend-color">&nbsp;</span>');
                legendItem.find('span').css('backgroundColor', compareBar.options.barColors[i]);
                $('#bar-legend').append(legendItem);
           });
       } else {
           data.sort((a, b) => a.num - b.num);
           compareBar.setData(data);
       }
       Swal.close();
    }, false);

    $('#btn-compare').click(() => {
        var num = parseInt($('#number').val());
        if (num <= 0) {
            return alert('Lu mau gua pukul?');
        }
        Swal.fire({
            title: 'Please Wait',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            onOpen: () => {
                Swal.showLoading();
            }
        })
        worker.postMessage(num);
    });
   
    $('#btn-bubble').click(() => {
        $.get('code/bubble_sort.py', (data) => {
            Swal.fire({
                title: 'Bubble Sort Algorithm',
                html: $('<pre/>').css('text-align', 'left').html(data),
                showConfirmButton: false
            });
        });
    });
   
    $('#btn-merge').click(() => {
        $.get('code/merge_sort.py', (data) => {
            Swal.fire({
                title: 'Merge Sort Algorithm',
                width: '600px',
                html: $('<pre/>').css('text-align', 'left').html(data),
                showConfirmButton: false
            });
        });
    });
});