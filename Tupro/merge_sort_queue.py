'''
Input : 2 buah array
Deskripsi : Menggabungkan 2 buah array inputan menjadi 1 array yang terurut
Output : 1 buah array terurut yang merupakan gabungan dari 2 buah array inputan
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
Deskripsi : Mengeluarkan 2 array dari queue lalu menggabungkan dan mengurutkannya, kemudian simpan kedalam queue of array baru. 
            Lakukan sampai queue kosong. Setelah itu rekursifkan lagi hingga queue hanya berisi 1 array saja
Output : sebuah queue of array baru
Kompleksitas : O(total panjang array)
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

queue = [[i] for i in arr]


print(merge_sort(queue))


# iterative version
# while len(queue) != 1:
    # temp = []
    # i = 0
    # while i < len(queue) - 1:
        # temp.append(merge(queue[i], queue[i + 1]))
        # i += 2
    
    # if len(queue) % 2 != 0:
        # temp.append(queue[-1])
    
    # queue = temp
