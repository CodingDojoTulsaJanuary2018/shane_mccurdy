class Call(object):
    def __init__(self, call_id, caller_name, caller_phone, call_time, call_reason):
        self.call_id = call_id
        self.caller_name = caller_name
        self.caller_phone = caller_phone
        self.call_time = call_time
        self.call_reason = call_reason

    def display(self):
        print "_________________________"
        print "Call ID:", self.call_id
        print "Caller Name:", self.caller_name
        print "Caller Phone:", self.caller_phone
        print "Call Time:", self.call_time
        print "Call Reason:", self.call_reason
        print "-------------------------"
        return self

    def call_info(self):
        print "____"
        print "Caller Name:", self.caller_name
        print "Caller Phone:", self.caller_phone
        print "----"
        return self

c1 = Call(1,"Andy", "9185557777", "01:23PM", "Borred")
c2 = Call(2,"Bindy", "9185557723", "01:25PM", "Really Borred")
c3 = Call(3,"Candy", "9185557734", "01:27PM", "Really Really Borred")
c4 = Call(4,"Dandy", "9185557745", "01:31PM", "Really Really Really Borred")

class CallCenter(object):
    def __init__(self,calls=[]):
        self.calls = calls
        self.queue_size = len(self.calls)

    def get_queue_size(self):
        self.queue_size = len(self.calls)
        return str(self.queue_size)

    def add(self, new_call):
        self.calls.append(new_call)
        return self

    def remove(self, kill_me=0):
        self.calls.pop(kill_me)
        return self

    def info(self):
        for call in calls:
            call.call_info()
        print self.queue_size()

c1.display()
c2.call_info()
c3.call_info()

CC = CallCenter()
print CC.get_queue_size(), "...via meathod"
print CC.queue_size, "...via attribute"

CC.add(c1).add(c2).add(c3).add(c4)
print CC.get_queue_size(), "...via meathod"
print CC.queue_size, "...via attribute"

CC.remove()
print CC.get_queue_size(), "...via meathod"
print CC.queue_size, "...via attribute"
