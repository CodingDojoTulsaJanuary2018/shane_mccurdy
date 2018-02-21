# input
word_list = ['hello','world','my','name','is','Anna']
char = 'o'
# output
#new_list = ['hello','world']
newList = []

for word in word_list:
    for letter in word:
        if letter is char:
            newList.append(word)
            continue

print newList
