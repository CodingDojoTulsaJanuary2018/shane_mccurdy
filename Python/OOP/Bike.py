class Bike(object):
    def __init__(self, price, max_speed):
        self.price = price
        self.max_speed = max_speed
        self.miles = 0

    def display_info(self):
        print "Price: $"+str(self.price)," |  Max Speed:",self.max_speed, " | Miles:",self.miles
        return self

    def ride(self):
        print "Riding..."
        self.miles += 10
        return self

    def reverse(self):
        print "Reversing..."
        if self.miles < 5:
            self.miles = 0
        else:
            self.miles -= 5
        return self

bike1 = Bike(200,"25mph")
bike1.ride().ride().ride().reverse().display_info()

bike2 = Bike(150, "10mph")
bike2.ride().display_info().reverse().reverse().reverse().display_info()
