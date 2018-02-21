import random
print "Starting the program..."
tails = 0
heads = 0
for x in range(1,51):
    coin = random.randrange(0,2) # 0 = tails
    if coin:
        heads += 1
        coin = "heads"
    else:
        tails += 1
        coin = "tails"

    print "Attempt #"+ str(x) +" Throwing a coin... It's a",coin,"... Got",heads,"head(s) so far and",tails,"tail(s) so far"
    # print "Tails:", tails
    # print "Heads:", heads
print "Ending the program, thank you!"
