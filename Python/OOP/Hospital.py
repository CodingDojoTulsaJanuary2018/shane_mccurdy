class Patient(object):
    def __init__(self, Id, name, allergies, bed_number=None):
        self.Id = Id
        self.name = name
        self.allergies = allergies
        self.bed_number = bed_number

Bob = Patient(10,"Bobby Hill", "peanuts")
Joe = Patient(11,"Joe Pecci", "idiots")
Sue = Patient(12, "Sue Mii", "None yet!")

class Hospital(object):
    def __init__(self, name, capacity, patients =[]):
        self.name = name
        self.capacity = capacity
        self.patients = patients

    def admit(self, patient, bed_num):
        if len(self.patients) < self.capacity:
            self.patients.append(patient)
            patient.bed_number = bed_num
            print "Added",patient.name , "to bed number", patient.bed_number
        else:
            print "Sorry, we are at capacity. No admittance at this time."
        return self

    def discharge(self, out_patient):
        for pat in self.patients:
            x = 0
            if pat.Id is out_patient.Id:
                self.patients.pop(x) #removes from Hospital patients list
                out_patient.bed_number = None #set this patient's bed_number back to None
            x += 1
        return self

Hosp = Hospital("Med Center General", 2)
Hosp.admit(Bob, "23B").admit(Joe,"23C").admit(Sue,"23A")
Hosp.discharge(Bob)
Hosp.admit(Sue,"23A")
