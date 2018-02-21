import random

def grade(scr):
    if scr < 60:
        return None
    elif scr < 70:
        return "D"
    elif scr < 80:
        return "C"
    elif scr < 90:
        return "B"
    else:
        return "A"

print "Scores and Grades"

for x in range(0,10):
    score = random.randrange(60,101)
    print "Score:",score,"; Your grade is", grade(score)

print "End of the program. Bye!"
