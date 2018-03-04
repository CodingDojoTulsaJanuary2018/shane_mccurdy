def change( cents ):
    coins = {
        "dollars":0,
        "half-dollars":0,
        "quarters":0,
        "dimes":0,
        "nickels":0,
        "pennies":0,
    }

    while cents >= 100:
        cents = cents -100
        coins["dollars"] =  coins["dollars"]+1
    while cents >= 50:
        cents = cents -50
        coins["half-dollars"] =  coins["half-dollars"]+1
    while cents >= 25:
        cents = cents -25
        coins["quarters"] =  coins["quarters"]+1
    while cents >= 10:
        cents = cents -10
        coins["dimes"] =  coins["dimes"]+1
    while cents >= 5:
        cents = cents -5
        coins["nickels"] =  coins["nickels"]+1
    while cents >= 1:
        cents = cents -1
        coins["pennies"] =  coins["pennies"]+1

    return coins
