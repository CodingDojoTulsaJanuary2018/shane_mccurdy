print "--- Find and Replace ---"
words = "It's thanksgiving day. It's my birthday,too!"
newWords = words.replace("day", "month")
print newWords

print "--- Min and Max ---"
x = [2,54,-2,7,12,98]
print "Min : ",min(x)
print "Max : ",max(x)

print "--- First and Last ---"
x = ["hello",2,54,-2,7,12,98,"world"]
print x[0], x[len(x)-1]
newList = [x[0]]
newList.append( x[len(x)-1] )
print newList

print "--- New List ---"
x = [19,2,54,-2,7,12,98,32,10,-3,6]
x.sort()
print x
x[0] = [x[0]] #make 0 index a list first, or else .append wont work
for num in range( 1, (len(x)/2) ): #for half the length of our list
    x[0].append(x.pop(1))

print x
