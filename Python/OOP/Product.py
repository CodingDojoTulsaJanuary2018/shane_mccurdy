class Product(object):
    def __init__(self,price,name,weight,brand,status):
        self.price = price
        self.name = name
        self.weight = weight
        self.brand = brand
        self.status = status

    def display_all(self):
        print "_________________________"
        print "Price:", self.price
        print "Name:", self.name
        print "Weight:", self.weight
        print "Brand:", self.brand
        print "Status:", self.status
        print "-------------------------"
        return self

    def sell(self):
        self.status = "sold"
        return self

    def tax(self, tax = 0.185): #given a default value to tax, that will be overwritten
        return round(self.price + (self.price * tax), 2) #rounds to two decimal places

    def make_a_return(self):
        what_stat = raw_input("What is the item's status? \n 0 <-- DEFECTIVE \n 1 <-- LIKE NEW - IN BOX \n 2 <-- USED - OPENED BOX \n -> ")
        if what_stat is "0":
            self.status = "defective"
            self.price = 0
            return self
        elif what_stat is "1":
            self.status = "for sale"
            return self
        elif what_stat is "2":
            self.status = "used"
            self.price -= (self.price * 0.2)
            return self
        else:
            print "Sorry, something didn't work. Please try again..."
            return self


# def __init__(self,price,name,weight,brand,status):

prod1 = Product(3.25, "Loofa", "8oz", "Rubba-ducky", "for sale")
prod2 = Product(5.50, "Shampoo", "24oz", "Rubba-ducky", "for sale")
prod3 = Product(4.75, "Soap-Onna-Rope", "8oz", "Rubba-ducky", "for sale")

prod1.display_all().make_a_return().display_all()
prod2.display_all()
print prod2.tax()
print prod2.tax(0.15)
prod3.display_all()
