class Animal(object):
    def __init__(self, name, health):
        self.name = name
        self.health = health
        # print "I'm an Animal"

    def walk(self):
        self.health -= 1
        return self
    def run(self):
        self.health -= 5
        return self
    def display_health(self):
        print "Health:",self.health
        return self

class Dog(Animal):
    def __init__(self,name):
        super(Dog, self).__init__(name, 150)
        # print "I'm a Dog"

    def pet(self):
        self.health += 5
        return self

class Dragon(Animal):
    def __init__(self,name):
        super(Dragon,self).__init__(name, 170)

    def fly(self):
        self.health -= 10
        return self

    def display_health(self):
        super(Dragon, self).display_health()
        print "I am a Dragon"
        return self

ani = Animal("Ardvark", 100)
ani.walk().walk().walk().run().run().display_health()

doggo = Dog("Derpy")
doggo.walk().walk().walk().run().run().pet().display_health()

draggo = Dragon("Eliot")
draggo.display_health().fly().display_health()

# doggo.fly()
