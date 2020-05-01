def merge(arr1, arr2): 
    arr3 = []
    
    while len(arr1) > 0 and len(arr2) > 0:
        arr3.append(arr1.pop(0) if arr1[0] <= arr2[0] else arr2.pop(0))
    
    while len(arr1) > 0:
        arr3.append(arr1.pop(0))
        
    while len(arr2) > 0:
        arr3.append(arr2.pop(0))
    
    return arr3

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
    
arr = list(map(int, input().split()))

print(merge_sort(arr))