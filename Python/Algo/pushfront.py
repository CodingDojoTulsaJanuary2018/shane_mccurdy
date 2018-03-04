def push_front(arr, val):
    arr[1:len(arr)], arr[0] = arr, val
    return arr
