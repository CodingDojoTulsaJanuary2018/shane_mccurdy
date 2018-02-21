name = ["Anna", "Eli", "Pariece", "Brendan", "Amy", "Shane", "Oscar"]
favorite_animal = ["horse", "cat", "spider", "giraffe", "ticks", "dolphins", "llamas"]

def make_dict(list1,list2):
    new_dict = {}
    if len(list1) < len(list2):
        new_dict = zip(list2,list1)
    else:
        new_dict = zip(list1,list2)
    return new_dict

print make_dict(name, favorite_animal)
