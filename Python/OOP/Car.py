class Car(object):
    def __init__(self, price, speed, fuel, mileage):
        self.price = price
        self.speed = speed
        self.fuel = fuel
        self.mileage = mileage
        if price > 10000:
            self.tax = 0.15
        else:
            self.tax = 0.12
        self.display_all()

    def display_all(self):
        print "_________________________"
        print "Price:",self.price
        print "Speed:", self.speed
        print "Fuel:", self.fuel
        print "Mileage:", self.mileage
        print "Tax:", self.tax
        print "-------------------------"
        return self

# Create a class called  Car. In the__init__(), allow the user to specify the following attributes:
 # price, speed, fuel, mileage.
 # If the price is greater than 10,000, set the tax to be 15%. Otherwise, set the tax to be 12%.
#
# Create six different instances of the class Car.
# In the class have a method called display_all() that returns all the information about the car as a string.
# In your __init__(), call this display_all() method to display information about the car once the attributes have been defined.
#
# Price: 2000
# Speed: 35mph
# Fuel: Full
# Mileage: 15mpg
# Tax: 0.12

car1 = Car(2000,"35mph","Full","55mpg")
car2 = Car(10000,"55mph","Half Full","22mpg")
car3 = Car(20000,"65mph","Full","17mpg")
car4 = Car(1000,"15mph","Empty","25mpg")
car5 = Car(3500,"55mph","1/2 Full","35mpg")
car6 = Car(2400,"25mph"," 2 Gallons","12mpg")
