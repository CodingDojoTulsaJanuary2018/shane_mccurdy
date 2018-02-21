#for num in range(1,1000,2): #print from 1 to 1000 moving in increments of 2
#    print num
#for num in range(5,1000000,5): #print from 5 to 1 million in increments of 5
#    print num

a = [1, 2, 5, 10, 255, 3]
sumlist = 0
for vals in a: #add the values of the list to running sum variable
    sumlist+= vals
print sumlist

print sumlist/len(a) #print sum divided by the length of the list to ge the average
