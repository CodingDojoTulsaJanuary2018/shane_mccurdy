from types import *

def add_list(inlist):
    base = 0
    for items in inlist:
        base += items
    return base

def sub_list(inlist):
    base = 0
    for items in inlist:
        base -= items
    return base

class MathDojo(object):
    def __init__(self, value):
        self.value = float(value)

    def add(self, val1, *extra_vals):
        if type(val1) is ListType or type(val1) is TupleType: #if it's a list..
            val1 = add_list(val1) #unpack and add_list it together
        self.value += val1
        if extra_vals:
            for val in extra_vals:
                if type(val) is ListType or type(val) is TupleType: #if it's a list..
                    val = add_list(val) #unpack and add_list it together
                self.value += val
        return self

    def subtract(self, val1, *extra_vals):
        if type(val1) is ListType or type(val1) is TupleType: #if it's a list..
            val1 = sub_list(val1) #unpack and sub_list it together
        self.value -= val1
        if extra_vals:
            for val in extra_vals:
                if type(val) is ListType or type(val) is TupleType: #if it's a list..
                    val = sub_list(val) #unpack and sub_list it together
                self.value -= val
        return self

md = MathDojo(0)
# print md.add(2).add(2,5).subtract(3,2).value
print md.add([1], (1,2),3,4).add([3,5,7,8], [2,4.3,1.25]).subtract(2, [2,3], [1.1,2.3]).value
