def odd_even():
    for x in range(1,20):
        if (x%2):
            print "Number is", x," This is an odd number."
        else:
            print "Number is", x," This is an even number."
#odd_even()

def multiply(valList, multiplyBy):
    returnList = []
    for x in range(0,len(valList)):
        #print x
        returnList.append( valList[x] * multiplyBy)
    return returnList

# a = [2,4,10,16]
# b = multiply(a, 5)
# print b


def layered_multiples(arr):
    new_array = []
    for x in range(0,len(arr)):
        sub_array = []
        for y in range(0,arr[x]):
            sub_array.append(1)
        new_array.append(sub_array)
    return new_array

x = layered_multiples(multiply([2,4,5],3))
print x
