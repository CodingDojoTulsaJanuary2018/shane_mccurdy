from types import *

l = ['magical unicorns',19,'hello',98.98,'world']

stringSum = ""
stringFlag = 0 # an empty string would evluate to false, so we use a flag
numSum = 0
numFlag = 0 # if adding numbers happened to equls 0, then numSum would test as false

for item in l:
    test = type(item)
    if test is StringType:
        stringSum = stringSum + " " +item
        stringFlag = 1
    elif test is IntType or LongType or FloatType:
        numSum = numSum + item
        numFlag = 1

if numFlag and stringFlag:
    print "The list you entered is of mixed type"
    print "Sum: ", numSum
    print "String: ", stringSum
elif numFlag:
    print "The list you entered is of integer type"
    print "Sum: ", numSum
elif stringFlag:
    print "The list you entered is of string type"
    print "String: ", stringSum
