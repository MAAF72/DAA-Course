'''
Input : Sebuah array
Deskripsi : Membagi inputan menjadi kumpulan array yang memiliki panjang 1 dan memasukkannya kedalam queue
Output : Sebuah queue yang berisi n buah array, dimana n adalah panjang array input
Kompleksitas : O(panjang array input)
'''
def divide(arr):
    return [[i] for i in arr]
    
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
Input : queue of array
Base Case : Queue hanya berisi 1 array
Deskripsi : Mengeluarkan 2 array dari queue lalu menggabungkan dan mengurutkannya, kemudian simpan kedalam queue of array baru. 
            Lakukan sampai panjang queue < 2. Jika queue tersisa 1 array, masukkan array tersebut kedalam queue of array baru tadi. Setelah itu rekursifkan lagi
Output : sebuah queue of array baru
Kompleksitas : O(panjang queue / 2) * panjang array input
'''
def merge_sort(queue):
    if len(queue) == 1:
        return queue.pop(0)
    
    temp = []
    
    while len(queue) >= 2:
        temp.append(merge(queue.pop(0), queue.pop(0)))
    
    if len(queue) == 1:
        temp.append(queue.pop(0))
    
    return merge_sort(temp)
    
arr = [10, 8, 7, 6, 5, 4, 3, 2, 1, 0, -999, -10]

print(merge_sort(divide(arr)))


# iterative version
# while len(queue) > 1:
    # temp = []
    # while len(queue) <= 2:
        # temp.append(merge(queue.pop(0), queue.pop(0)))
    
    # if len(queue) == 1:
        # temp.append(queue.pop(0))
    
    # queue = temp
# print(queue.pop(0))