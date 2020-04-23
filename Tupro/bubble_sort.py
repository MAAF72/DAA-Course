def bubble_sort(arr):
    for i in range(len(arr) - 1):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
    
arr = [10, 8, 7, 6, 5, 4, 3, 2, 1, 0, -999, -10]
print(bubble_sort(arr))
