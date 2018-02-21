students = [
     {'first_name':  'Michael', 'last_name' : 'Jordan'},
     {'first_name' : 'John', 'last_name' : 'Rosales'},
     {'first_name' : 'Mark', 'last_name' : 'Guillen'},
     {'first_name' : 'KB', 'last_name' : 'Tonel'}
]

def printStudents(stud):
    for student in stud:
        print student["first_name"], student["last_name"]

printStudents(students)

users = {
    'Students': [
         {'first_name':  'Michael', 'last_name' : 'Jordan'},
         {'first_name' : 'John', 'last_name' : 'Rosales'},
         {'first_name' : 'Mark', 'last_name' : 'Guillen'},
         {'first_name' : 'KB', 'last_name' : 'Tonel'}
     ],
     'Instructors': [
         {'first_name' : 'Michael', 'last_name' : 'Choi'},
         {'first_name' : 'Martin', 'last_name' : 'Puryear'}
         ]
     }

# print users['Students'][0]['first_name']

def printUsers(use_dict):
    for key in use_dict:
        print key
        for users in range(0,len(use_dict[key])):
            length = len(use_dict[key][users]["first_name"]) + len(use_dict[key][users]["last_name"]) # totals the length into an easy to use variable
            print (users +1),"-", use_dict[key][users]["first_name"].upper(), use_dict[key][users]["last_name"].upper(),"-",length

printUsers(users)
