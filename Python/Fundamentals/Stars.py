from types import *

def draw_stars(listOnums):

    for x in range(0,len(listOnums)):
        line = ""
        for y in range(0,listOnums[x]):
            line += "*"
        print line


def draw_stars2(listOnums):

    for x in range(0,len(listOnums)):
        line = ""
        test = type(listOnums[x])

        if test is IntType:
            for y in range(0,listOnums[x]):
                line+= "*"

        elif test is StringType:
            for y in range(0, len(listOnums[x])):
                line+= listOnums[x][0]
        print line.lower()


a = [4, 6, 1, 3, 5, 7, 25]
b = [4, "Tom", 1, "Michael", 5, 7, "Jimmy Smith"]

# draw_stars(a)
draw_stars2(b)
