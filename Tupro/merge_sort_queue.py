'''
Input : 2 buah array
Deskripsi : Menggabungkan 2 buah array inputan menjadi 1 array yang terurut
Output : Sebuah array terurut yang merupakan gabungan dari 2 buah array inputan
Kompleksitas : O(panjang array 1 + panjang array 2)
'''
def merge(arr1, arr2): 
    arr3 = []
    
    while len(arr1) > 0 and len(arr2) > 0:
        arr3.append(arr1.pop(0) if arr1[0] <= arr2[0] else arr2.pop(0))
    
    while len(arr1) > 0:
        arr3.append(arr1.pop(0))
        
    while len(arr2) > 0:
        arr3.append(arr2.pop(0))
    
    return arr3
    
'''
Input : array
Deskripsi : 1. Membagi array menjadi kumpulan array yang memiliki panjang 1 dan memasukkannya kedalam queue utama.
            2. Kemudian mengeluarkan 2 array dari queue utama lalu menggabungkan dan mengurutkannya, kemudian simpan kedalam queue of array baru. 
            3. Lakukan sampai panjang queue utama < 2. Jika queue utama tersisa 1 array, masukkan array tersebut kedalam queue of array baru tadi.
            4. Isi queue utama dengan isi dari queue of array baru tadi
            5. Lakukan proses 2 - 4 hingga queue utama hanya tersisa 1 array, dijamin array sudah terurut
            6. Return array dari queue utama tersebut
Output : array yang sudah terurut
Kompleksitas : n * log_2(n) => O(n * log(n)), dimana n adalah panjang array
'''
def merge_sort(arr):
    queue = [[i] for i in arr]
    while len(queue) > 1:
        temp = []
        while len(queue) > 1:
            temp.append(merge(queue.pop(0), queue.pop(0)))

        if len(queue) == 1:
            temp.append(queue.pop(0))
        
        queue = temp
    return queue.pop(0)
    
arr = [10, 8, 7, 6, 5, 4, 3, 2, 1, 0, -999, -10]

print(merge_sort(arr))