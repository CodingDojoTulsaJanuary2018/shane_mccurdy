aboutShane = {
    "name":"Shane McCurdy",
    "age": 35,
    "country":"United States",
    "fav_lang":"JavaScript"
}

def printAbout(this_dict):
    print "My name is", this_dict["name"]
    print "My age is", str(this_dict["age"])
    print "My country of origin is", this_dict["country"]
    print "My favorite language is", this_dict["fav_lang"]

printAbout(aboutShane)
